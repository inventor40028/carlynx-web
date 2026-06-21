// Boundary animation between the hero and "Choose Your Path".
// Only half of the side-view car peeks in from the left; the tires spin in place.
'use client';

import { useEffect, useRef, useState } from 'react';

export default function CarDriveStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStart(true);
        observer.disconnect();
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none relative z-20 w-full overflow-visible"
      style={{ height: '1px' }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          top: '0',
          width: 'clamp(340px, 44vw, 560px)',
          aspectRatio: '595 / 600',
          left: '0',
          transform: start ? 'translate(-50%, -50%)' : 'translate(-105%, -50%)',
          transition: start
            ? 'transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          willChange: 'transform',
        }}
      >
        <img
          src="/images/sideview.png"
          alt=""
          draggable={false}
          className="select-none pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
          }}
        />

        <div
          className="absolute"
          style={{
            left: '13%',
            top: '51.6%',
            width: '17.2%',
            aspectRatio: '1 / 1',
            animation: 'carlynx-tyre-spin 1.45s linear infinite',
            willChange: 'transform',
          }}
        >
          <img
            src="/images/tyre.png"
            alt=""
            draggable={false}
            className="select-none pointer-events-none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>

        <div
          className="absolute"
          style={{
            left: '72.2%',
            top: '50.6%',
            width: '18.8%',
            aspectRatio: '1 / 1',
            animation: 'carlynx-tyre-spin 1.45s linear infinite',
            willChange: 'transform',
          }}
        >
          <img
            src="/images/tyre.png"
            alt=""
            draggable={false}
            className="select-none pointer-events-none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes carlynx-tyre-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
