'use client';

import { useEffect, useState, type ReactNode } from 'react';

const TOPVIEW_ASSET = '/images/topview.png';
const MIN_AUTH_LOADER_TIME = 1000;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

interface FormDeliveryFrameProps {
  children: ReactNode;
  className?: string;
}

export default function FormDeliveryFrame({ children, className = '' }: FormDeliveryFrameProps) {
  const [loading, setLoading] = useState(true);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [carLeaving, setCarLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let active = true;
    let fadeTimer: number | undefined;

    Promise.all([
      preloadImage(TOPVIEW_ASSET),
      new Promise<void>((resolve) => window.setTimeout(resolve, MIN_AUTH_LOADER_TIME)),
    ]).then(() => {
      if (!active) return;
      setLoaderLeaving(true);
      fadeTimer = window.setTimeout(() => {
        if (!active) return;
        setLoading(false);
      }, 260);
    });

    return () => {
      active = false;
      if (fadeTimer) window.clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setMounted(true);
      setGone(true);
      return;
    }

    const start = window.setTimeout(() => setMounted(true), 40);
    const leave = window.setTimeout(() => setCarLeaving(true), 2050);
    const hide = window.setTimeout(() => setGone(true), 2850);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(leave);
      window.clearTimeout(hide);
    };
  }, [loading]);

  return (
    <div className={`relative ${className}`} style={{ overflow: 'visible' }}>
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-30"
        aria-hidden="true"
        style={{
          width: 'clamp(145px, 20vw, 230px)',
          aspectRatio: '420 / 720',
          opacity: gone ? 0 : 1,
          transform: carLeaving
            ? 'translate(-50%, 150%)'
            : mounted
              ? 'translate(-50%, -92%)'
              : 'translate(-50%, -260%)',
          transition: carLeaving
            ? 'transform 0.8s cubic-bezier(0.55, 0, 0.7, 0.2), opacity 0.2s linear 0.6s'
            : 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity',
        }}
      >
        <img
          src="/images/topview.png"
          alt=""
          draggable={false}
          className="select-none pointer-events-none drop-shadow-2xl"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
        />
      </div>

      <div
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(-168%)',
          transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {children}
      </div>
    </div>
  );
}
