// Owner dashboard page
import Link from 'next/link';
import OwnerNav from '@/components/owner/OwnerNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import { ShieldCheck } from 'lucide-react';

export default function OwnerDashboard() {
  // Backend will provide real data
  const stats = {
    totalVehicles: 3,
    activePartnerships: 2,
    pendingRequests: 5,
    monthlyEarnings: 4500,
  };

  const vehicles = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, plate: 'GR-1234-20', status: 'partnered' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, plate: 'GR-5678-19', status: 'available' },
    { id: 3, make: 'Nissan', model: 'Sentra', year: 2021, plate: 'GR-9012-21', status: 'partnered' },
  ];

  const quickLinks = [
    { label: 'Onboarding', href: '/owner/onboarding' },
    { label: 'Inspection', href: '/shared/inspection' },
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: 'Maintenance', href: '/shared/maintenance' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <OwnerNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Owner Dashboard</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">Manage your fleet and partnerships.</p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8 fade-in-up">
            <Card borderColor="#0f766e">
              <div className="text-[#5b6575] text-sm mb-1">Total Vehicles</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">{stats.totalVehicles}</div>
            </Card>
            <Card borderColor="#0f766e">
              <div className="text-[#5b6575] text-sm mb-1">Active Partnerships</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">{stats.activePartnerships}</div>
            </Card>
            <Card borderColor="#0f766e">
              <div className="text-[#5b6575] text-sm mb-1">Pending Requests</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">{stats.pendingRequests}</div>
            </Card>
            <Card borderColor="#0f766e">
              <div className="text-[#5b6575] text-sm mb-1">Monthly Earnings</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">GH₵ {stats.monthlyEarnings}</div>
            </Card>
          </div>

          {/* Trust Score */}
          <Card className="mb-8 fade-in-up" borderColor="#1B6B45">
            <div className="flex items-center gap-4">
              <ShieldCheck size={40} className="text-[#1B6B45] shrink-0" />
              <div>
                <div className="text-[#5b6575] text-sm mb-1">Trust Score</div>
                <div className="text-4xl font-bold text-[#0d1b2e]">95 / 100</div>
                <div className="text-sm text-[#1B6B45] font-semibold">Excellent standing</div>
              </div>
            </div>
          </Card>

          {/* Vehicles List */}
          <Card className="mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Your Vehicles</h2>
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex justify-between items-center border-b border-[#cfd6e3] pb-4 last:border-0"
                >
                  <div>
                    <div className="font-bold text-[#0d1b2e]">
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </div>
                    <div className="text-sm text-[#5b6575]">{vehicle.plate}</div>
                  </div>
                  <StatusBadge status={vehicle.status} />
                </div>
              ))}
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
