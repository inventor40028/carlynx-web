// Theme confirmation toast. After a theme is chosen, this slides down from the
// top: a fully-rounded deep-navy pill with a subtle kente-gold hairline border,
// white text "Theme <Name>", and a small gold circle holding a blue check.
// A few gold bubbles drift up around it for a light celebratory touch.
// Auto-dismisses. Works on mobile + desktop.
'use client';

import { useCallback, useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const FLAG = 'carlynk_pending_theme_toast';

export default function ThemeToast() {
  const [name, setName] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);

  const show = useCallback((themeName: string) => {
    setName(themeName);
    setLeaving(false);
    // Hold ~2.6s, then animate out.
    window.setTimeout(() => setLeaving(true), 2600);
    window.setTimeout(() => setName(null), 3100);
  }, []);

  useEffect(() => {
    // Picked on the /theme page -> flag in sessionStorage, read after we land.
    try {
      const pending = window.sessionStorage.getItem(FLAG);
      if (pending) {
        window.sessionStorage.removeItem(FLAG);
        show(pending);
      }
    } catch {
      /* ignore */
    }

    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) show(detail);
    };
    window.addEventListener('carlynk-theme-toast', onEvent as EventListener);
    return () => window.removeEventListener('carlynk-theme-toast', onEvent as EventListener);
  }, [show]);

  if (!name) return null;

  return (
    <div
      className="fixed left-1/2 top-4 z-[10000] -translate-x-1/2 px-4 w-full max-w-[92vw] sm:max-w-none sm:w-auto flex justify-center"
      style={{ pointerEvents: 'none' }}
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        {/* Bubbles drifting up behind the pill */}
        <span className="theme-bubble theme-bubble-1" />
        <span className="theme-bubble theme-bubble-2" />
        <span className="theme-bubble theme-bubble-3" />
        <span className="theme-bubble theme-bubble-4" />
        <span className="theme-bubble theme-bubble-5" />

        <div
          className="relative flex items-center gap-2 bg-[#0d1b2e] text-white pl-1.5 pr-4 py-1.5 shadow-xl"
          style={{
            borderRadius: '9999px',
            border: '1px solid rgba(232,201,106,0.35)',
            animation: leaving
              ? 'theme-toast-out 0.45s cubic-bezier(0.55,0,0.7,0.2) forwards'
              : 'theme-toast-in 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Small gold circle with a blue check inside */}
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{ width: '22px', height: '22px', borderRadius: '9999px', background: '#e8c96a' }}
          >
            <Check size={13} strokeWidth={3.5} className="text-[#1d4ed8]" />
          </span>
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
            Theme <span className="font-bold">{name}</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes theme-toast-in {
          0%   { transform: translateY(-150%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes theme-toast-out {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-150%); opacity: 0; }
        }
        .theme-bubble {
          position: absolute;
          bottom: 6px;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: rgba(232,201,106,0.7);
          opacity: 0;
          pointer-events: none;
        }
        .theme-bubble-1 { left: 14%; animation: theme-bubble-rise 1.5s ease-out 0.25s; }
        .theme-bubble-2 { left: 32%; width: 5px; height: 5px; animation: theme-bubble-rise 1.7s ease-out 0.45s; }
        .theme-bubble-3 { left: 54%; width: 9px; height: 9px; animation: theme-bubble-rise 1.6s ease-out 0.15s; }
        .theme-bubble-4 { left: 72%; width: 5px; height: 5px; animation: theme-bubble-rise 1.8s ease-out 0.55s; }
        .theme-bubble-5 { left: 88%; width: 6px; height: 6px; animation: theme-bubble-rise 1.5s ease-out 0.35s; }
        @keyframes theme-bubble-rise {
          0%   { transform: translateY(0) scale(0.6); opacity: 0; }
          25%  { opacity: 0.9; }
          100% { transform: translateY(-34px) scale(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .theme-bubble { display: none; }
        }
      `}</style>
    </div>
  );
}
