'use client';

import { useEffect, useState } from 'react';

const LOADER_ASSETS = ['/loader/leftlogo.png', '/loader/rightlogo.png'];
const MIN_LOADER_TIME = 2000;
const FADE_TIME = 450;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function GlobalLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let active = true;
    let fadeTimer: number | undefined;
    let removeTimer: number | undefined;

    const waitForWindowLoad = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }

      window.addEventListener('load', () => resolve(), { once: true });
    });

    const waitForMinimumTime = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_LOADER_TIME);
    });

    Promise.all([
      Promise.all(LOADER_ASSETS.map(preloadImage)),
      waitForWindowLoad,
      waitForMinimumTime,
    ]).then(() => {
      if (!active) return;

      setLeaving(true);
      fadeTimer = window.setTimeout(() => {
        if (!active) return;
        setVisible(false);
      }, FADE_TIME);
    });

    return () => {
      active = false;
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-[#0d1b2e] text-white transition-opacity duration-[450ms] ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Loading CarLynk"
      aria-live="polite"
      role="status"
    >
      <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,201,106,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_38%)]" />

        <div className="relative z-10 flex w-full max-w-4xl items-center justify-center">
          <div className="relative h-[min(70vw,70dvh,420px)] w-[min(70vw,70dvh,420px)]">
            <div className="absolute inset-0 rounded-full bg-[#081424]/45 blur-3xl" />

            <div className="loader-piece inficir-left-piece absolute inset-0">
              <img
                src="/loader/leftlogo.png"
                alt=""
                draggable={false}
                className="h-full w-full select-none object-contain"
              />
            </div>

            <div className="loader-piece inficir-right-piece absolute inset-0">
              <img
                src="/loader/rightlogo.png"
                alt=""
                draggable={false}
                className="h-full w-full select-none object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .loader-piece {
          transform-origin: 50% 50%;
          will-change: transform;
          filter: drop-shadow(0 24px 42px rgba(0, 0, 0, 0.28));
        }

        .inficir-left-piece {
          animation: global-inficir-left-loop 2.8s linear infinite;
        }

        .inficir-right-piece {
          animation: global-inficir-right-loop 2.8s linear infinite;
        }

        @keyframes global-inficir-left-loop {
          0%, 71.43%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          75% { transform: translate3d(-5%, -4%, 0) scale(0.998); }
          78.57% { transform: translate3d(-13%, -7%, 0) scale(0.994); }
          82.14% { transform: translate3d(-20%, -4%, 0) scale(0.99); }
          85.71% { transform: translate3d(-23%, 0, 0) scale(0.988); }
          89.29% { transform: translate3d(-20%, 4%, 0) scale(0.99); }
          92.86% { transform: translate3d(-13%, 7%, 0) scale(0.994); }
          96.43% { transform: translate3d(-5%, 4%, 0) scale(0.998); }
        }

        @keyframes global-inficir-right-loop {
          0%, 71.43%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          75% { transform: translate3d(5%, 4%, 0) scale(0.998); }
          78.57% { transform: translate3d(13%, 7%, 0) scale(0.994); }
          82.14% { transform: translate3d(20%, 4%, 0) scale(0.99); }
          85.71% { transform: translate3d(23%, 0, 0) scale(0.988); }
          89.29% { transform: translate3d(20%, -4%, 0) scale(0.99); }
          92.86% { transform: translate3d(13%, -7%, 0) scale(0.994); }
          96.43% { transform: translate3d(5%, -4%, 0) scale(0.998); }
        }

        @media (prefers-reduced-motion: reduce) {
          .inficir-left-piece,
          .inficir-right-piece {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
