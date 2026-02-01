'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const FULL_NAME = 'Canpolat Kaya';

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Yıldız alanı çizimi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Yıldızlar
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = '#000005';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Merkeze doğru hız çizgileri (warp efekti)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Yıldızı merkeze doğru hareket ettir
        const dx = star.x - centerX;
        const dy = star.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Warp hızı
        const speed = star.speed * (1 + distance / 500);
        star.x += (dx / distance) * speed;
        star.y += (dy / distance) * speed;

        // Ekran dışına çıkarsa sıfırla
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 50 + Math.random() * 100;
          star.x = centerX + Math.cos(angle) * dist;
          star.y = centerY + Math.sin(angle) * dist;
        }

        // Yıldızı çiz
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Hareket çizgisi
        if (distance > 100) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - (dx / distance) * star.size * 3, star.y - (dy / distance) * star.size * 3);
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
          ctx.lineWidth = star.size * 0.5;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Harf animasyonu - Interstellar tarzı
  useEffect(() => {
    // Her harfi tek tek göster
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= FULL_NAME.length) {
          clearInterval(letterInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 150); // Her harf 150ms

    return () => clearInterval(letterInterval);
  }, []);

  // Animasyon sıralaması
  useEffect(() => {
    // Tüm harfler göründükten sonra
    if (visibleLetters === FULL_NAME.length) {
      // Glow efekti başlat
      setTimeout(() => setShowGlow(true), 500);
      // Alt yazı göster
      setTimeout(() => setShowSubtitle(true), 1000);
      // Fade out başlat
      setTimeout(() => setFadeOut(true), 3000);
      // Animasyonu bitir
      setTimeout(onComplete, 4000);
    }
  }, [visibleLetters, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: '#000005' }}
    >
      {/* Yıldız alanı canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />

      {/* Ana içerik */}
      <div className="relative z-10 text-center">
        {/* İsim */}
        <h1 className="mb-6">
          {FULL_NAME.split('').map((letter, index) => (
            <span
              key={index}
              className={`
                inline-block text-5xl md:text-7xl lg:text-9xl font-thin tracking-[0.2em]
                transition-all duration-700 ease-out
                ${index < visibleLetters 
                  ? 'opacity-100 translate-y-0 blur-0' 
                  : 'opacity-0 translate-y-8 blur-sm'
                }
                ${showGlow ? 'text-white' : 'text-gray-300'}
              `}
              style={{
                fontFamily: "'Inter', sans-serif",
                textShadow: showGlow 
                  ? '0 0 30px rgba(74, 144, 164, 0.8), 0 0 60px rgba(74, 144, 164, 0.5), 0 0 100px rgba(74, 144, 164, 0.3)'
                  : 'none',
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Yatay çizgi */}
        <div 
          className={`
            h-px mx-auto bg-gradient-to-r from-transparent via-[#4a90a4] to-transparent
            transition-all duration-1000 ease-out
            ${visibleLetters === FULL_NAME.length ? 'w-96 opacity-100' : 'w-0 opacity-0'}
          `}
        />

        {/* Alt yazı - Full Stack Developer */}
        <p 
          className={`
            mt-8 text-lg md:text-xl tracking-[0.5em] uppercase
            transition-all duration-1000
            ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            color: '#4a90a4',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          Full Stack Developer
        </p>
      </div>

      {/* Sinematik üst/alt çerçeve - Interstellar tarzı */}
      <div 
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: '15%',
          background: 'linear-gradient(to bottom, #000005 0%, transparent 100%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: '15%',
          background: 'linear-gradient(to top, #000005 0%, transparent 100%)',
        }}
      />

      {/* Köşe detayları - sinematik */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
    </div>
  );
}
