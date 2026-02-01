'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useEasterEggStore } from '@/store';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hasVisitedProject } = useEasterEggStore();
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const frameCount = useRef(0);
  const shootingStars = useRef<{x: number; y: number; vx: number; vy: number; life: number}[]>([]);

  // Sabit yıldızlar - 80 tane (daha dolu arka plan)
  const staticStars = useMemo(() => {
    const stars: Star[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.3,
      });
    }
    return stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Ana animasyon - düşük FPS (30 FPS)
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      // Arka plan
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      // Nebula efekti - hafif renkli bulutlar
      const gradient1 = ctx.createRadialGradient(
        width * 0.2, height * 0.3, 0,
        width * 0.2, height * 0.3, width * 0.4
      );
      gradient1.addColorStop(0, 'rgba(74, 144, 164, 0.03)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.8, height * 0.7, 0,
        width * 0.8, height * 0.7, width * 0.35
      );
      gradient2.addColorStop(0, 'rgba(100, 60, 150, 0.025)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      frameCount.current++;

      // Yıldızları çiz
      staticStars.forEach((star, i) => {
        // Her 60 frame'de bir parlaklık değişimi
        const twinkle = Math.sin(frameCount.current * 0.03 + i) * 0.15;
        const brightness = star.brightness + twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
      });

      // Easter egg - kayan yıldızlar
      if (hasVisitedProject && frameCount.current % 120 === 0 && shootingStars.current.length < 2) {
        shootingStars.current.push({
          x: Math.random() * width * 0.3,
          y: Math.random() * height * 0.3,
          vx: 6,
          vy: 4,
          life: 60
        });
      }

      // Kayan yıldızları çiz
      shootingStars.current = shootingStars.current.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.life--;

        if (s.life <= 0) return false;

        const opacity = s.life / 60;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        return true;
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [staticStars, hasVisitedProject]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
