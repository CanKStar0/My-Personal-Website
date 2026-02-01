'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import StarField from '@/components/StarField';
import CosmicEyes from '@/components/CosmicEyes';
import TechnologiesSection from '@/components/TechnologiesSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import DevToolsDetector from '@/components/DevToolsDetector';
import AchievementNotification from '@/components/AchievementNotification';
import AchievementPanel from '@/components/AchievementPanel';
import AchievementUnlockNotification from '@/components/AchievementUnlockNotification';
import { useSiteStore, useEasterEggStore, useDevToolsStore, useAchievementStore } from '@/store';

// Sosyal medya bilgileri - buradan kolayca düzenlenebilir
const socialLinks = {
  github: 'https://github.com/canpolatkaya',
  linkedin: 'https://linkedin.com/in/canpolatkaya',
  email: 'canpolatkaya@email.com',
};

type Section = 'home' | 'technologies' | 'projects' | 'about';

interface HomePageProps {
  isRevealing?: boolean;
}

export default function HomePage({ isRevealing = false }: HomePageProps) {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const { setMousePosition } = useSiteStore();
  const { setEyesMood: setOldEyesMood } = useEasterEggStore();
  const { isDevToolsOpen } = useDevToolsStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Achievement sistemi
  const { 
    unlockAchievement, 
    addVisitedSection, 
    addClickedExternalLink,
    clickedExternalLinks,
    konamiProgress,
    addKonamiKey,
    resetKonamiProgress,
    setShowAchievementPanel,
    setCurrentNotification
  } = useAchievementStore();
  
  // Easter egg notifications
  const [screenShake, setScreenShake] = useState(false);
  const previousSection = useRef<Section>('home');

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // keyCode değerleri

  // Mouse takibi - throttled
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
  }, [setMousePosition]);

  useEffect(() => {
    let throttleTimer: NodeJS.Timeout | null = null;
    const throttledMove = (e: MouseEvent) => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          handleMouseMove(e);
          throttleTimer = null;
        }, 50);
      }
    };
    window.addEventListener('mousemove', throttledMove);
    return () => window.removeEventListener('mousemove', throttledMove);
  }, [handleMouseMove]);

  // İlk ziyaret başarımı
  useEffect(() => {
    unlockAchievement('first_contact');
  }, [unlockAchievement]);

  // Konami Code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.keyCode;
      addKonamiKey(key);
      
      // Son 10 tuşu kontrol et
      const progress = [...konamiProgress, key].slice(-10);
      
      if (progress.length === 10 && progress.every((k, i) => k === konamiCode[i])) {
        unlockAchievement('king_mode');
        resetKonamiProgress();
        // Özel efekt
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, addKonamiKey, resetKonamiProgress, unlockAchievement]);

  // Gezgin başarımı kontrolü
  useEffect(() => {
    if (clickedExternalLinks.includes('github') && clickedExternalLinks.includes('linkedin')) {
      unlockAchievement('explorer');
    }
  }, [clickedExternalLinks, unlockAchievement]);

  useEffect(() => {
    if (isDevToolsOpen) {
      setOldEyesMood('alert');
    }
  }, [isDevToolsOpen, setOldEyesMood]);

  // Bölümden dönüşte Easter egg göster
  useEffect(() => {
    if (currentSection === 'home' && previousSection.current !== 'home') {
      const fromSection = previousSection.current;
      
      // Ziyaret edilen bölümü kaydet
      addVisitedSection(fromSection);
      
      // Önce ekran sallanması sonra bildirim
      setScreenShake(true);
      setTimeout(() => {
        setScreenShake(false);
        // Notification'ı store üzerinden tetikle
        setCurrentNotification({ type: fromSection, message: fromSection });
      }, 500);
    }
    previousSection.current = currentSection;
  }, [currentSection, addVisitedSection, setCurrentNotification]);

  const navigateTo = (section: Section) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSection(section);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleExternalLinkClick = (linkType: 'github' | 'linkedin') => {
    addClickedExternalLink(linkType);
  };

  return (
    <div className={`relative min-h-screen bg-[#050510] overflow-hidden ${isDevToolsOpen || screenShake ? 'animate-screen-shake' : ''}`}>
      <StarField />
      <CosmicEyes />
      <DevToolsDetector />
      
      {/* Achievement Panel */}
      <AchievementPanel />
      
      {/* Achievement Unlock Notification */}
      <AchievementUnlockNotification />
      
      {/* Easter Egg Notification */}
      <AchievementNotification />

      <div className="page-content relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        
        {currentSection === 'home' && (
          <div className="text-center max-w-4xl mx-auto">
            {/* Başarım butonu */}
            <button
              onClick={() => setShowAchievementPanel(true)}
              className="fixed top-4 right-4 z-50 p-2 bg-[#1a1a2e]/80 border border-[#4a90a4]/30 rounded-lg hover:border-[#4a90a4] transition-all group"
              title="Başarımlar"
            >
              <span className="text-xl group-hover:animate-bounce-slow">🏆</span>
            </button>
            {/* Ana başlık */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white tracking-wide">
              <span className="text-glow">Canpolat Kaya</span>
            </h1>
            
            {/* Alt başlık */}
            <p className="text-[#4a90a4] text-lg md:text-xl mb-6 tracking-widest uppercase">
              Full Stack Developer
            </p>
            
            {/* Kişisel açıklama */}
            <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
              Modern web teknolojileri ile kullanıcı odaklı, performanslı ve 
              estetik dijital çözümler geliştiriyorum.
            </p>

            {/* Sosyal medya linkleri */}
            <div className="flex justify-center gap-6 mb-10">
              <a 
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link group"
                title="GitHub"
                onClick={() => handleExternalLinkClick('github')}
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link group"
                title="LinkedIn"
                onClick={() => handleExternalLinkClick('linkedin')}
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={`mailto:${socialLinks.email}`}
                className="social-link group"
                title="Email"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Navigasyon butonları - 3 buton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button onClick={() => navigateTo('about')} className="glow-button">
                <span className="glow-button-border"></span>
                <span className="glow-button-text">Hakkımda</span>
              </button>
              <button onClick={() => navigateTo('technologies')} className="glow-button">
                <span className="glow-button-border"></span>
                <span className="glow-button-text">Teknolojiler</span>
              </button>
              <button onClick={() => navigateTo('projects')} className="glow-button">
                <span className="glow-button-border"></span>
                <span className="glow-button-text">Projeler</span>
              </button>
            </div>
          </div>
        )}

        {currentSection === 'technologies' && (
          <TechnologiesSection onBack={() => navigateTo('home')} />
        )}

        {currentSection === 'projects' && (
          <ProjectsSection onBack={() => navigateTo('home')} />
        )}

        {currentSection === 'about' && (
          <AboutSection onBack={() => navigateTo('home')} />
        )}
      </div>
    </div>
  );
}
