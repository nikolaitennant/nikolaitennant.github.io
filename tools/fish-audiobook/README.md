# Fish Audiobook Local App (Starter)

A minimal local-first starter app for audiobook generation with Fish-Speech.

## What this does
- Lets you manage named voices (`/voices/{voice_id}` folders with reference clips).
- Lets you submit text and generate chapter audio with a selected voice.
- Exports a merged MP3 file per job.

## What this does **not** do yet
- No auth/user accounts.
- No polished frontend (use Swagger UI or wire a small React/Gradio client).
- Assumes you run a Fish-Speech inference server and configure endpoint.

## Quick start

```bash
cd tools/fish-audiobook
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8010
```

Open API docs at: `http://localhost:8010/docs`

## Environment variables

- `FISH_SERVER_URL` (default: `http://localhost:8080`)
- `FISH_INFER_PATH` (default: `/v1/tts`)
- `AUDIOBOOK_DATA_DIR` (default: `./data`)
- `FFMPEG_BIN` (default: `ffmpeg`)

## Suggested flow
1. Create a voice id (e.g., `my_narrator_v1`).
2. Upload 1..N clean WAV references into that voice folder.
3. Post text using `/jobs/generate` with that `voice_id`.
4. Download resulting mp3 from returned path.

## Notes on Fish endpoint compatibility
Fish server APIs can vary by branch/version. Update `call_fish_server(...)` in `app.py`
if your deployed endpoint expects different JSON keys.

## Next upgrades
- Add a tiny web UI (voice picker + text box + generate button + download link).
- Add retry logic for failed chunks.
- Add chapter markers + M4B output.
- Add LUFS normalization profiles for audiobook standards.
