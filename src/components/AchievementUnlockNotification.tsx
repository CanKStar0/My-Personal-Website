'use client';

import { useEffect, useState, useRef } from 'react';
import { useAchievementStore, Achievement } from '@/store';

interface UnlockNotification {
  achievement: Achievement;
  id: number;
}

// Level up ses efekti oluştur
const playLevelUpSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Ana nota
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator1.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    oscillator1.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // C6
    gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode1.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.5);

    // Harmonik
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    oscillator2.type = 'triangle';
    oscillator2.frequency.setValueAtTime(1046.50, audioContext.currentTime); // C6
    oscillator2.frequency.setValueAtTime(1318.51, audioContext.currentTime + 0.15); // E6
    oscillator2.frequency.setValueAtTime(1567.98, audioContext.currentTime + 0.3); // G6
    gainNode2.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    oscillator2.start(audioContext.currentTime);
    oscillator2.stop(audioContext.currentTime + 0.4);

    // Shimmer efekti
    const oscillator3 = audioContext.createOscillator();
    const gainNode3 = audioContext.createGain();
    oscillator3.connect(gainNode3);
    gainNode3.connect(audioContext.destination);
    oscillator3.type = 'sine';
    oscillator3.frequency.setValueAtTime(2093, audioContext.currentTime + 0.2); // C7
    gainNode3.gain.setValueAtTime(0.1, audioContext.currentTime + 0.2);
    gainNode3.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
    oscillator3.start(audioContext.currentTime + 0.2);
    oscillator3.stop(audioContext.currentTime + 0.6);
  } catch (e) {
    console.log('Audio not supported');
  }
};

export default function AchievementUnlockNotification() {
  const { achievements } = useAchievementStore();
  const [notifications, setNotifications] = useState<UnlockNotification[]>([]);
  const previousAchievementsRef = useRef<string[]>([]);
  const notificationIdRef = useRef(0);
  const isInitializedRef = useRef(false);

  // Yeni açılan başarımları tespit et
  useEffect(() => {
    // İlk mount'ta mevcut unlocked olanları kaydet (bildirim gösterme)
    if (!isInitializedRef.current) {
      previousAchievementsRef.current = achievements
        .filter(a => a.unlocked)
        .map(a => a.id);
      isInitializedRef.current = true;
      return;
    }

    // Şu anki unlocked başarımları al
    const currentUnlocked = achievements.filter(a => a.unlocked).map(a => a.id);
    
    // Yeni açılanları bul
    const newlyUnlocked = currentUnlocked.filter(
      id => !previousAchievementsRef.current.includes(id)
    );

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((achievementId) => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          const id = ++notificationIdRef.current;
          
          // Ses çal
          playLevelUpSound();
          
          setNotifications((prev) => [...prev, { achievement, id }]);

          // 4 saniye sonra bildirimi kaldır
          setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
          }, 4000);
        }
      });
    }

    // Önceki durumu güncelle
    previousAchievementsRef.current = currentUnlocked;
  }, [achievements]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="animate-achievement-pop bg-gradient-to-r from-[#1a1a2e] via-[#0a0a15] to-[#1a1a2e] 
                     border border-[#c9a227]/50 rounded-lg px-6 py-4 shadow-lg shadow-[#c9a227]/20
                     flex items-center gap-4 min-w-[300px]"
        >
          {/* İkon */}
          <div className="text-4xl animate-bounce-slow">{notification.achievement.icon}</div>
          
          {/* İçerik */}
          <div className="flex-1">
            <p className="text-[#c9a227] text-xs font-bold tracking-widest mb-1">
              🏆 BAŞARIM AÇILDI!
            </p>
            <h3 className="text-white font-bold text-lg">
              {notification.achievement.name}
            </h3>
            <p className="text-gray-400 text-sm">
              {notification.achievement.description}
            </p>
          </div>
          
          {/* Parıltı efekti */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-[#c9a227]/10 to-transparent animate-glow-line pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
