'use client';

import { useAchievementStore } from '@/store';

export default function AchievementPanel() {
  const { achievements, showAchievementPanel, setShowAchievementPanel } = useAchievementStore();

  if (!showAchievementPanel) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setShowAchievementPanel(false)}
    >
      <div 
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel */}
        <div className="relative bg-[#0a0a15] border-2 border-[#4a90a4]/50 rounded-lg overflow-hidden">
          {/* Pixel köşeler */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#4a90a4]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#4a90a4]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#4a90a4]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4a90a4]" />

          {/* Başlık */}
          <div className="bg-gradient-to-r from-[#4a90a4]/20 to-transparent p-4 border-b border-[#4a90a4]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <h2 className="text-xl font-bold text-white tracking-wider">BAŞARIMLAR</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4a90a4] font-mono">{unlockedCount}/{achievements.length}</span>
                <button
                  onClick={() => setShowAchievementPanel(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Başarım grid */}
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  relative p-3 rounded-lg border-2 transition-all duration-300
                  ${achievement.unlocked
                    ? 'bg-gradient-to-br from-[#4a90a4]/20 to-[#1a1a2e] border-[#4a90a4]/50 hover:border-[#4a90a4]'
                    : 'bg-[#0a0a0f] border-gray-800 opacity-50 grayscale'
                  }
                `}
              >
                {/* Kilit ikonu */}
                {!achievement.unlocked && (
                  <div className="absolute top-2 right-2 text-xs">🔒</div>
                )}

                {/* İkon */}
                <div className={`text-3xl text-center mb-2 ${achievement.unlocked ? 'animate-pulse-slow' : ''}`}>
                  {achievement.unlocked ? achievement.icon : '❓'}
                </div>

                {/* İsim */}
                <h3 className={`text-xs font-bold text-center mb-1 ${
                  achievement.unlocked ? 'text-white' : 'text-gray-500'
                }`}>
                  {achievement.unlocked ? achievement.name : '???'}
                </h3>

                {/* Açıklama */}
                <p className={`text-[10px] text-center leading-tight ${
                  achievement.unlocked ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {achievement.unlocked ? achievement.description : 'Henüz kilidi açılmadı'}
                </p>

                {/* Glow efekti */}
                {achievement.unlocked && (
                  <div className="absolute inset-0 rounded-lg bg-[#4a90a4]/5 animate-pulse pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Alt bilgi */}
          <div className="p-4 border-t border-[#4a90a4]/30 bg-[#0a0a0f]">
            <p className="text-xs text-gray-500 text-center">
              Siteyi keşfederek başarımların kilidini aç • Gizli sürprizler seni bekliyor
            </p>
          </div>
        </div>

        {/* Dış glow */}
        <div className="absolute inset-0 rounded-lg bg-[#4a90a4]/10 blur-xl -z-10" />
      </div>
    </div>
  );
}
