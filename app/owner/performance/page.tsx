// Vehicle Performance — each card shows a small 1:1 front photo.
// Clicking "View" opens a modal with full details + live device feed (no page navigation).
'use client';

import { useState } from 'react';
import Image from 'next/image';
import OwnerNav from '@/components/owner/OwnerNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import VehicleProfileModal, { type PerformanceVehicle } from '@/components/owner/VehicleProfileModal';
import { sampleVehicles } from '@/lib/blueprint';

// Backend will provide real driver assignment + earnings + device feed
const performance: PerformanceVehicle[] = sampleVehicles.slice(0, 3).map((v, i) => ({
  ...v,
  status: 'active',
  driver: ['Kwame Mensah', 'Ama Asante', 'Kofi Owusu'][i],
  driverPhoto: ['/profiles/manprf.png', '/profiles/womanprf.png', '/profiles/manprf.png'][i],
  monthlyEarnings: [3200, 2800, 3450][i],
  trips: [45, 38, 52][i],
  device: {
    online: true,
    coords: ['5.6037° N, 0.1870° W (Accra)', '6.6885° N, 1.6244° W (Kumasi)', '5.6037° N, 0.1870° W (Accra)'][i],
    speed: [42, 0, 38][i],
    lastPing: ['2 min ago', '17 min ago', '1 min ago'][i],
    dashcamHealthy: true,
  },
}));

export default function VehiclePerformance() {
  const [selected, setSelected] = useState<PerformanceVehicle | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <OwnerNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Vehicle Performance</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            Earnings, activity, and partnership status across your fleet.
          </p>

          <div className="space-y-6">
            {performance.map((vehicle) => (
              <Card key={vehicle.id} borderColor="#0f766e" className="fade-in-up">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Small 1:1 front photo — click to expand modal */}
                  <button
                    type="button"
                    onClick={() => setSelected(vehicle)}
                    className="block shrink-0 mx-auto sm:mx-0"
                    aria-label={`View details for ${vehicle.make} ${vehicle.model}`}
                  >
                    <div
                      className="relative w-32 h-32 bg-[#eef3f8] overflow-hidden hover:opacity-90 transition-opacity"
                      style={{ borderRadius: '12px' }}
                    >
                      <Image
                        src={vehicle.views[0].src}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-[#0d1b2e] truncate">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-[#5b6575] text-sm">{vehicle.plate}</p>
                      </div>
                      <StatusBadge status={vehicle.status} />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-[#5b6575] text-xs mb-0.5">Current Driver</div>
                        <div className="font-bold text-[#0d1b2e] truncate">{vehicle.driver}</div>
                      </div>
                      <div>
                        <div className="text-[#5b6575] text-xs mb-0.5">Monthly Earnings</div>
                        <div className="font-bold text-[#0d1b2e]">
                          GH₵ {vehicle.monthlyEarnings.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#5b6575] text-xs mb-0.5">Total Trips</div>
                        <div className="font-bold text-[#0d1b2e]">{vehicle.trips}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#cfd6e3]">
                      <div className="text-xs text-[#5b6575]">Last updated: Today at 10:30 AM</div>
                      <Button variant="primary" onClick={() => setSelected(vehicle)}>
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <VehicleProfileModal vehicle={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
