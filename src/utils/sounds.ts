// Terminal-style sound effects using Web Audio API
class TerminalSounds {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;
  private volume: number = 0.3;

  constructor() {
    // Initialize AudioContext on first user interaction
    this.initializeOnInteraction();
  }

  private initializeOnInteraction() {
    const initAudio = () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = this.volume) {
    if (!this.audioContext || !this.isEnabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  // Typing sound - short click
  public keystroke() {
    const frequencies = [800, 850, 900, 950]; // Vary frequency slightly
    const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
    this.createBeep(frequency, 0.05, 'square', this.volume * 0.5);
  }

  // Button click - satisfying click
  public click() {
    this.createBeep(1200, 0.1, 'square', this.volume * 0.7);
  }

  // Section entry - terminal beep
  public terminalBeep() {
    this.createBeep(800, 0.15, 'sine', this.volume * 0.8);
  }

  // Success sound - two tone beep
  public success() {
    this.createBeep(800, 0.1, 'sine', this.volume * 0.6);
    setTimeout(() => {
      this.createBeep(1000, 0.1, 'sine', this.volume * 0.6);
    }, 100);
  }

  // Error/notification sound
  public notification() {
    this.createBeep(600, 0.2, 'triangle', this.volume * 0.5);
  }

  // Toggle sound on/off
  public toggle(enabled?: boolean) {
    this.isEnabled = enabled !== undefined ? enabled : !this.isEnabled;
    return this.isEnabled;
  }

  // Set volume (0-1)
  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  public getVolume() {
    return this.volume;
  }

  public isAudioEnabled() {
    return this.isEnabled;
  }
}

// Create singleton instance
export const terminalSounds = new TerminalSounds();

// Export individual functions for convenience
export const playKeystroke = () => terminalSounds.keystroke();
export const playClick = () => terminalSounds.click();
export const playTerminalBeep = () => terminalSounds.terminalBeep();
export const playSuccess = () => terminalSounds.success();
export const playNotification = () => terminalSounds.notification();