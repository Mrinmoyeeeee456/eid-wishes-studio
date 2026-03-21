import React from 'react';

const ShootingStars = ({ isDark }: { isDark: boolean }) => {
  if (!isDark) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="shooting-star-layer"></div>
    </div>
  );
};

export default ShootingStars;
