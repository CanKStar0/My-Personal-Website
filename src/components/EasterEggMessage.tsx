'use client';

import { useEffect, useState } from 'react';

export default function EasterEggMessage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="easter-egg-message">
      <p className="flex items-center gap-2">
        <span className="text-xl">✨</span>
        <span>Projeyi beğendin mi :)</span>
      </p>
    </div>
  );
}
