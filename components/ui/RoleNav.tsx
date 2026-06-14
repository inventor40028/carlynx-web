// RoleNav — picks the right top nav based on session role.
// Use this on shared pages so a logged-in driver sees the driver nav
// and a logged-in owner sees the owner nav. Logged out → plain Header.
'use client';

import Header from './Header';
import DriverNav from '@/components/driver/DriverNav';
import OwnerNav from '@/components/owner/OwnerNav';
import { useSession } from './useSession';

export default function RoleNav() {
  const { session, ready } = useSession();
  if (!ready) {
    // First render: empty navy bar to avoid layout shift
    return <div className="bg-[#0d1b2e]" style={{ height: '96px' }} />;
  }
  if (session?.role === 'driver') return <DriverNav />;
  if (session?.role === 'owner') return <OwnerNav />;
  return <Header />;
}
