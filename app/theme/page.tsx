// Theme picker. Default first, then the alternates. Each card is a compact
// preview (mini mock + swatch row). Choosing a theme saves it, flags the
// confirmation toast, and does a full reload to '/' so the GlobalLoader plays
// for ~2s and the home page comes back fully themed.
//
// Glass Morphic is special: its two variants (blue / gold) share one card with
// an inline Blue/Gold toggle. Same navy base, only the frosted accent differs.
'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Check, Moon, Sun } from 'lucide-react';
import { THEMES, getThemeId, setThemeId, getTheme, type CarLynkTheme } from '@/lib/themes';

const PENDING_TOAST = 'carlynk_pending_theme_toast';

function MiniPreview({ c }: { c: CarLynkTheme['colors'] }) {
  return (
    <div className="relative rounded-t-2xl overflow-hidden" style={{ background: c.background }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: c.brand }}>
        <span className="text-[11px] font-bold tracking-wide" style={{ color: '#ffffff' }}>CarLynk</span>
        <span className="inline-block h-1.5 w-7 rounded-full" style={{ background: c.cta }} />
      </div>
      <div className="p-3">
        <div className="rounded-lg p-3 mb-2" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
          <div className="h-2 w-2/3 rounded-full mb-2" style={{ background: c.text }} />
          <div className="h-1.5 w-full rounded-full mb-1.5" style={{ background: c.textMuted, opacity: 0.5 }} />
          <div className="h-1.5 w-4/5 rounded-full" style={{ background: c.textMuted, opacity: 0.4 }} />
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: c.cta, color: c.ctaText }}>CTA</span>
            <span className="text-[10px] font-semibold" style={{ color: c.royalBlue }}>Link</span>
          </div>
        </div>
        <div className="rounded-lg px-2 py-1.5 flex items-center gap-1.5" style={{ background: c.surfaceAlt }}>
          <span className="h-2 w-2 rounded-full" style={{ background: c.success }} />
          <span className="h-2 w-2 rounded-full" style={{ background: c.warning }} />
          <span className="h-2 w-2 rounded-full" style={{ background: c.danger }} />
        </div>
      </div>
    </div>
  );
}

function ModeBadge({ mode }: { mode: 'light' | 'dark' }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{
        background: mode === 'dark' ? '#0d1b2e' : '#eef3f8',
        color: mode === 'dark' ? '#e8c96a' : '#5b6575',
      }}
    >
      {mode === 'dark' ? <Moon size={11} /> : <Sun size={11} />}
      {mode}
    </span>
  );
}

function Swatches({ c }: { c: CarLynkTheme['colors'] }) {
  const swatches = [c.brand, c.surfaceAlt, c.cta, c.royalBlue, c.success, c.danger];
  return (
    <div className="flex gap-1.5">
      {swatches.map((s, i) => (
        <span key={i} className="h-5 flex-1 rounded-md" style={{ background: s, border: '1px solid rgba(0,0,0,0.06)' }} />
      ))}
    </div>
  );
}

function ThemeCard({ theme, active, onPick }: { theme: CarLynkTheme; active: boolean; onPick: (t: CarLynkTheme) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(theme)}
      className="group text-left rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
      style={{
        borderColor: active ? '#1d4ed8' : '#cfd6e3',
        background: '#ffffff',
        boxShadow: active ? '0 0 0 3px rgba(29,78,216,0.15)' : undefined,
      }}
    >
      <div className="relative">
        <MiniPreview c={theme.colors} />
        {active && (
          <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: '#e8c96a' }}>
            <Check size={14} strokeWidth={3.5} className="text-[#1d4ed8]" />
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#0d1b2e]">{theme.shortLabel}</h3>
          <ModeBadge mode={theme.mode} />
        </div>
        <p className="text-xs text-[#5b6575] leading-relaxed mb-3 min-h-[2.5rem]">{theme.description}</p>
        <Swatches c={theme.colors} />
        <div
          className="mt-3 text-center text-sm font-semibold py-2 rounded-lg transition-colors"
          style={{ background: active ? '#eef3f8' : '#0d1b2e', color: active ? '#5b6575' : '#ffffff' }}
        >
          {active ? 'Current theme' : 'Use this theme'}
        </div>
      </div>
    </button>
  );
}

// Generic card for a theme with two variants and an inline A/B toggle.
// Used by Glass Morphic (Blue/Gold) and Golden Mist (Gold/Navy).
function VariantCard({
  title,
  desc,
  mode,
  optA,
  optB,
  activeId,
  onPick,
}: {
  title: string;
  desc: string;
  mode: 'light' | 'dark';
  optA: { id: string; label: string; tint: string; bg: string };
  optB: { id: string; label: string; tint: string; bg: string };
  activeId: string;
  onPick: (t: CarLynkTheme) => void;
}) {
  const themeA = getTheme(optA.id);
  const themeB = getTheme(optB.id);
  const [side, setSide] = useState<'a' | 'b'>(activeId === optB.id ? 'b' : 'a');
  const opt = side === 'b' ? optB : optA;
  const shown = side === 'b' ? themeB : themeA;
  const active = activeId === shown.id;

  return (
    <div
      className="rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: active ? '#1d4ed8' : '#cfd6e3',
        background: '#ffffff',
        boxShadow: active ? '0 0 0 3px rgba(29,78,216,0.15)' : undefined,
      }}
    >
      <div className="relative">
        <MiniPreview c={shown.colors} />
        {active && (
          <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: '#e8c96a' }}>
            <Check size={14} strokeWidth={3.5} className="text-[#1d4ed8]" />
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#0d1b2e]">{title}</h3>
          <ModeBadge mode={mode} />
        </div>
        <p className="text-xs text-[#5b6575] leading-relaxed mb-3">{desc}</p>

        {/* A / B toggle */}
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setSide('a')}
            className="flex-1 text-xs font-bold py-1.5 rounded-lg border-2 transition-all"
            style={{
              borderColor: side === 'a' ? optA.tint : '#cfd6e3',
              background: side === 'a' ? optA.bg : '#ffffff',
              color: '#0d1b2e',
            }}
          >
            {optA.label}
          </button>
          <button
            type="button"
            onClick={() => setSide('b')}
            className="flex-1 text-xs font-bold py-1.5 rounded-lg border-2 transition-all"
            style={{
              borderColor: side === 'b' ? optB.tint : '#cfd6e3',
              background: side === 'b' ? optB.bg : '#ffffff',
              color: '#0d1b2e',
            }}
          >
            {optB.label}
          </button>
        </div>

        <Swatches c={shown.colors} />
        <button
          type="button"
          onClick={() => onPick(shown)}
          className="w-full mt-3 text-center text-sm font-semibold py-2 rounded-lg transition-colors"
          style={{ background: active ? '#eef3f8' : '#0d1b2e', color: active ? '#5b6575' : '#ffffff' }}
        >
          {active ? 'Current theme' : `Use ${title} ${opt.label}`}
        </button>
      </div>
    </div>
  );
}

export default function ThemePage() {
  const [activeId, setActiveId] = useState<string>('royal-default');

  useEffect(() => {
    setActiveId(getThemeId());
  }, []);

  const pick = (theme: CarLynkTheme) => {
    setThemeId(theme.id);
    try {
      window.sessionStorage.setItem(PENDING_TOAST, theme.shortLabel);
    } catch {
      /* ignore */
    }
    window.location.assign('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#081424]">
      <Header />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 fade-in-up">
            <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-2">APPEARANCE</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Choose your theme</h1>
            <p className="text-[#B8C2D1] max-w-xl mx-auto">
              Pick a look for CarLynk. Navy and royal blue stay in every theme — only surfaces and accents change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEMES.map((theme) => {
              // Fold paired variants into single toggle cards.
              if (theme.id === 'glass-morphic-gold' || theme.id === 'golden-mist-navy') return null;
              if (theme.id === 'glass-morphic-blue') {
                return (
                  <VariantCard
                    key="glass-morphic"
                    title="Glass Morphic"
                    desc="A chilled frosted-glass mode on a navy base. Choose your glass accent."
                    mode="dark"
                    optA={{ id: 'glass-morphic-blue', label: 'Blue', tint: '#1d4ed8', bg: '#eef3f8' }}
                    optB={{ id: 'glass-morphic-gold', label: 'Gold', tint: '#d4940a', bg: '#fdf3dc' }}
                    activeId={activeId}
                    onPick={pick}
                  />
                );
              }
              if (theme.id === 'golden-mist-gold') {
                return (
                  <VariantCard
                    key="golden-mist"
                    title="Golden Mist"
                    desc="A bright frosted-glass mode on a white base. Choose your glass accent."
                    mode="light"
                    optA={{ id: 'golden-mist-gold', label: 'Gold', tint: '#d4940a', bg: '#fdf3dc' }}
                    optB={{ id: 'golden-mist-navy', label: 'Navy', tint: '#1d4ed8', bg: '#eef3f8' }}
                    activeId={activeId}
                    onPick={pick}
                  />
                );
              }
              return <ThemeCard key={theme.id} theme={theme} active={activeId === theme.id} onPick={pick} />;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
