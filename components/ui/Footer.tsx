// Site-wide footer with link columns + company contact info.
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { socialMeta, type SocialKey } from './SocialIcons';
import { company } from '@/lib/company';

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'Book An Appointment', href: '/book-appointment' },
];
const PLATFORM_LINKS = [
  { label: 'Get Started', href: '/auth/select-role' },
  { label: 'Sign In', href: '/auth/signin' },
  { label: 'Subscriptions', href: '/subscriptions' },
  { label: 'Customer Service', href: '/customer-service' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2e] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-white.png"
                alt="CarLynk"
                width={36}
                height={36}
                style={{ width: 'auto', height: '36px' }}
              />
              <span className="text-xl font-bold">CarLynk</span>
            </div>
            <p className="text-sm text-white/75 mb-3">{company.tagline}</p>
            <p className="text-xs text-white/55 mb-5">Accra, Ghana · Mobility platform</p>

            {/* Circular gold social buttons — real brand SVGs */}
            <div className="flex flex-wrap items-center gap-2">
              {company.socials.map((s) => {
                const meta = socialMeta[s.key as SocialKey];
                if (!meta) return null;
                const { Icon, label } = meta;
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    aria-label={label}
                    title={label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e8c96a] text-[#e8c96a] hover:bg-[#e8c96a] hover:text-[#0d1b2e] hover:scale-110 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#e8c96a] uppercase tracking-wider text-xs font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-[#e8c96a] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[#e8c96a] uppercase tracking-wider text-xs font-bold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-[#e8c96a] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#e8c96a] uppercase tracking-wider text-xs font-bold mb-3">Reach us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-[#e8c96a] mt-0.5 shrink-0" />
                <span className="text-white/80">
                  {company.address.line1}, {company.address.line2}<br />
                  {company.address.city}, {company.address.country}
                </span>
              </li>
              <li>
                <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2 text-white/80 hover:text-[#e8c96a] transition-colors">
                  <Phone size={15} className="text-[#e8c96a]" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-white/80 hover:text-[#e8c96a] transition-colors break-all">
                  <Mail size={15} className="text-[#e8c96a] shrink-0" />
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-white/55">
          <span>© 2026 CarLynk Africa. All rights reserved.</span>
          <span>Built in Accra · Powered by trust.</span>
        </div>
      </div>
    </footer>
  );
}
