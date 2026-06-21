// Driver dashboard navigation.
// Desktop (xl+): inline link row with room to breathe.
// Mobile / tablet: collapsed behind a hamburger; tapping opens a vertical link panel.
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { clearSession } from '@/lib/session';
import HamburgerIcon from '@/components/ui/HamburgerIcon';

const LINKS = [
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

export default function DriverNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  // ESC closes the menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-[#0d1b2e] text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link href="/driver/dashboard" className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="CarLynk"
              width={32}
              height={32}
              style={{ width: 'auto', height: '32px' }}
            />
          </Link>

          {/* Inline links — only at xl+ where there's room */}
          <div className="hidden xl:flex items-center gap-x-5 text-sm">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href) ? 'text-[#e8c96a] font-semibold' : 'hover:text-[#e8c96a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#e8c96a] hidden xl:inline">Driver Dashboard</span>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden xl:inline text-sm hover:text-[#e8c96a] transition-colors"
            >
              Logout
            </button>

            {/* Hamburger — visible below xl */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 hover:text-[#e8c96a] transition-colors"
            >
              {open ? <X size={22} /> : <HamburgerIcon size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet panel */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="xl:hidden fixed inset-0 z-30 bg-black/40"
          />
          <div className="xl:hidden absolute top-full inset-x-0 z-40 bg-[#0d1b2e] border-t border-white/10 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="text-xs uppercase tracking-widest text-[#e8c96a] font-semibold mb-3">
                Driver Dashboard
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3 border-b border-white/10 transition-colors ${
                        isActive(link.href) ? 'text-[#e8c96a] font-semibold' : 'hover:text-[#e8c96a]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 w-full sm:w-auto px-5 py-2.5 bg-[#e8c96a] text-[#0d1b2e] font-semibold rounded-full hover:bg-[#d4b556] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
