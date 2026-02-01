'use client';

import { useState, useEffect, useRef } from 'react';
import { useAchievementStore } from '@/store';

interface AboutSectionProps {
  onBack: () => void;
}

export default function AboutSection({ onBack }: AboutSectionProps) {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const { setAboutTimeSpent, aboutTimeSpent, unlockAchievement } = useAchievementStore();
  const startTimeRef = useRef<number>(Date.now());

  // Zaman takibi ve Başarım (Fast Reader)
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const totalTime = aboutTimeSpent + elapsed;
      setAboutTimeSpent(totalTime);
      
      if (totalTime >= 60000) {
        unlockAchievement('fast_reader');
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      const elapsed = Date.now() - startTimeRef.current;
      setAboutTimeSpent(aboutTimeSpent + elapsed);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleParagraphs(prev => {
        if (prev >= 4) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* Kontrol Paneli Geri Dönüş */}
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-gray-500 hover:text-[#4a90a4] transition-all group font-mono"
      >
        <span className="transform group-hover:-translate-x-2 transition-transform">{'<<'}</span>
        <span className="tracking-tighter uppercase text-sm font-bold">Terminali Kapat</span>
      </button>

      {/* Başlık */}
      <h2 className="text-4xl md:text-6xl font-black text-white mb-12 text-center">
        <span className="text-glow tracking-[0.2em] uppercase">MİMARİ PROFİL</span>
      </h2>

      {/* Hero / Kimlik Bölümü */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-16 p-8 border border-[#4a90a4]/10 bg-[#1a1a2e]/30 rounded-2xl backdrop-blur-md">
        <div className="w-44 h-44 rounded-2xl bg-[#0a0a12] flex items-center justify-center flex-shrink-0 border-2 border-[#4a90a4]/40 shadow-[0_0_30px_rgba(74,144,164,0.15)] relative group overflow-hidden">
          <span className="text-7xl z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500">🌌</span>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute bottom-0 w-full h-1 bg-[#4a90a4] animate-pulse"></div>
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Canpolat Kaya</h3>
          <p className="text-[#4a90a4] text-xl mb-5 font-mono font-semibold tracking-wide">
            Full Stack Developer <span className="text-white/20">|</span> System Architect
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="px-4 py-1.5 bg-[#4a90a4]/10 border border-[#4a90a4]/30 rounded-full text-xs font-bold text-[#4a90a4] uppercase tracking-widest">End-to-End Solutions</span>
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest">UI/UX Mindset</span>
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest">Scalable Backend</span>
          </div>
        </div>
      </div>

      {/* İçerik / Hikaye Flow */}
      <div className="space-y-12">
        <div className={`transition-all duration-1000 ${visibleParagraphs >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-[#4a90a4] text-[#0a0a12] flex items-center justify-center text-sm">01</span>
            BÜTÜNSEL YAKLAŞIM
          </h4>
          <p className="text-gray-400 text-lg leading-relaxed font-light pl-11">
            Teknolojiye sadece bir "kod parçası" olarak değil, yaşayan bir organizma olarak bakıyorum. 
            Frontend'deki piksellerin zarafetinden, backend'deki verinin güvenli akışına kadar her katmanda 
            hakimiyet kurmayı hedefleyen bir **Full Stack** tutkunuyum. Tasarladığım her arayüzün arkasında, 
            demir gibi sağlam bir mimari yatar.
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-150 ${visibleParagraphs >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-[#4a90a4] text-[#0a0a12] flex items-center justify-center text-sm">02</span>
            TEKNOLOJİK CEPHANELİK
          </h4>
          <p className="text-gray-400 text-lg leading-relaxed font-light pl-11">
            **Node.js** ve **Next.js** ekosisteminde uzmanlaşarak, modern webin gereksinim duyduğu hız ve 
            ölçeklenebilirliği projelerimin merkezine koyuyorum. MongoDB ile esnek veri yapıları kurarken, 
            React ile kullanıcı deneyimini bir üst seviyeye taşıyan interaktif dünyalar inşa ediyorum. 
            Benim için "Full Stack" demek, bir fikri tek başına alıp çalışan bir ürüne dönüştürmek demektir.
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${visibleParagraphs >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-[#4a90a4] text-[#0a0a12] flex items-center justify-center text-sm">03</span>
            VERİ VE ESTETİK
          </h4>
          <p className="text-gray-400 text-lg leading-relaxed font-light pl-11">
            Akakçe Scraper gibi projelerle veri mühendisliğinin sınırlarını zorlarken, aynı zamanda 
            bu veriyi en estetik şekilde sunmanın yollarını arıyorum. Interstellar temalı bu portfolyo, 
            teknik karmaşıklık ile sanatsal vizyonun birleşimine olan inancımın bir kanıtıdır. 
            Karmaşık backend mantığını, kullanıcı dostu piksellerle maskelemeyi seviyorum.
          </p>
        </div>
      </div>

      {/* Skill Stats / Başarı Göstergeleri */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        {[
          { label: 'Frontend Mastering', value: '%95', sub: 'React / Next.js' },
          { label: 'Backend Architecture', value: '%98', sub: 'Node.js / NoSQL' },
          { label: 'Data Processing', value: '1M+', sub: 'Daily Scrapes' },
          { label: 'System Uptime', value: '%99.9', sub: 'Cloud Deploy' },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-[#4a90a4]/5 hover:border-[#4a90a4]/30 transition-all duration-500"
          >
            <div className="text-3xl font-black text-white mb-1 font-mono">{stat.value}</div>
            <div className="text-[10px] text-[#4a90a4] font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#4a90a4] w-2/3 group-hover:w-full transition-all duration-1000"></div>
            </div>
            <div className="text-[9px] text-gray-500 mt-2 font-mono uppercase italic">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}