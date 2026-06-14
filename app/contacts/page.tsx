// Contacts page — address, phone, email, social handles + a styled location card.
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Compass, Clock,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { socialMeta, type SocialKey } from '@/components/ui/SocialIcons';
import { company } from '@/lib/company';

export default function ContactsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="bg-[#0d1b2e] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto fade-in-up">
          <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">GET IN TOUCH</div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">Contact CarLynk Africa</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Whether you're an owner, driver, or just curious — here's how to reach us.
          </p>
        </div>
      </section>

      <main className="flex-1 py-14 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Quick contact tiles */}
          <section className="grid md:grid-cols-3 gap-6">
            <Card borderColor="#1d4ed8" className="fade-in-up">
              <div className="text-[#1d4ed8] mb-3"><Phone size={28} /></div>
              <h3 className="text-sm uppercase tracking-wider text-[#5b6575] font-semibold mb-1">Phone</h3>
              <a
                href={`tel:${company.phoneRaw}`}
                className="text-xl font-bold text-[#0d1b2e] hover:text-[#1d4ed8] transition-colors block"
              >
                {company.phone}
              </a>
              <p className="text-xs text-[#5b6575] mt-1">{company.officeHours.days}, {company.officeHours.timeRange}</p>
            </Card>

            <Card borderColor="#e8c96a" className="fade-in-up">
              <div className="text-[#e8c96a] mb-3"><Mail size={28} /></div>
              <h3 className="text-sm uppercase tracking-wider text-[#5b6575] font-semibold mb-1">Email</h3>
              <a
                href={`mailto:${company.email}`}
                className="text-base sm:text-lg font-bold text-[#0d1b2e] hover:text-[#1d4ed8] transition-colors break-all block"
              >
                {company.email}
              </a>
              <p className="text-xs text-[#5b6575] mt-1">We reply within 1 business day.</p>
            </Card>

            <Card borderColor="#0f766e" className="fade-in-up">
              <div className="text-[#0f766e] mb-3"><MapPin size={28} /></div>
              <h3 className="text-sm uppercase tracking-wider text-[#5b6575] font-semibold mb-1">Address</h3>
              <p className="font-bold text-[#0d1b2e] leading-snug">
                {company.address.line1}<br />
                {company.address.line2}<br />
                {company.address.city}, {company.address.country}
              </p>
            </Card>
          </section>

          {/* Styled location panel (placeholder for real map — backend / marketing will add a map embed later) */}
          <section className="fade-in-up">
            <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Find us</h2>
            <div
              className="relative w-full h-72 overflow-hidden rounded-2xl shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #0d1b2e 0%, #122844 55%, #1d4ed8 130%)',
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <MapPin size={48} className="text-[#e8c96a] mb-3" />
                <div className="text-lg font-bold">{company.address.line1}, {company.address.line2}</div>
                <div className="text-sm text-white/80 mt-1">{company.address.city}, {company.address.country}</div>
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.address.line1}, ${company.address.line2}, ${company.address.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary">
                      <Compass size={16} className="inline mr-1" /> Open in Google Maps
                    </Button>
                  </a>
                  <Link href="/book-appointment">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0d1b2e]">
                      Book an Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Office hours + social handles */}
          <section className="grid md:grid-cols-2 gap-6">
            <Card className="fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={20} className="text-[#1d4ed8]" />
                <h3 className="text-lg font-bold text-[#0d1b2e]">Office hours</h3>
              </div>
              <div className="text-[#0d1b2e]">
                <div className="font-semibold">{company.officeHours.days}</div>
                <div className="text-sm text-[#5b6575]">{company.officeHours.timeRange}</div>
              </div>
              <p className="text-xs text-[#5b6575] mt-3">
                We don't yet have a public-facing office, but you can book a meeting with us — see the Book An Appointment page.
              </p>
            </Card>

            <Card className="fade-in-up">
              <h3 className="text-lg font-bold text-[#0d1b2e] mb-3">Follow us</h3>
              <p className="text-sm text-[#5b6575] mb-4">Real brand icons — handles go live once marketing confirms.</p>
              {/* Circular gold-accent social buttons — real brand SVGs from SocialIcons.tsx */}
              <div className="flex flex-wrap items-center gap-3">
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
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#e8c96a] text-[#0d1b2e] hover:bg-[#e8c96a] hover:scale-110 transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
