// Public-site header.
// Logged out: shows the public nav links (About / Careers / Contacts / Customer
// Service / Book Appointment) plus Sign In / Sign Up.
// Logged in: collapses to "Hi, [name]" + Logout (the role nav handles the rest
// of the navigation on shared pages).
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, CalendarCheck } from 'lucide-react';
import { useSession } from './useSession';
import { clearSession } from '@/lib/session';

const PUBLIC_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'Customer Service', href: '/customer-service' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, ready } = useSession();

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  return (
    <header className="bg-[#0d1b2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Brand */}
          <Link href={session ? `/${session.role}/dashboard` : '/'} className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo-white.png"
              alt="CarLynk"
              width={40}
              height={40}
              style={{ width: 'auto', height: '40px' }}
            />
            <span className="text-2xl font-bold">CarLynk</span>
          </Link>

          {/* Wait until we know the session state to avoid a flash of the wrong UI */}
          {ready && (
            <nav className="flex items-center gap-3 sm:gap-5">
              {session ? (
                <>
                  <span className="text-sm text-[#e8c96a] hidden sm:inline">
                    Hi, {session.name.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:text-[#e8c96a] transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Auth links — kept on the right for muscle memory */}
                  <Link href="/auth/signin" className="text-sm hover:text-[#e8c96a] transition-colors">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-sm font-semibold bg-[#e8c96a] text-[#0d1b2e] px-4 py-2 hover:bg-[#d4b556] transition-colors"
                    style={{ borderRadius: '999px' }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>

        {/* Public link row — hidden while signed in so it doesn't compete with the role nav */}
        {ready && !session && (
          <nav className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {PUBLIC_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition-colors ${
                    active ? 'text-[#e8c96a] font-semibold' : 'text-white/85 hover:text-[#e8c96a]'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/book-appointment"
              className={`ml-auto flex items-center gap-1.5 text-sm font-semibold ${
                pathname === '/book-appointment' ? 'text-[#e8c96a]' : 'text-white/90 hover:text-[#e8c96a]'
              } transition-colors`}
            >
              <CalendarCheck size={16} />
              Book An Appointment
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
