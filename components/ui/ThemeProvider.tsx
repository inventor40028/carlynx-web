// Applies the saved theme to <html data-theme> on load and whenever it changes.
// A tiny inline script (in layout) sets it before paint to avoid a flash; this
// component keeps React in sync for client navigations and cross-tab changes.
//
// Exception: the /theme picker page always renders in the default look so the
// page chrome doesn't change while you preview themes. We neutralize the skin
// there and restore the saved theme on navigating away.
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { applyThemeAttribute, getThemeId, DEFAULT_THEME_ID } from '@/lib/themes';

export default function ThemeProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const isPicker = pathname === '/theme';
    const apply = () => applyThemeAttribute(isPicker ? DEFAULT_THEME_ID : getThemeId());
    apply();

    window.addEventListener('carlynk-theme-change', apply);
    window.addEventListener('storage', apply);
    return () => {
      window.removeEventListener('carlynk-theme-change', apply);
      window.removeEventListener('storage', apply);
    };
  }, [pathname]);

  return null;
}
