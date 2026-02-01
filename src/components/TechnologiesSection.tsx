'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAchievementStore } from '@/store';

interface TechnologiesSectionProps {
  onBack: () => void;
}

interface Technology {
  name: string;
  description: string;
  icon: string;
}

interface TechGroup {
  title: string;
  technologies: Technology[];
}

const techGroups: TechGroup[] = [
  {
    title: 'Backend',
    technologies: [
      { name: 'Node.js', description: 'Sunucu taraflı JavaScript çalışma ortamı', icon: '⚡' },
      { name: 'PHP', description: 'Dinamik web geliştirme dili', icon: '🐘' },
      { name: 'Laravel', description: 'Modern PHP web framework', icon: '🔥' },
      { name: 'MySQL', description: 'Popüler ilişkisel veritabanı sistemi', icon: '🗃️' },
      { name: 'MongoDB', description: 'Esnek NoSQL veritabanı çözümü', icon: '🍃' },
      { name: 'Redis', description: 'Yüksek performanslı önbellek sistemi', icon: '🔴' },
    ],
  },
  {
    title: 'Frontend',
    technologies: [
      { name: 'React', description: 'Modern kullanıcı arayüzü kütüphanesi', icon: '⚛️' },
      { name: 'Next.js', description: 'React tabanlı full-stack framework', icon: '▲' },
      { name: 'TypeScript', description: 'Tip güvenli JavaScript süper seti', icon: '📘' },
      { name: 'Bootstrap', description: 'Popüler CSS framework', icon: '🅱️' },
      { name: 'Three.js', description: '3D grafik ve WebGL kütüphanesi', icon: '🎮' },
      { name: 'GSAP', description: 'Profesyonel animasyon kütüphanesi', icon: '✨' },
    ],
  },
  {
    title: 'Araçlar ve Sistemler',
    technologies: [
      { name: 'Git', description: 'Dağıtık versiyon kontrol sistemi', icon: '📝' },
      { name: 'Docker', description: 'Konteyner tabanlı uygulama dağıtımı', icon: '🐳' },
      { name: 'AWS', description: 'Amazon bulut altyapı hizmetleri', icon: '☁️' },
      { name: 'Railway', description: 'Modern cloud deployment platformu', icon: '🚂' },
      { name: 'VS Code', description: 'Güçlü ve esnek kod editörü', icon: '💻' },
    ],
  },
];

export default function TechnologiesSection({ onBack }: TechnologiesSectionProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const { addHoveredTechnology, hoveredTechnologies, unlockAchievement } = useAchievementStore();

  // Tüm teknoloji isimlerini al (sadece bir kez hesapla)
  const allTechNames = useMemo(() => 
    techGroups.flatMap(group => group.technologies.map(t => t.name)), 
    []
  );
  
  // Tüm teknolojiler hover edildiğinde başarım ver
  useEffect(() => {
    const allHovered = allTechNames.every(name => hoveredTechnologies.includes(name));
    if (allHovered && allTechNames.length > 0) {
      unlockAchievement('full_diagnosis');
    }
  }, [hoveredTechnologies, allTechNames, unlockAchievement]);

  const handleTechHover = (techName: string) => {
    setHoveredTech(techName);
    addHoveredTechnology(techName);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Geri butonu */}
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
        <span>Ana Sayfa</span>
      </button>

      {/* Başlık */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
        <span className="text-glow">Teknolojiler</span>
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Projelerimde kullandığım araçlar ve teknolojiler
      </p>

      {/* Teknoloji grupları */}
      <div className="space-y-12">
        {techGroups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#4a90a4] border-b border-[#4a90a4]/30 pb-2">
              {group.title}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {group.technologies.map((tech, techIndex) => (
                <div
                  key={tech.name}
                  className={`cosmic-card p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    hoveredTech === tech.name ? 'scale-105 border-[#4a90a4]' : ''
                  }`}
                  onMouseEnter={() => handleTechHover(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  style={{
                    animationDelay: `${groupIndex * 0.1 + techIndex * 0.05}s`,
                  }}
                >
                  <div className="text-3xl mb-2 text-center">{tech.icon}</div>
                  <h4 className="text-sm font-medium text-white text-center mb-1">
                    {tech.name}
                  </h4>
                  
                  {/* Hover açıklaması */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    hoveredTech === tech.name ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
