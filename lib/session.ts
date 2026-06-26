// ─────────────────────────────────────────────────────────────────────────────
// SESSION STATE — frontend only, placeholder for backend auth
// ─────────────────────────────────────────────────────────────────────────────
//
// What this does:
//   Stores a minimal session ({ role, name, email }) in localStorage so the UI
//   can show role-appropriate navigation, dashboards, and CTAs without a round
//   trip to the server on every render.
//
// What backend must replace:
//   - setSession() is currently called directly from the signin/signup pages
//     after they validate credentials in-browser. Replace those calls with:
//       POST /api/auth/login        { email, password }  → { token, session }
//       POST /api/auth/signup/owner   { ... }            → { token, session }
//       POST /api/auth/signup/driver  { ... }            → { token, session }
//     The backend issues a JWT in an httpOnly cookie and returns the same
//     `Session` shape. The frontend calls setSession(session) with that result —
//     no further changes needed.
//   - clearSession() is called on logout. Backend must also invalidate the JWT
//     server-side via POST /api/auth/logout.
//   - On page load, the frontend should call GET /api/auth/me to refresh the
//     session in case the user's token expired or their role changed.
//
// Important: this file never holds the JWT. Tokens live in httpOnly cookies so
// XSS can't steal them. Only non-sensitive display data lives in localStorage.
// ─────────────────────────────────────────────────────────────────────────────

export type Role = 'owner' | 'driver' | 'admin';

export interface Session {
  role: Role;
  name: string;
  email: string;
}

// localStorage key. Do not change — older sessions would be silently dropped.
const KEY = 'carlynk_session';

/** Read the current session. Returns null when nobody is signed in or on SSR. */
export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

/** Persist a session. Call this after the backend's /api/auth/login succeeds. */
export function setSession(s: Session): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  // `storage` event only fires in OTHER tabs. We dispatch a custom event so
  // listeners in the SAME tab (like useSession) also re-render.
  window.dispatchEvent(new Event('carlynk-session-change'));
}

/** Clear the local session. Backend must also invalidate the JWT server-side. */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('carlynk-session-change'));
}
