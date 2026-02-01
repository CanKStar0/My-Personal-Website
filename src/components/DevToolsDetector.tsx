'use client';

import { useEffect, useRef } from 'react';
import { useDevToolsStore, useEasterEggStore, useAchievementStore } from '@/store';

export default function DevToolsDetector() {
  const { setIsDevToolsOpen, setHasTriggeredDevToolsReaction } = useDevToolsStore();
  const { setEyesMood } = useEasterEggStore();
  const { unlockAchievement } = useAchievementStore();
  const hasLogged = useRef(false);

  useEffect(() => {
    // Console mesajı
    const logConsoleMessage = () => {
      if (!hasLogged.current) {
        console.log(
          '%c Kodlar mı lazımdı? ',
          'background: #1a1a2e; color: #c9a227; font-size: 24px; padding: 10px 20px; font-weight: bold; border-radius: 5px;'
        );
        console.log(
          '%c 👁️ Seni görüyorum... ',
          'color: #4a90a4; font-size: 14px; font-style: italic;'
        );
        hasLogged.current = true;
      }
    };

    // DevTools algılama yöntemleri
    const threshold = 160;
    
    // Yöntem 1: Pencere boyutu farkı
    const checkWindowSize = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        triggerDevToolsReaction();
      }
    };

    // Yöntem 2: debugger kullanımı (timing)
    const checkDebugger = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      
      // Debugger açıksa, bu satır çok uzun sürer
      if (end - start > 100) {
        triggerDevToolsReaction();
      }
    };

    // Yöntem 3: Console.log override
    const devtools = /./;
    devtools.toString = function() {
      triggerDevToolsReaction();
      return '';
    };

    // DevTools tepkisi
    const triggerDevToolsReaction = () => {
      setIsDevToolsOpen(true);
      setEyesMood('alert');
      logConsoleMessage();
      
      // Kod Avcısı başarımı
      unlockAchievement('code_hunter');
      
      // Ekranda titreşim efekti
      document.body.classList.add('screen-shake');
      setTimeout(() => {
        document.body.classList.remove('screen-shake');
      }, 500);

      // Karanlık flash
      const overlay = document.createElement('div');
      overlay.className = 'darkness-overlay';
      document.body.appendChild(overlay);
      setTimeout(() => {
        overlay.remove();
      }, 300);

      // 3 saniye sonra normal moda dön
      setTimeout(() => {
        setIsDevToolsOpen(false);
        setEyesMood('cold');
      }, 3000);
    };

    // Resize event listener
    const handleResize = () => {
      checkWindowSize();
    };

    // Periyodik kontrol
    const interval = setInterval(() => {
      checkWindowSize();
    }, 1000);

    window.addEventListener('resize', handleResize);
    
    // İlk kontrol
    checkWindowSize();

    // F12 ve Ctrl+Shift+I tuş kombinasyonlarını dinle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
      ) {
        setTimeout(triggerDevToolsReaction, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [setIsDevToolsOpen, setEyesMood]);

  return null;
}
