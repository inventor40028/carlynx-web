// Vehicle listings (Find a Car) — grid shows front view only (1:1) + key details.
// Clicking "View Details" opens a popup with all views, full specs, damages & problems.
'use client';

import { useState } from 'react';
import Image from 'next/image';
import DriverNav from '@/components/driver/DriverNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import VehicleDetailModal from '@/components/driver/VehicleDetailModal';
import { sampleVehicles, type Vehicle } from '@/lib/blueprint';
import { Settings, MapPin } from 'lucide-react';

export default function VehicleListings() {
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const handleRequest = (vehicle: Vehicle) => {
    // Backend will handle the partnership request
    console.log('Request partnership for vehicle:', vehicle.id);
    alert(`Partnership request sent for ${vehicle.make} ${vehicle.model}!`);
    setSelected(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <DriverNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Find a Car</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            Browse available vehicles. Tap a car to see all views, details and condition.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVehicles.map((vehicle) => (
              <Card key={vehicle.id} borderColor="#1d4ed8" className="fade-in-up flex flex-col">
                {/* Front view only — 1:1 square */}
                <div
                  className="relative w-full aspect-square bg-[#eef3f8] overflow-hidden mb-4 cursor-pointer"
                  style={{ borderRadius: '12px' }}
                  onClick={() => setSelected(vehicle)}
                >
                  <Image
                    src={vehicle.views[0].src}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span
                    className="absolute top-3 right-3"
                  >
                    <StatusBadge status={vehicle.status} />
                  </span>
                </div>

                {/* Key details */}
                <h3 className="text-lg font-bold text-[#0d1b2e]">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </h3>
                <p className="text-[#5b6575] text-sm mb-3">{vehicle.plate}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-[#5b6575]">
                    <Settings size={15} className="text-[#1d4ed8]" />
                    <span className="font-semibold text-[#0d1b2e]">{vehicle.transmission}</span>
                    <span>· {vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5b6575]">
                    <MapPin size={15} className="text-[#1d4ed8]" />
                    <span>{vehicle.location}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-4 mt-auto">
                  <span className="text-2xl font-bold text-[#0d1b2e]">GH₵ {vehicle.monthlyRate}</span>
                  <span className="text-sm text-[#5b6575]">/month</span>
                </div>

                <Button variant="primary" className="w-full" onClick={() => setSelected(vehicle)}>
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Detail popup */}
      <VehicleDetailModal
        vehicle={selected}
        onClose={() => setSelected(null)}
        onRequest={handleRequest}
      />
    </div>
  );
}
