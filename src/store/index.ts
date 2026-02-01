import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Intro animasyonu durumu
interface IntroState {
  hasSeenIntro: boolean;
  introComplete: boolean;
  setHasSeenIntro: (value: boolean) => void;
  setIntroComplete: (value: boolean) => void;
}

export const useIntroStore = create<IntroState>()(
  persist(
    (set) => ({
      hasSeenIntro: false,
      introComplete: false,
      setHasSeenIntro: (value) => set({ hasSeenIntro: value }),
      setIntroComplete: (value) => set({ introComplete: value }),
    }),
    {
      name: 'intro-storage',
      // SADECE Boş bir obje döndürüyoruz, yani hiçbir şeyi locale kaydetme diyoruz.
      // Bu sayede hasSeenIntro her sayfa yenilendiğinde başlangıç değerine (false) döner.
      partialize: (state) => ({}), 
    }
  )
);

// Başarım türleri
export type AchievementId = 
  | 'first_contact'      // İlk Temas - siteye giriş
  | 'code_hunter'        // Kod Avcısı - F12
  | 'fast_reader'        // Hızlı Okuyucu - Hakkımda 1dk
  | 'full_diagnosis'     // Tam Teşhis - tüm teknoloji hover
  | 'archive_expert'     // Arşiv Uzmanı - 3 proje detayı
  | 'king_mode'          // Kral Modu - Konami Code
  | 'explorer';          // Gezgin - tüm dış linkler

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

// Başarım ve Easter Egg durumu
interface AchievementState {
  achievements: Achievement[];
  visitedSections: string[];
  hoveredTechnologies: string[];
  visitedProjects: string[];
  clickedExternalLinks: string[];
  aboutTimeSpent: number;
  konamiProgress: number[];
  eyesMood: 'cold' | 'soft' | 'alert' | 'happy' | 'angry';
  currentNotification: { type: string; message: string } | null;
  showAchievementPanel: boolean;
  
  // Actions
  unlockAchievement: (id: AchievementId) => void;
  addVisitedSection: (section: string) => void;
  addHoveredTechnology: (tech: string) => void;
  addVisitedProject: (project: string) => void;
  addClickedExternalLink: (link: string) => void;
  setAboutTimeSpent: (time: number) => void;
  addKonamiKey: (key: number) => void;
  resetKonamiProgress: () => void;
  setEyesMood: (mood: 'cold' | 'soft' | 'alert' | 'happy' | 'angry') => void;
  setCurrentNotification: (notification: { type: string; message: string } | null) => void;
  setShowAchievementPanel: (show: boolean) => void;
  isAchievementUnlocked: (id: AchievementId) => boolean;
}

const initialAchievements: Achievement[] = [
  { id: 'first_contact', name: 'İlk Temas', description: 'Siteye ilk kez giriş yaptın', icon: '🔭', unlocked: false },
  { id: 'code_hunter', name: 'Kod Avcısı', description: 'Geliştirici konsolunu açtın', icon: '🐛', unlocked: false },
  { id: 'fast_reader', name: 'Hızlı Okuyucu', description: 'Hakkımda bölümünde 1 dakika geçirdin', icon: '📖', unlocked: false },
  { id: 'full_diagnosis', name: 'Tam Teşhis', description: 'Tüm teknolojileri inceldin', icon: '🔧', unlocked: false },
  { id: 'archive_expert', name: 'Arşiv Uzmanı', description: 'Tüm projelerin detayına baktın', icon: '🌀', unlocked: false },
  { id: 'king_mode', name: 'Kral Modu', description: 'Gizli kodu girdin', icon: '👑', unlocked: false },
  { id: 'explorer', name: 'Gezgin', description: 'Tüm dış linklere tıkladın', icon: '🚀', unlocked: false },
];

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: initialAchievements,
      visitedSections: [],
      hoveredTechnologies: [],
      visitedProjects: [],
      clickedExternalLinks: [],
      aboutTimeSpent: 0,
      konamiProgress: [],
      eyesMood: 'cold',
      currentNotification: null,
      showAchievementPanel: false,

      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map((a) =>
          a.id === id && !a.unlocked
            ? { ...a, unlocked: true, unlockedAt: Date.now() }
            : a
        ),
      })),

      addVisitedSection: (section) => set((state) => ({
        visitedSections: state.visitedSections.includes(section)
          ? state.visitedSections
          : [...state.visitedSections, section],
      })),

      addHoveredTechnology: (tech) => set((state) => ({
        hoveredTechnologies: state.hoveredTechnologies.includes(tech)
          ? state.hoveredTechnologies
          : [...state.hoveredTechnologies, tech],
      })),

      addVisitedProject: (project) => set((state) => ({
        visitedProjects: state.visitedProjects.includes(project)
          ? state.visitedProjects
          : [...state.visitedProjects, project],
      })),

      addClickedExternalLink: (link) => set((state) => ({
        clickedExternalLinks: state.clickedExternalLinks.includes(link)
          ? state.clickedExternalLinks
          : [...state.clickedExternalLinks, link],
      })),

      setAboutTimeSpent: (time) => set({ aboutTimeSpent: time }),

      addKonamiKey: (key) => set((state) => ({
        konamiProgress: [...state.konamiProgress, key].slice(-10),
      })),

      resetKonamiProgress: () => set({ konamiProgress: [] }),

      setEyesMood: (mood) => set({ eyesMood: mood }),

      setCurrentNotification: (notification) => set({ currentNotification: notification }),

      setShowAchievementPanel: (show) => set({ showAchievementPanel: show }),

      isAchievementUnlocked: (id) => {
        const state = get();
        return state.achievements.find((a) => a.id === id)?.unlocked ?? false;
      },
    }),
    {
      name: 'achievement-storage',
    }
  )
);

// Eski store'ları kaldırıyorum, geriye dönük uyumluluk için basit wrapper
export const useEasterEggStore = create<{
  hasVisitedProject: boolean;
  visitedProjects: string[];
  showEasterEggMessage: boolean;
  eyesMood: 'cold' | 'soft' | 'alert';
  setHasVisitedProject: (value: boolean) => void;
  addVisitedProject: (project: string) => void;
  setShowEasterEggMessage: (value: boolean) => void;
  setEyesMood: (mood: 'cold' | 'soft' | 'alert') => void;
}>()((set) => ({
  hasVisitedProject: false,
  visitedProjects: [],
  showEasterEggMessage: false,
  eyesMood: 'cold',
  setHasVisitedProject: (value) => set({ hasVisitedProject: value }),
  addVisitedProject: (project) =>
    set((state) => ({
      visitedProjects: state.visitedProjects.includes(project) 
        ? state.visitedProjects 
        : [...state.visitedProjects, project],
      hasVisitedProject: true,
    })),
  setShowEasterEggMessage: (value) => set({ showEasterEggMessage: value }),
  setEyesMood: (mood) => set({ eyesMood: mood }),
}));

// DevTools algılama durumu
interface DevToolsState {
  isDevToolsOpen: boolean;
  hasTriggeredDevToolsReaction: boolean;
  setIsDevToolsOpen: (value: boolean) => void;
  setHasTriggeredDevToolsReaction: (value: boolean) => void;
}

export const useDevToolsStore = create<DevToolsState>()((set) => ({
  isDevToolsOpen: false,
  hasTriggeredDevToolsReaction: false,
  setIsDevToolsOpen: (value) => set({ isDevToolsOpen: value }),
  setHasTriggeredDevToolsReaction: (value) => set({ hasTriggeredDevToolsReaction: value }),
}));

// Site genel durumu
interface SiteState {
  currentPage: 'home' | 'technologies' | 'projects' | 'about';
  isTransitioning: boolean;
  mousePosition: { x: number; y: number };
  setCurrentPage: (page: 'home' | 'technologies' | 'projects' | 'about') => void;
  setIsTransitioning: (value: boolean) => void;
  setMousePosition: (position: { x: number; y: number }) => void;
}

export const useSiteStore = create<SiteState>()((set) => ({
  currentPage: 'home',
  isTransitioning: false,
  mousePosition: { x: 0.5, y: 0.5 },
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsTransitioning: (value) => set({ isTransitioning: value }),
  setMousePosition: (position) => set({ mousePosition: position }),
}));
