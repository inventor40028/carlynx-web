// Public-site header.
// Logged out: shows the public nav links (About / Careers / Contacts / Customer
// Service / Book Appointment) plus Sign In / Sign Up.
// Logged in: collapses to "Hi, [name]" + Logout (the role nav handles the rest
// of the navigation on shared pages).
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, CalendarCheck, X } from 'lucide-react';
import { useSession } from './useSession';
import { clearSession } from '@/lib/session';
import HamburgerIcon from '@/components/ui/HamburgerIcon';
import ThemeIcon from '@/components/ui/ThemeIcon';

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
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

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

  return (
    <header className="bg-[#0d1b2e] text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Brand */}
          <Link href={session ? `/${session.role}/dashboard` : '/'} className="flex items-center shrink-0">
            <Image
              src="/logo-white.png"
              alt="CarLynk"
              width={40}
              height={40}
              style={{ width: 'auto', height: '40px' }}
            />
          </Link>

          {ready && !session && (
            <nav className="hidden xl:flex items-center gap-x-6 text-sm">
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
                className={`flex items-center gap-1.5 font-semibold ${
                  pathname === '/book-appointment' ? 'text-[#e8c96a]' : 'text-white/90 hover:text-[#e8c96a]'
                } transition-colors`}
              >
                <CalendarCheck size={16} />
                Book An Appointment
              </Link>
            </nav>
          )}

          {/* Wait until we know the session state to avoid a flash of the wrong UI */}
          {ready && (
            <nav className="flex items-center gap-3 sm:gap-5">
              {/* Theme — desktop icon (mobile gets it inside the hamburger panel) */}
              <Link
                href="/theme"
                aria-label="Change theme"
                title="Change theme"
                className="hidden xl:inline-flex items-center justify-center hover:text-[#e8c96a] transition-colors"
              >
                <ThemeIcon size={22} />
              </Link>
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
                  <Link href="/auth/signin" className="hidden sm:inline text-sm hover:text-[#e8c96a] transition-colors">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="hidden sm:inline text-sm font-semibold bg-[#e8c96a] text-[#0d1b2e] px-4 py-2 hover:bg-[#d4b556] transition-colors"
                    style={{ borderRadius: '999px' }}
                  >
                    Sign Up
                  </Link>
                  <button
                    type="button"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="xl:hidden inline-flex items-center justify-center w-10 h-10 hover:text-[#e8c96a] transition-colors"
                  >
                    {open ? <X size={22} /> : <HamburgerIcon size={26} />}
                  </button>
                </>
              )}
            </nav>
          )}
        </div>
      </div>

      {ready && !session && open && (
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
                Menu
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {[...PUBLIC_LINKS, { label: 'Book An Appointment', href: '/book-appointment' }, { label: 'Theme', href: '/theme' }].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3 border-b border-white/10 transition-colors ${
                        pathname === link.href ? 'text-[#e8c96a] font-semibold' : 'hover:text-[#e8c96a]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/auth/signin"
                  className="px-5 py-2.5 border border-white/20 text-center font-semibold rounded-full hover:text-[#e8c96a] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 bg-[#e8c96a] text-[#0d1b2e] text-center font-semibold rounded-full hover:bg-[#d4b556] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
