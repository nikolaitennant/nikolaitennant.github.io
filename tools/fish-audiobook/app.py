from __future__ import annotations

import json
import os
import subprocess
import tempfile
from pathlib import Path
from typing import List

import requests
from fastapi import FastAPI, File, HTTPException, UploadFile
from pydantic import BaseModel, Field

app = FastAPI(title="Fish Audiobook Starter", version="0.1.0")

DATA_DIR = Path(os.getenv("AUDIOBOOK_DATA_DIR", "./data")).resolve()
VOICES_DIR = DATA_DIR / "voices"
JOBS_DIR = DATA_DIR / "jobs"
FISH_SERVER_URL = os.getenv("FISH_SERVER_URL", "http://localhost:8080")
FISH_INFER_PATH = os.getenv("FISH_INFER_PATH", "/v1/tts")
FFMPEG_BIN = os.getenv("FFMPEG_BIN", "ffmpeg")

VOICES_DIR.mkdir(parents=True, exist_ok=True)
JOBS_DIR.mkdir(parents=True, exist_ok=True)


class GenerateRequest(BaseModel):
    voice_id: str = Field(min_length=1)
    text: str = Field(min_length=1)
    chapter_name: str = Field(default="chapter-1")
    chunk_chars: int = Field(default=500, ge=150, le=2000)


class VoiceCreateRequest(BaseModel):
    voice_id: str = Field(min_length=1)


def split_text(text: str, max_chars: int) -> List[str]:
    text = "\n".join(line.strip() for line in text.splitlines() if line.strip())
    if not text:
        return []

    chunks: List[str] = []
    current = []
    current_len = 0

    for sentence in text.replace("\n", " ").split(". "):
        sentence = sentence.strip()
        if not sentence:
            continue
        if not sentence.endswith("."):
            sentence += "."

        if current_len + len(sentence) + 1 <= max_chars:
            current.append(sentence)
            current_len += len(sentence) + 1
        else:
            if current:
                chunks.append(" ".join(current))
            current = [sentence]
            current_len = len(sentence)

    if current:
        chunks.append(" ".join(current))

    return chunks


def voice_path(voice_id: str) -> Path:
    return VOICES_DIR / voice_id


def get_reference_clip(voice_id: str) -> Path:
    vdir = voice_path(voice_id)
    if not vdir.exists():
        raise HTTPException(status_code=404, detail=f"Unknown voice_id: {voice_id}")

    refs = sorted([p for p in vdir.iterdir() if p.suffix.lower() in {".wav", ".mp3", ".flac", ".m4a"}])
    if not refs:
        raise HTTPException(status_code=400, detail="Voice has no reference clips uploaded")
    return refs[0]


def call_fish_server(text: str, reference_path: Path, output_path: Path) -> None:
    payload = {
        "text": text,
        "reference_audio": str(reference_path),
        "format": "wav",
    }
    url = f"{FISH_SERVER_URL.rstrip('/')}{FISH_INFER_PATH}"

    try:
        r = requests.post(url, json=payload, timeout=180)
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail=f"Fish server request failed: {exc}") from exc

    if r.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Fish server error: {r.status_code} {r.text[:400]}")

    ctype = r.headers.get("content-type", "")
    if "audio" in ctype or "octet-stream" in ctype:
        output_path.write_bytes(r.content)
        return

    data = r.json()
    audio_b64 = data.get("audio_base64")
    if not audio_b64:
        raise HTTPException(status_code=502, detail="Fish response did not include audio bytes")

    import base64

    output_path.write_bytes(base64.b64decode(audio_b64))


def merge_wavs_to_mp3(wavs: List[Path], output_mp3: Path) -> None:
    if not wavs:
        raise HTTPException(status_code=400, detail="No wav files to merge")

    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
        list_path = Path(f.name)
        for wav in wavs:
            f.write(f"file '{wav.as_posix()}'\n")

    cmd = [
        FFMPEG_BIN,
        "-y",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        str(list_path),
        "-c:a",
        "libmp3lame",
        "-b:a",
        "192k",
        str(output_mp3),
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    list_path.unlink(missing_ok=True)
    if proc.returncode != 0:
        raise HTTPException(status_code=500, detail=f"ffmpeg failed: {proc.stderr[:500]}")


@app.get("/health")
def health() -> dict:
    return {"ok": True, "fish_server": FISH_SERVER_URL, "data_dir": str(DATA_DIR)}


@app.get("/voices")
def list_voices() -> dict:
    voices = [p.name for p in sorted(VOICES_DIR.iterdir()) if p.is_dir()]
    return {"voices": voices}


@app.post("/voices")
def create_voice(req: VoiceCreateRequest) -> dict:
    vdir = voice_path(req.voice_id)
    vdir.mkdir(parents=True, exist_ok=True)
    return {"voice_id": req.voice_id, "path": str(vdir)}


@app.post("/voices/{voice_id}/reference")
async def upload_reference(voice_id: str, file: UploadFile = File(...)) -> dict:
    vdir = voice_path(voice_id)
    if not vdir.exists():
        raise HTTPException(status_code=404, detail=f"Unknown voice_id: {voice_id}")

    out = vdir / file.filename
    data = await file.read()
    out.write_bytes(data)
    return {"stored": str(out), "bytes": len(data)}


@app.post("/jobs/generate")
def generate(req: GenerateRequest) -> dict:
    reference = get_reference_clip(req.voice_id)
    chunks = split_text(req.text, req.chunk_chars)
    if not chunks:
        raise HTTPException(status_code=400, detail="No usable text after preprocessing")

    job_dir = JOBS_DIR / f"{req.voice_id}_{req.chapter_name.replace(' ', '_')}"
    job_dir.mkdir(parents=True, exist_ok=True)

    wavs: List[Path] = []
    manifest = []
    for i, chunk in enumerate(chunks, start=1):
        wav_path = job_dir / f"chunk_{i:04d}.wav"
        call_fish_server(chunk, reference, wav_path)
        wavs.append(wav_path)
        manifest.append({"index": i, "text": chunk, "wav": str(wav_path)})

    mp3_path = job_dir / "final.mp3"
    merge_wavs_to_mp3(wavs, mp3_path)

    (job_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    return {
        "job_dir": str(job_dir),
        "chunks": len(chunks),
        "reference": str(reference),
        "output_mp3": str(mp3_path),
    }
