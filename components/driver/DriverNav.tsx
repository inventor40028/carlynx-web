// Driver dashboard navigation
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clearSession } from '@/lib/session';

export default function DriverNav() {
  const router = useRouter();

  const links = [
    { label: 'Dashboard', href: '/driver/dashboard' },
    { label: 'Find a Car', href: '/driver/vehicles' },
    { label: 'Onboarding', href: '/driver/onboarding' },
    { label: 'Medical', href: '/driver/medical' },
    { label: 'Earnings', href: '/driver/earnings' },
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: 'Contracts', href: '/shared/contracts' },
    { label: 'Payments', href: '/shared/payments' },
    { label: 'Emergency', href: '/shared/emergency' },
  ];

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  return (
    <nav className="bg-[#0d1b2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/driver/dashboard" className="flex items-center gap-3">
            <Image
              src="/logo-white.png"
              alt="CarLynk"
              width={32}
              height={32}
              style={{ width: 'auto', height: '32px' }}
            />
            <span className="text-xl font-bold">CarLynk</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#e8c96a] hidden sm:inline">Driver Dashboard</span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm hover:text-[#e8c96a] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex gap-x-6 gap-y-2 text-sm flex-wrap">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#e8c96a] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
