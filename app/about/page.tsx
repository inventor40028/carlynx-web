// About page — distilled from Carlynk Africa Business Overview.pdf.
// Mission, vision, aim, services, core values.
import Image from 'next/image';
import Link from 'next/link';
import {
  Target, Eye, Compass, ShieldCheck, Sparkles, Scale, Users, Briefcase,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const PILLARS = [
  { icon: Target, title: 'Mission', body: 'Provide a trusted digital platform that connects car owners with professional drivers while promoting transparency, accountability, and efficient vehicle management.' },
  { icon: Eye, title: 'Vision', body: "Become Africa's leading platform for driver-vehicle partnerships, empowering mobility entrepreneurs and creating economic opportunities through smart technology." },
  { icon: Compass, title: 'Aim', body: 'Simplify and formalize the relationship between car owners and drivers, eliminating mistrust, poor accountability and difficulty finding reliable partners.' },
];

const VALUES = [
  { icon: ShieldCheck, label: 'Trust' },
  { icon: Scale, label: 'Transparency' },
  { icon: Users, label: 'Accountability' },
  { icon: Sparkles, label: 'Innovation' },
  { icon: Briefcase, label: 'Opportunity Creation' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Navy hero band */}
      <section className="bg-[#0d1b2e] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="fade-in-up">
            <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">
              ABOUT CARLYNK AFRICA
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Who we are
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              CarLynk Africa is a digital mobility platform connecting car owners with verified
              professional drivers — building a trustworthy ecosystem where partnerships thrive,
              earnings are transparent, and vehicles are tracked.
            </p>
          </div>
          <div className="scale-in hidden md:block">
            <Image
              src="/logo-white.png"
              alt="CarLynk"
              width={140}
              height={140}
              style={{ width: 'auto', height: '140px' }}
            />
          </div>
        </div>
      </section>

      {/* Fleet banner — aerial mockup directly beneath the About hero.
          Fixed-height landscape banner so the parking-lot composition reads on every viewport.
          Subtle dark fade at top/bottom blends it into the page rhythm. */}
      <section
        className="relative isolate overflow-hidden h-[260px] sm:h-[340px] lg:h-[420px] -mt-px"
        aria-label="CarLynk fleet at the Accra hub"
      >
        <Image
          src="/images/dashboardmockup.jpg"
          alt="Aerial view of the CarLynk fleet parked at the Accra hub"
          fill
          sizes="100vw"
          className="object-cover -z-20 select-none pointer-events-none"
          style={{ objectPosition: 'center 55%' }}
          priority
        />
        {/* Top + bottom navy fade so the banner stitches into the surrounding sections */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,27,46,0.85) 0%, rgba(13,27,46,0.20) 25%, rgba(13,27,46,0.20) 75%, rgba(13,27,46,0.92) 100%)',
          }}
        />
        {/* Caption — minimal, premium */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-6xl mx-auto w-full px-6 pb-6 sm:pb-8 fade-in-up">
            <div className="text-[#e8c96a] font-bold text-xs sm:text-sm tracking-widest mb-1">
              AT A GLANCE
            </div>
            <p className="text-white font-semibold text-lg sm:text-xl max-w-xl">
              A growing fleet of verified vehicles — managed under one platform.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-14 px-6">
        <div className="max-w-6xl mx-auto space-y-14">
          {/* Mission / Vision / Aim */}
          <section className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <Card key={p.title} borderColor="#1d4ed8" className="fade-in-up">
                <div className="text-[#1d4ed8] mb-3"><p.icon size={36} strokeWidth={2} /></div>
                <h2 className="text-xl font-bold text-[#0d1b2e] mb-2">{p.title}</h2>
                <p className="text-[#5b6575] text-sm leading-relaxed">{p.body}</p>
              </Card>
            ))}
          </section>

          {/* What we do */}
          <section className="fade-in-up">
            <h2 className="text-2xl font-bold text-[#0d1b2e] mb-2">What we do</h2>
            <p className="text-[#5b6575] mb-6 max-w-3xl">
              CarLynk operates an online platform and mobile application where drivers and car
              owners can find and work with each other. Owners list verified vehicles, drivers
              apply, and both sides manage contracts, payments and vehicle activity in one place.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-t-4 border-t-[#0f766e] border border-[#cfd6e3] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-[#0d1b2e] mb-3">For Car Owners</h3>
                <ul className="space-y-2 text-sm text-[#5b6575]">
                  <li className="flex gap-2"><span className="text-[#0f766e] font-bold">✓</span>Access to verified, accredited drivers</li>
                  <li className="flex gap-2"><span className="text-[#0f766e] font-bold">✓</span>Vehicle tracking &amp; monitoring</li>
                  <li className="flex gap-2"><span className="text-[#0f766e] font-bold">✓</span>Earnings dashboard for driver payments</li>
                  <li className="flex gap-2"><span className="text-[#0f766e] font-bold">✓</span>Driver rating &amp; performance monitoring</li>
                </ul>
              </div>
              <div className="border-t-4 border-t-[#1d4ed8] border border-[#cfd6e3] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-[#0d1b2e] mb-3">For Drivers</h3>
                <ul className="space-y-2 text-sm text-[#5b6575]">
                  <li className="flex gap-2"><span className="text-[#1d4ed8] font-bold">✓</span>Marketplace of car owners</li>
                  <li className="flex gap-2"><span className="text-[#1d4ed8] font-bold">✓</span>Professional profile &amp; verification</li>
                  <li className="flex gap-2"><span className="text-[#1d4ed8] font-bold">✓</span>Daily or weekly payment reporting</li>
                  <li className="flex gap-2"><span className="text-[#1d4ed8] font-bold">✓</span>Easy reporting of vehicle or partnership issues</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Core values */}
          <section className="fade-in-up">
            <h2 className="text-2xl font-bold text-[#0d1b2e] mb-6">Core values</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="flex flex-col items-center text-center bg-white border border-[#cfd6e3] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-[#e8c96a] mb-2"><v.icon size={28} strokeWidth={2} /></div>
                  <div className="font-semibold text-[#0d1b2e] text-sm">{v.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#0d1b2e] rounded-2xl p-10 text-center fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-3">Want to partner with us?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Book an appointment with our team to learn how CarLynk can support your fleet or
              driver career.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/book-appointment">
                <Button variant="secondary">Book An Appointment</Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0d1b2e]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
