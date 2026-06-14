// React hook for the demo session — re-reads on mount and on session changes.
'use client';

import { useEffect, useState } from 'react';
import { getSession, type Session } from '@/lib/session';

export function useSession(): { session: Session | null; ready: boolean } {
  const [session, setLocal] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocal(getSession());
    setReady(true);
    const onChange = () => setLocal(getSession());
    window.addEventListener('carlynk-session-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('carlynk-session-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  return { session, ready };
}
