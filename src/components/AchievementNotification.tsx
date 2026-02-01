'use client';

import { useEffect, useState } from 'react';
import { useAchievementStore } from '@/store';

interface NotificationConfig {
  type: string;
  message: string;
  subMessage?: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

const notificationStyles: Record<string, NotificationConfig> = {
  about: {
    type: 'about',
    message: 'Hikayem bu şekildeydi...',
    subMessage: 'Umarım ilham verici bulmuşsundur',
    icon: '📖',
    bgColor: 'from-purple-900/90 to-indigo-900/90',
    borderColor: 'border-purple-500/50',
    glowColor: 'shadow-purple-500/30',
  },
  technologies: {
    type: 'technologies',
    message: 'Yeterli mi?',
    subMessage: 'Daha fazlasını öğrenmeye devam ediyorum',
    icon: '⚡',
    bgColor: 'from-cyan-900/90 to-blue-900/90',
    borderColor: 'border-cyan-500/50',
    glowColor: 'shadow-cyan-500/30',
  },
  projects: {
    type: 'projects',
    message: 'Beğendin mi?',
    subMessage: 'Daha fazlası yolda...',
    icon: '🚀',
    bgColor: 'from-amber-900/90 to-orange-900/90',
    borderColor: 'border-amber-500/50',
    glowColor: 'shadow-amber-500/30',
  },
};

export default function AchievementNotification() {
  const { currentNotification, setCurrentNotification, setEyesMood } = useAchievementStore();
  const [isShaking, setIsShaking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (currentNotification) {
      // Önce sarsılma
      setIsShaking(true);
      setEyesMood('alert');

      // 500ms sonra sarsılma bitsin ve bildirim görünsün
      const shakeTimer = setTimeout(() => {
        setIsShaking(false);
        setIsVisible(true);
        
        // Mood'u bildirime göre ayarla
        if (currentNotification.type === 'about') {
          setEyesMood('soft');
        } else if (currentNotification.type === 'technologies') {
          setEyesMood('happy');
        } else if (currentNotification.type === 'projects') {
          setEyesMood('happy');
        }
      }, 600);

      // 4 saniye sonra bildirimi kapat
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setEyesMood('cold');
        
        // Biraz bekle sonra state'i temizle
        setTimeout(() => {
          setCurrentNotification(null);
        }, 500);
      }, 4500);

      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [currentNotification, setCurrentNotification, setEyesMood]);

  if (!currentNotification) return null;

  const style = notificationStyles[currentNotification.type] || notificationStyles.about;

  return (
    <>
      {/* Sarsılma overlay */}
      {isShaking && (
        <div className="fixed inset-0 z-[100] pointer-events-none animate-screen-shake" />
      )}

      {/* Bildirim */}
      <div
        className={`fixed bottom-8 right-8 z-[99] transition-all duration-500 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div
          className={`
            relative overflow-hidden
            bg-gradient-to-br ${style.bgColor}
            border-2 ${style.borderColor}
            rounded-lg p-5 min-w-[280px] max-w-[350px]
            shadow-lg ${style.glowColor}
            backdrop-blur-sm
          `}
        >
          {/* Pixel border efekti */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-2 h-2 bg-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/20" />
          </div>

          {/* Animasyonlu arka plan çizgileri */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent top-1/4 animate-scan-line" />
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent top-3/4 animate-scan-line-delayed" />
          </div>

          {/* İçerik */}
          <div className="relative z-10 flex items-start gap-4">
            {/* İkon */}
            <div className="text-4xl animate-bounce-slow">
              {style.icon}
            </div>

            {/* Metin */}
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg mb-1 font-pixel tracking-wide">
                {style.message}
              </h4>
              {style.subMessage && (
                <p className="text-white/70 text-sm">
                  {style.subMessage}
                </p>
              )}
            </div>
          </div>

          {/* Alt çizgi animasyonu */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full animate-glow-line" />
        </div>
      </div>
    </>
  );
}
