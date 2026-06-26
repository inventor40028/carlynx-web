// ─────────────────────────────────────────────────────────────────────────────
// DRIVER DASHBOARD — protected route (role = 'driver')
// ─────────────────────────────────────────────────────────────────────────────
// Shows: stats (earnings, contract status, KYC status, trust score),
// current vehicle/contract, quick nav links to all driver pages.
//
// All data below is MOCK — hardcoded for UI development.
// Backend integration points:
//   GET /api/driver/dashboard  → { stats, currentContract, currentVehicle, trustScore }
//   Stats fields: weeklyEarnings (GHS), monthlyEarnings (GHS), contractStatus, kycStatus
//   Contract/vehicle linked via partnership_id from Supabase.
// ─────────────────────────────────────────────────────────────────────────────
// Driver dashboard page
import Link from 'next/link';
import DriverNav from '@/components/driver/DriverNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import { Star, ShieldCheck } from 'lucide-react';

export default function DriverDashboard() {
  // TODO: Fetch real data from backend
  // GET /api/driver/dashboard → { stats, currentContract, trustScore }

  const stats = {
    activeContract: 0,
    monthlyEarnings: 0,
    totalTrips: 0,
    rating: 0,
  };

  const quickLinks = [
    { label: 'Onboarding', href: '/driver/onboarding' },
    { label: 'Medical', href: '/driver/medical' },
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: 'Emergency', href: '/shared/emergency' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <DriverNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Driver Dashboard</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">Your partnership at a glance.</p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8 fade-in-up">
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">Active Contract</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">{stats.activeContract}</div>
            </Card>
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">Monthly Earnings</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">GH₵ {stats.monthlyEarnings}</div>
            </Card>
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">Total Trips</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">{stats.totalTrips}</div>
            </Card>
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">Your Rating</div>
              <div className="flex items-center gap-2 text-3xl font-bold text-[#0d1b2e]">
                <Star size={28} className="text-[#e8c96a]" fill="#e8c96a" />
                {stats.rating}
              </div>
            </Card>
          </div>

          {/* Trust Score */}
          <Card className="mb-8 fade-in-up" borderColor="#1B6B45">
            <div className="flex items-center gap-4">
              <ShieldCheck size={40} className="text-[#1B6B45] shrink-0" />
              <div>
                <div className="text-[#5b6575] text-sm mb-1">Trust Score</div>
                <div className="text-4xl font-bold text-[#0d1b2e]">-- / 100</div>
                <div className="text-sm text-[#5b6575]">Connect backend to see score</div>
              </div>
            </div>
          </Card>

          {/* Current Partnership */}
          <Card className="mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Current Partnership</h2>
            <div className="text-center py-8 text-[#5b6575]">
              <p className="mb-4">No active partnership yet. Browse available vehicles to get started.</p>
              <a href="/driver/vehicles" className="text-[#0d1b2e] font-semibold hover:text-[#1d4ed8]">
                Browse Vehicles
              </a>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 fade-in-up">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="outline">{link.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
