import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio('https://www.chosic.com/wp-content/uploads/2021/04/Ramadan-Alex-Productions.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handleInteraction = () => {
      if (!hasInteracted) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(err => console.log("Autoplay blocked:", err));
        
        // Remove listeners once interaction happens
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      audio.pause();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-[100] p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:scale-110 transition-all duration-300 text-festive group"
      title={isPlaying ? "Mute Music" : "Play Music"}
    >
      {isPlaying ? (
        <Volume2 size={20} className="animate-pulse" />
      ) : (
        <VolumeX size={20} className="opacity-50" />
      )}
      <div className="absolute left-full ml-3 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isPlaying ? "Ramadan Vibes Playing..." : "Music Muted"}
      </div>
    </button>
  );
};

export default BackgroundMusic;
