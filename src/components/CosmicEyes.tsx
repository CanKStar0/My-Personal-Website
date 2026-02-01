'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useSiteStore, useEasterEggStore, useDevToolsStore } from '@/store';

interface EyePair {
  id: number;
  x: number;
  y: number;
  size: number;
  blinkInterval: number;
}

export default function CosmicEyes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mousePosition } = useSiteStore();
  const { eyesMood } = useEasterEggStore();
  const { isDevToolsOpen } = useDevToolsStore();
  const animationRef = useRef<number>(0);
  const blinkStates = useRef<boolean[]>([false, false]);
  const lastBlinks = useRef<number[]>([Date.now(), Date.now()]);

  // Sadece 2 göz çifti - sabit pozisyonlar
  const eyePairs = useMemo<EyePair[]>(() => [
    { id: 0, x: 0.12, y: 0.25, size: 10, blinkInterval: 4000 },
    { id: 1, x: 0.88, y: 0.7, size: 8, blinkInterval: 5000 },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
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

    // 20 FPS için throttle
    let lastTime = 0;
    const frameInterval = 1000 / 20;

    const drawEye = (
      x: number, y: number, size: number, 
      lookX: number, lookY: number, 
      isBlinking: boolean, mood: string
    ) => {
      // Göz küresi
      ctx.beginPath();
      ctx.ellipse(x, y, size, isBlinking ? 2 : size * 0.7, 0, 0, Math.PI * 2);
      ctx.fillStyle = mood === 'alert' ? 'rgba(40, 15, 15, 0.9)' : 'rgba(15, 15, 25, 0.9)';
      ctx.fill();

      if (!isBlinking) {
        const maxOffset = size * 0.25;
        const ox = (lookX - 0.5) * maxOffset * 2;
        const oy = (lookY - 0.5) * maxOffset * 2;

        // İris
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = mood === 'alert' ? 'rgba(180, 80, 80, 0.8)' : 
                        mood === 'soft' ? 'rgba(100, 140, 160, 0.7)' : 'rgba(80, 100, 130, 0.8)';
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, size * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
      }
    };

    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      if (time - lastTime < frameInterval) return;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const lookX = isDevToolsOpen ? 0.5 : mousePosition.x;
      const lookY = isDevToolsOpen ? 0.5 : mousePosition.y;

      eyePairs.forEach((eye, i) => {
        // Göz kırpma
        if (!blinkStates.current[i] && now - lastBlinks.current[i] > eye.blinkInterval) {
          blinkStates.current[i] = true;
          setTimeout(() => {
            blinkStates.current[i] = false;
            lastBlinks.current[i] = now;
          }, 120);
        }

        const px = eye.x * width;
        const py = eye.y * height;
        const blink = blinkStates.current[i];

        // Sol ve sağ göz
        drawEye(px - eye.size * 1.3, py, eye.size, lookX, lookY, blink, eyesMood);
        drawEye(px + eye.size * 1.3, py, eye.size, lookX, lookY, blink, eyesMood);
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [eyePairs, mousePosition, eyesMood, isDevToolsOpen]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
