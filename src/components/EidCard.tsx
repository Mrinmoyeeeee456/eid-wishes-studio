import { forwardRef } from 'react';
import { frameOptions, CharacterTheme } from '@/lib/frames';

interface EidCardProps {
  recipientName: string;
  senderName: string;
  message: string;
  size?: string;
  frameId?: CharacterTheme;
  eidType?: 'fitar' | 'azha';
}

const EidCard = forwardRef<HTMLDivElement, EidCardProps>(
  ({ recipientName, senderName, message, size = 'Medium (400px)', frameId = 'traditional_mosque', eidType = 'fitar' }, ref) => {
    
    // Find selected frame theme
    const theme = frameOptions.find(f => f.id === frameId) || frameOptions[0];
    
    // Determine card width based on standard 8px grid sizes
    const widthClass =
      size.includes('Small') ? 'max-w-[320px]' : 
      size.includes('Large') ? 'max-w-[560px]' : 
      'max-w-[440px]';

    return (
      <div ref={ref} id="printable-eid-card" className={`${widthClass} w-full mx-auto p-2 bg-transparent print:p-0 print:m-0`}>
        {/* Main Card Container with applied Theme colors */}
        <div 
          className={`relative overflow-hidden rounded-2xl border-4 ${theme.colors.border} text-center shadow-xl flex flex-col`}
          style={{
            backgroundImage: theme.bgImage ? `url(${theme.bgImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Inner Glassmorphic Layer */}
          <div className={`flex flex-col gap-6 p-6 md:p-8 w-full h-full ${theme.bgImage ? 'bg-white/60 dark:bg-black/60 backdrop-blur-md' : theme.colors.bg}`}>
            {/* Top Decorative Header */}
            <div className="flex items-center justify-between text-2xl">
              <span className={`opacity-70 ${theme.colors.text}`}>✧</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl filter drop-shadow-md">{theme.icon}</span>
                <span className={`text-3xl ${theme.colors.text}`}>🌙</span>
              </div>
              <span className={`opacity-70 ${theme.colors.text}`}>✧</span>
            </div>

            <div className="space-y-1">
              <h3 className={`text-4xl font-display font-black tracking-tight ${theme.colors.text}`}>
                EID MUBARAK
              </h3>
              <p className={`font-display text-xl opacity-80 italic ${theme.colors.text}`}>
                {eidType === 'azha' ? 'عيد أضحى مبارك' : 'عيد فطر مبارك'}
              </p>
              <p className={`text-xs font-medium uppercase tracking-widest opacity-60 pt-1 ${theme.colors.text}`}>
                {eidType === 'azha' ? 'Celebrating Eid-ul-Adha' : 'Celebrating Eid-ul-Fitr'}
              </p>
            </div>

            {/* Letter Body */}
            <div className="flex flex-col gap-4 text-left">
              <div className="space-y-1">
                <p className={`text-sm font-medium opacity-80 ${theme.colors.text}`}>To:</p>
                <p className={`font-display font-bold text-xl ${theme.colors.text}`}>
                  {recipientName || 'Recipient Name'}
                </p>
              </div>

              {/* Message Box always maintains a strong glassy effect */}
              <div className={`rounded-xl p-5 border-2 border-dashed ${theme.colors.border} bg-white/80 dark:bg-black/50 backdrop-blur-lg shadow-sm shine-spiritual`}>
                <p className={`text-sm md:text-base leading-relaxed text-gray-900 dark:text-gray-100 print:text-black whitespace-pre-wrap min-h-[80px] font-bold`}>
                  {message || 'May this blessed occasion of Eid bring you joy, peace, and prosperity. May you have a wonderful celebration with your loved ones!'}
                </p>
              </div>

              <div className="space-y-1 text-right mt-2">
                <p className={`text-sm font-medium opacity-80 ${theme.colors.text}`}>From:</p>
                <p className={`font-display font-bold text-xl ${theme.colors.text}`}>
                  {senderName || 'Your Name'}
                </p>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="mt-4 pt-4 border-t-2 border-dashed border-black/10 dark:border-white/10 flex justify-between items-center">
              <span className="text-xs font-medium opacity-50 uppercase tracking-widest flex items-center gap-1">
                <span className="text-sm">{theme.icon}</span> Nostalgic Eid Pro
              </span>
              <span className={`text-sm opacity-60 ${theme.colors.text}`}>
                  ✧ ✧ ✧
              </span>
            </div>
            
            {/* Watermark/Texture overlay (optional) */}
            <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
        </div>
      </div>
    );
  }
);

EidCard.displayName = 'EidCard';
export default EidCard;
