import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { terminalSounds } from '../utils/sounds';

const SoundToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(terminalSounds.isAudioEnabled());

  const toggleSound = () => {
    const newState = terminalSounds.toggle();
    setIsEnabled(newState);
    
    // Play a test sound when enabling
    if (newState) {
      setTimeout(() => terminalSounds.terminalBeep(), 100);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 p-3 bg-terminal-800/90 backdrop-blur-sm border border-primary-500/30 rounded-full shadow-lg hover:border-primary-500/50 transition-all duration-300 group"
      title={isEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects'}
    >
      {isEnabled ? (
        <Volume2 className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
      ) : (
        <VolumeX className="w-5 h-5 text-terminal-400 group-hover:text-terminal-300" />
      )}
    </button>
  );
};

export default SoundToggle;