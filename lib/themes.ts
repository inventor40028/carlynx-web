// CarLynk theme system. Mirrors lib/session.ts: theme id is stored in localStorage
// and applied as a `data-theme` attribute on <html>. The actual color remapping
// lives in app/themes.css (scoped to html[data-theme="..."]).
//
// Spec source: instructions/CARLYNX_THEME_OPTIONS.md
// Brand rule: navy + royal blue stay present in every theme.

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  brand: string;
  brandHover: string;
  brandSecondary: string;
  royalBlue: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  cta: string;
  ctaText: string;
  success: string;
  danger: string;
  warning: string;
  focus: string;
}

export interface CarLynkTheme {
  id: string;
  name: string;
  shortLabel: string;
  mode: ThemeMode;
  description: string;
  colors: ThemeColors;
}

// Order matters: Royal Default is first (the current site identity).
export const THEMES: CarLynkTheme[] = [
  {
    id: 'royal-default',
    name: 'CarLynk Royal Default',
    shortLabel: 'Royal Default',
    mode: 'light',
    description: 'The signature look. Navy leads, gold supports CTAs, royal blue marks action.',
    colors: {
      brand: '#0d1b2e', brandHover: '#122844', brandSecondary: '#1A3260', royalBlue: '#1d4ed8',
      background: '#ffffff', surface: '#ffffff', surfaceAlt: '#eef3f8',
      text: '#111827', textMuted: '#5b6575', border: '#cfd6e3',
      cta: '#e8c96a', ctaText: '#0d1b2e',
      success: '#0f766e', danger: '#dc2626', warning: '#ea580c', focus: '#1d4ed8',
    },
  },
  {
    id: 'golden-mist-gold',
    name: 'Golden Mist Gold',
    shortLabel: 'Golden Mist Gold',
    mode: 'light',
    description: 'The bright twin of Glass Morphic. White base with kente-gold frosted panels.',
    colors: {
      brand: '#0D1F3C', brandHover: '#122844', brandSecondary: '#1A3260', royalBlue: '#1d4ed8',
      background: '#ffffff', surface: '#F6E9C6', surfaceAlt: '#F4F6F9',
      text: '#111827', textMuted: '#111827', border: '#E8D7AE',
      cta: '#D4940A', ctaText: '#0D1F3C',
      success: '#1B6B45', danger: '#C0392B', warning: '#D4940A', focus: '#1d4ed8',
    },
  },
  {
    id: 'golden-mist-navy',
    name: 'Golden Mist Navy',
    shortLabel: 'Golden Mist Navy',
    mode: 'light',
    description: 'Same white light base, but the frosted panels are classic deep navy.',
    colors: {
      brand: '#0D1F3C', brandHover: '#122844', brandSecondary: '#1A3260', royalBlue: '#1d4ed8',
      background: '#ffffff', surface: '#21314F', surfaceAlt: '#F4F6F9',
      text: '#111827', textMuted: '#111827', border: '#C7D2E0',
      cta: '#D4940A', ctaText: '#0D1F3C',
      success: '#1B6B45', danger: '#C0392B', warning: '#D4940A', focus: '#1d4ed8',
    },
  },
  {
    id: 'slate-fleet',
    name: 'Slate Fleet Neutral',
    shortLabel: 'Slate Fleet',
    mode: 'light',
    description: 'Quiet and data-heavy. A cool slate-grey skin for dense operational screens.',
    colors: {
      brand: '#0D1F3C', brandHover: '#122844', brandSecondary: '#1A3260', royalBlue: '#1d4ed8',
      background: '#E9EEF4', surface: '#ffffff', surfaceAlt: '#DBE3ED',
      text: '#111827', textMuted: '#5B6675', border: '#C7D2E0',
      cta: '#1d4ed8', ctaText: '#ffffff',
      success: '#1B6B45', danger: '#C0392B', warning: '#D4940A', focus: '#1d4ed8',
    },
  },
  {
    id: 'royal-operations',
    name: 'Royal Operations',
    shortLabel: 'Royal Ops',
    mode: 'dark',
    description: 'A cool operations console. Graphite surfaces led by a royal-blue command accent.',
    colors: {
      brand: '#141C27', brandHover: '#1E2A3A', brandSecondary: '#1A3260', royalBlue: '#5B9CF8',
      background: '#10161F', surface: '#1A2330', surfaceAlt: '#232E3D',
      text: '#E8EDF4', textMuted: '#9AA7B8', border: '#2D3A4D',
      cta: '#3B82F6', ctaText: '#ffffff',
      success: '#34D399', danger: '#F87171', warning: '#FBBF24', focus: '#3B82F6',
    },
  },
  {
    id: 'glass-morphic-blue',
    name: 'Glass Morphic Blue',
    shortLabel: 'Glass Morphic Blue',
    mode: 'dark',
    description: 'A chilled frosted-glass mode. Translucent navy panels with a cool blue glow.',
    colors: {
      brand: '#0B1730', brandHover: '#13213F', brandSecondary: '#1A3260', royalBlue: '#6BA5FF',
      background: '#0A1426', surface: '#16243F', surfaceAlt: '#1E3052',
      text: '#EAF1FB', textMuted: '#A7B6CE', border: '#2C3F63',
      cta: '#E8C96A', ctaText: '#0B1730',
      success: '#3FB984', danger: '#F0857A', warning: '#E8C96A', focus: '#6BA5FF',
    },
  },
  {
    id: 'glass-morphic-gold',
    name: 'Glass Morphic Gold',
    shortLabel: 'Glass Morphic Gold',
    mode: 'dark',
    description: 'Same chilled navy base, but the frosted panels glow bright kente gold.',
    colors: {
      brand: '#0B1730', brandHover: '#13213F', brandSecondary: '#1A3260', royalBlue: '#6BA5FF',
      background: '#0A1426', surface: '#26375A', surfaceAlt: '#2E2A1E',
      text: '#EAF1FB', textMuted: '#A7B6CE', border: '#5A4A22',
      cta: '#E8C96A', ctaText: '#0B1730',
      success: '#3FB984', danger: '#F0857A', warning: '#E8C96A', focus: '#E8C96A',
    },
  },
  {
    id: 'kente-night',
    name: 'Kente Night',
    shortLabel: 'Kente Night',
    mode: 'dark',
    description: 'Required dark mode. Navy-black base, gold emphasis, royal blue action.',
    colors: {
      brand: '#0D1F3C', brandHover: '#122844', brandSecondary: '#1A3260', royalBlue: '#3B82F6',
      background: '#081424', surface: '#0D1F3C', surfaceAlt: '#132A4A',
      text: '#F8FAFC', textMuted: '#B8C2D1', border: '#243B5C',
      cta: '#F0B429', ctaText: '#081424',
      success: '#3A8F66', danger: '#E15A4B', warning: '#F0B429', focus: '#3B82F6',
    },
  },
];

export const DEFAULT_THEME_ID = 'royal-default';
const KEY = 'carlynk_theme';

export function getThemeId(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  try {
    return window.localStorage.getItem(KEY) || DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function setThemeId(id: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, id);
  // Apply immediately + notify same-tab listeners.
  applyThemeAttribute(id);
  window.dispatchEvent(new Event('carlynk-theme-change'));
}

export function getTheme(id: string): CarLynkTheme {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

// Sets <html data-theme="..."> so themes.css can remap the brand colors.
export function applyThemeAttribute(id: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', id);
}
