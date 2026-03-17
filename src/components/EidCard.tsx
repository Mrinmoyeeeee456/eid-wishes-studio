import { forwardRef } from 'react';

interface EidCardProps {
  recipientName: string;
  senderName: string;
  message: string;
  size?: string;
}

const EidCard = forwardRef<HTMLDivElement, EidCardProps>(
  ({ recipientName, senderName, message, size = 'medium' }, ref) => {
    const widthClass =
      size === 'small' ? 'max-w-[300px]' : size === 'large' ? 'max-w-[500px]' : 'max-w-[400px]';

    return (
      <div ref={ref} className={`${widthClass} w-full mx-auto`}>
        <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-accent/30 p-8 text-center space-y-4">
          {/* Top icons */}
          <div className="flex items-center justify-center gap-2 text-2xl">
            <span className="text-primary/50">☆</span>
            <span className="text-primary text-3xl">🐪</span>
            <span className="text-primary/50">☆</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">
            Eid Mubarak
          </h3>
          <p className="font-display text-primary/70 text-lg">عيد أضحستى مبارك</p>

          {/* Recipient */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">To:</p>
            <p className="font-display font-bold text-primary text-lg">
              {recipientName || 'Recipient Name'}
            </p>
          </div>

          {/* Message */}
          <div className="rounded-xl border border-primary/20 bg-card p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message ||
                'May this blessed occasion of Eid-ul-Adha bring you joy, peace, and prosperity. May Allah accept your prayers and sacrifices. Eid Mubarak!'}
            </p>
          </div>

          {/* Mosque icon */}
          <div className="text-4xl text-primary">🕌</div>

          {/* Sender */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">From:</p>
            <p className="font-display font-bold text-primary text-lg">
              {senderName || 'Your Name'}
            </p>
          </div>

          {/* Bottom decorations */}
          <div className="flex items-center justify-center gap-1 text-primary/40 text-sm">
            🐪 🐪 🐪 🐪 🐪
          </div>
        </div>
      </div>
    );
  }
);

EidCard.displayName = 'EidCard';
export default EidCard;
