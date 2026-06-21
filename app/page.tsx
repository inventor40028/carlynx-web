// Landing page
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield, FileText, DollarSign,
  Info, Briefcase, MapPin, CalendarCheck, Headset, ArrowRight,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import SectionBackground from '@/components/ui/SectionBackground';
import CarDriveStrip from '@/components/ui/CarDriveStrip';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#0d1b2e] text-white pt-8 pb-20 px-6 sm:pt-14 lg:py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-up">
            <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-4">
              CarLynk PLATFORM
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Linking Car Owners with Trusted Drivers
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A professional platform for verified driver-owner partnerships in Ghana.
              Build trust, track earnings, and manage contracts seamlessly.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/select-role">
                <Button variant="secondary">Get Started</Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0d1b2e]">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center scale-in">
            <Image
              src="/logo-white.png"
              alt="CarLynk Logo"
              width={300}
              height={300}
              style={{ width: 'auto', height: '300px' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Animation strip between hero and Choose Your Path — car drives in, parks, tires keep spinning */}
      <CarDriveStrip />

      {/* User Types Section — photo of an owner+driver handshake fades behind the cards */}
      <SectionBackground
        src="/images/herosecbel.png"
        alt="Car owner and CarLynk driver shaking hands in Accra"
        variant="soft"
        // Anchor a touch above center so the handshake stays visible on tall viewports
        position="center 35%"
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 fade-in-up">
            <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">
              JOIN THE NETWORK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Choose Your Path</h2>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
              Whether you own a vehicle or drive professionally — CarLynk connects you with verified partners.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Car Owner Card */}
            <div className="bg-white border-t-4 border-t-[#0f766e] border border-[#cfd6e3] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow fade-in-up">
              <h3 className="text-2xl font-bold text-[#0d1b2e] mb-4">
                I Own A Car
              </h3>
              <p className="text-[#5b6575] mb-6">
                List your vehicle and connect with verified professional drivers.
                Track performance, manage contracts, and monitor earnings.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#0f766e] font-bold">✓</span>
                  <span>Verified driver marketplace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0f766e] font-bold">✓</span>
                  <span>Digital contracts and payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0f766e] font-bold">✓</span>
                  <span>Real-time vehicle tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0f766e] font-bold">✓</span>
                  <span>Earnings and performance reports</span>
                </li>
              </ul>
              <Link href="/auth/signup?role=owner">
                <Button variant="primary" className="w-full">
                  Register as Owner
                </Button>
              </Link>
            </div>

            {/* Driver Card */}
            <div className="bg-white border-t-4 border-t-[#1d4ed8] border border-[#cfd6e3] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow fade-in-up">
              <h3 className="text-2xl font-bold text-[#0d1b2e] mb-4">
                I Need A Car
              </h3>
              <p className="text-[#5b6575] mb-6">
                Find available vehicles and partner with car owners.
                Submit earnings, track contracts, and build your reputation.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4ed8] font-bold">✓</span>
                  <span>Browse available vehicles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4ed8] font-bold">✓</span>
                  <span>Professional verification (KYC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4ed8] font-bold">✓</span>
                  <span>Transparent payment tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4ed8] font-bold">✓</span>
                  <span>Build your driver profile</span>
                </li>
              </ul>
              <Link href="/auth/driver-signup">
                <Button variant="primary" className="w-full">
                  Register as Driver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* Features Section — buildtrust photo behind, gradient fades for legibility */}
      <SectionBackground
        src="/images/buildtrust.png"
        alt="CarLynk driver checking the platform on his phone"
        variant="soft"
        position="center 30%"
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 fade-in-up">
            <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">
              BUILT FOR TRUST
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Trust &amp; Security Built In</h2>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
              Every partnership starts with verification, formal contracts, and protected payments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#cfd6e3] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow fade-in-up">
              <div className="text-[#e8c96a] mb-4">
                <Shield size={48} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1b2e] mb-3">
                Identity Verification
              </h3>
              <p className="text-[#5b6575]">
                KYC verification for all users. Only verified drivers and owners can partner.
              </p>
            </div>
            <div className="bg-white border border-[#cfd6e3] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow fade-in-up">
              <div className="text-[#e8c96a] mb-4">
                <FileText size={48} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1b2e] mb-3">
                Digital Contracts
              </h3>
              <p className="text-[#5b6575]">
                Clear terms, digital signatures, and complete contract history.
              </p>
            </div>
            <div className="bg-white border border-[#cfd6e3] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow fade-in-up">
              <div className="text-[#e8c96a] mb-4">
                <DollarSign size={48} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1b2e] mb-3">
                Payment Protection
              </h3>
              <p className="text-[#5b6575]">
                Secure payment tracking, escrow support, and transparent settlements.
              </p>
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* Get to know us — links into About / Careers / Contacts / Customer Service / Book */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">GET TO KNOW US</div>
            <h2 className="text-3xl font-bold text-[#0d1b2e]">Explore CarLynk Africa</h2>
            <p className="text-[#5b6575] mt-2 max-w-2xl mx-auto">
              Learn what we stand for, see how to reach us, and book a meeting with our team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { href: '/about', label: 'About', icon: Info, desc: 'Mission, vision, and values.', color: '#1d4ed8' },
              { href: '/careers', label: 'Careers', icon: Briefcase, desc: 'Roles & how to apply.', color: '#e8c96a' },
              { href: '/contacts', label: 'Contacts', icon: MapPin, desc: 'Address, phone, email.', color: '#0f766e' },
              { href: '/book-appointment', label: 'Book An Appointment', icon: CalendarCheck, desc: 'Pick a weekday slot.', color: '#1d4ed8' },
              { href: '/customer-service', label: 'Customer Service', icon: Headset, desc: 'FAQs and support.', color: '#dc2626' },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white border border-[#cfd6e3] rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all fade-in-up flex flex-col"
                style={{ borderTop: `4px solid ${card.color}` }}
              >
                <div className="mb-3" style={{ color: card.color }}>
                  <card.icon size={28} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-[#0d1b2e] mb-1">{card.label}</h3>
                <p className="text-sm text-[#5b6575] flex-1">{card.desc}</p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
                  style={{ color: card.color }}
                >
                  Explore <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#0d1b2e] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join CarLynk today and experience professional driver-owner partnerships.
          </p>
          <Link href="/auth/select-role">
            <Button variant="secondary" className="text-lg px-8 py-4">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
