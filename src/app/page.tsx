'use client';

import { useState, useEffect } from 'react';
import IntroSequence from '@/components/IntroSequence';
import HomePage from '@/components/HomePage';
import { useIntroStore } from '@/store';

export default function Page() {
  const { hasSeenIntro, introComplete, setIntroComplete, setHasSeenIntro } = useIntroStore();
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const [homePageReady, setHomePageReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && hasSeenIntro) {
      setShowIntro(false);
      setShowHomePage(true);
      // Direkt göster (intro atlandı)
      setTimeout(() => setHomePageReady(true), 100);
    }
  }, [isClient, hasSeenIntro]);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setHasSeenIntro(true);
    // Intro bitti, HomePage'i göstermeye başla
    setShowHomePage(true);
    setTimeout(() => {
      setShowIntro(false);
      // Animasyonu başlat
      setTimeout(() => setHomePageReady(true), 100);
    }, 500);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-cosmic-black" />
    );
  }

  return (
    <main className="min-h-screen bg-cosmic-black overflow-hidden">
      {showIntro && !hasSeenIntro && (
        <IntroSequence onComplete={handleIntroComplete} />
      )}
      
      {showHomePage && (
        <div 
          className={`transition-all duration-1000 ease-out ${
            homePageReady 
              ? 'opacity-100 scale-100 blur-0' 
              : 'opacity-0 scale-95 blur-md'
          }`}
        >
          <HomePage isRevealing={!homePageReady} />
        </div>
      )}
    </main>
  );
}
