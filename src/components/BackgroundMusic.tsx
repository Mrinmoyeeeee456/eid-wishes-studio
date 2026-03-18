import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio('https://www.chosic.com/wp-content/uploads/2021/04/Ramadan-Alex-Productions.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Try immediate autoplay; if blocked, play on first interaction
    const tryPlay = () => {
      audio.play().catch(() => {
        const onInteract = () => {
          audio.play().catch(() => {});
          window.removeEventListener('click', onInteract);
          window.removeEventListener('touchstart', onInteract);
        };
        window.addEventListener('click', onInteract);
        window.addEventListener('touchstart', onInteract);
      });
    };

    tryPlay();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    if (!isMuted === false) {
      audioRef.current.play().catch(() => {});
    }
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-[100] p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:scale-110 transition-all duration-300 text-festive group"
      title={isMuted ? 'Unmute Music' : 'Mute Music'}
    >
      {isMuted ? (
        <VolumeX size={20} className="opacity-50" />
      ) : (
        <Volume2 size={20} className="animate-pulse" />
      )}
      <div className="absolute left-full ml-3 px-3 py-1 bg-black/80 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isMuted ? '🎵 Unmute Ramadan Vibes' : '🎵 Ramadan Vibes Playing...'}
      </div>
    </button>
  );
};

export default BackgroundMusic;
