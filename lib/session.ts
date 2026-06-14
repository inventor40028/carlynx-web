// Demo session — backend will replace this with real auth (JWT, cookies, etc).
// We store role + name in localStorage so the UI knows what to show/hide.

export type Role = 'owner' | 'driver' | 'admin';

export interface Session {
  role: Role;
  name: string;
  email: string;
}

const KEY = 'carlynk_session';

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  // Notify same-tab listeners (storage event only fires cross-tab)
  window.dispatchEvent(new Event('carlynk-session-change'));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('carlynk-session-change'));
}
