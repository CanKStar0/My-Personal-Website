'use client';

import { useState, useEffect } from 'react';
import { useAchievementStore } from '@/store';

interface ProjectsSectionProps {
  onBack: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  url?: string;
  image?: string;
}

// GÜNCELLENMİŞ PROJE LİSTESİ (Senin Görsellerine Göre)
const projects: Project[] = [
  {
    id: 'haber-portali',
    title: 'Haber Portalı',
    description: 'Türkiye\'nin en kapsamlı haber arama motoru ve veri toplayıcısı.',
    longDescription: 'Sıradan bir haber sitesi değil, devasa bir veri işleme merkezi. 100+ farklı kaynaktan anlık veri çeken, bunları normalize eden ve kullanıcıya "Google hızında" arama imkanı sunan bir sistem. Arka planda çalışan botlar ve ElasticSearch altyapısı sayesinde gündemi saniyesi saniyesine takip eder.',
    technologies: ['Node.js', 'ElasticSearch', 'Cheerio', 'Redis', 'Next.js', 'MongoDB'],
    features: [
      'Gelişmiş Haber Arama Motoru',
      '100+ Kaynak Entegrasyonu (Scraping)',
      'Kategori Bazlı Akıllı Filtreleme',
      'Anlık Veri Akışı ve Bildirimler',
    ],
    url: 'https://haber-portali.up.railway.app/',
    image: '/projects/haber-portali.png',
  },
  {
    id: 'api-showcase',
    title: 'API Showcase',
    description: 'Geliştiriciler için küratörlü, modern API keşif platformu.',
    longDescription: 'Yazılımcıların projelerinde kullanabileceği 200\'den fazla ücretsiz API servisini kategorize eden, test eden ve sunan modern bir kütüphane. Kullanıcı dostu arayüzü ve kategorizasyon sistemi ile geliştiricilerin aradıkları servise saniyeler içinde ulaşmasını sağlar.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      '200+ Ücretsiz API Servisi',
      '37 Farklı Kategori (Kripto, Hava, Spor...)',
      'Modern ve Responsive "Dark Mode" Arayüz',
      'Hızlı Filtreleme ve Arama',
    ],
    url: 'https://api-showcase.up.railway.app/',
    image: '/projects/api-showcase.png',
  },
  {
    id: 'cosmic-explorer',
    title: 'Cosmic Explorer',
    description: 'Web tarayıcısında çalışan hiper-gerçekçi 3D uzay simülasyonu.',
    longDescription: 'Three.js ve WebGL teknolojilerinin sınırlarını zorlayan bir frontend şaheseri. Kullanıcılar Dünya, uydular ve diğer gezegenleri 3 boyutlu ortamda, gerçek yörünge verileriyle inceleyebilir. Sinematik kamera geçişleri ve detaylı veri panelleri ile tam bir uzay üssü deneyimi sunar.',
    technologies: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP', 'TypeScript'],
    features: [
      'Gerçekçi 3D Gezegen Modellemesi',
      'İnteraktif Yörünge ve Kamera Kontrolü',
      'Detaylı Astronomik Veri Panelleri',
      'Yüksek Performanslı Render Motoru',
    ],
    url: 'https://frontend-astrolog.up.railway.app/',
    image: '/projects/cosmic-explorer.png',
  },
];

export default function ProjectsSection({ onBack }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { addVisitedProject, visitedProjects, unlockAchievement } = useAchievementStore();

  // Tüm projeler ziyaret edildiğinde "Arşiv Uzmanı" başarımı ver
  useEffect(() => {
    const allProjectIds = projects.map(p => p.id);
    if (allProjectIds.every(id => visitedProjects.includes(id))) {
      unlockAchievement('archive_expert');
    }
  }, [visitedProjects, unlockAchievement]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    addVisitedProject(project.id);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleVisitProject = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Geri butonu */}
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
        <span>Ana Sisteme Dön</span>
      </button>

      {/* Başlık */}
      <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-center tracking-tight">
        <span className="text-glow">GÖREV ARŞİVİ</span>
      </h2>
      <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto font-light">
        Yüksek öncelikli sistem modülleri ve tamamlanmış operasyonlar.
      </p>

      {/* Proje kartları Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="cosmic-card bg-[#1a1a2e]/40 border border-[#4a90a4]/20 p-4 rounded-xl cursor-pointer group hover:border-[#4a90a4]/60 transition-all duration-300 hover:-translate-y-2"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Proje Görsel Alanı */}
            <div className="w-full h-48 rounded-lg mb-4 overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 bg-[#0a0a12]/20 group-hover:bg-transparent transition-colors z-10" />
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a12] flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
              )}
            </div>

            <div className="px-2">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4a90a4] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Teknoloji etiketleri */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map(tech => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-1 bg-[#4a90a4]/10 border border-[#4a90a4]/20 text-[#4a90a4] rounded font-mono uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] px-2 py-1 text-gray-500 font-mono">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proje Detay Modalı */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleCloseProject}
        >
          <div 
            className="bg-[#0f0f16] border border-[#4a90a4]/30 max-w-4xl w-full rounded-2xl relative max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(74,144,164,0.15)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Kapatma butonu */}
            <button
              onClick={handleCloseProject}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-20"
            >
              ✕
            </button>

            {/* Modal Görseli (Geniş) */}
            {selectedProject.image && (
              <div className="w-full h-64 md:h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] via-transparent to-transparent z-10" />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 relative z-20 -mt-20">
              {/* Başlık ve Buton */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#4a90a4]/20 text-[#4a90a4] rounded text-xs font-bold font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedProject.url && (
                  <button
                    onClick={() => handleVisitProject(selectedProject.url!)}
                    className="px-6 py-3 bg-[#4a90a4] hover:bg-[#3b7d91] text-[#0a0a12] font-bold rounded-lg transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(74,144,164,0.4)]"
                  >
                    <span>Sistemi İncele</span>
                    <span>↗</span>
                  </button>
                )}
              </div>

              {/* Açıklama Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-[#4a90a4]">///</span> PROJE ANALİZİ
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    Özellikler
                  </h4>
                  <ul className="space-y-3">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-200">
                        <span className="text-[#4a90a4] mt-1">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}