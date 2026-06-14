// Vehicle profile modal — opens from the owner's Performance page when "View" is clicked.
// Shows the small 1:1 front photo + key stats + live device feed placeholder (owner-only).
// Backend will replace mock device data with the real hardware API feed.
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X, Satellite, MapPin, Gauge, Clock, Activity, ShieldCheck, AlertTriangle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import type { Vehicle } from '@/lib/blueprint';

export interface PerformanceVehicle extends Vehicle {
  driver: string;
  driverPhoto: string; // path under /public, e.g. /profiles/manprf.png
  monthlyEarnings: number;
  trips: number;
  device: {
    online: boolean;
    coords: string;
    speed: number;
    lastPing: string;
    dashcamHealthy: boolean;
  };
}

interface VehicleProfileModalProps {
  vehicle: PerformanceVehicle | null;
  onClose: () => void;
}

export default function VehicleProfileModal({ vehicle, onClose }: VehicleProfileModalProps) {
  // Lock body scroll and listen for ESC while open
  useEffect(() => {
    if (!vehicle) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl flex flex-col"
        style={{ borderRadius: '16px', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner — pinned to the panel top (NOT page-sticky), so it never overlaps content */}
        <div
          className="bg-[#0d1b2e] text-white p-5 flex justify-between items-start shrink-0"
          style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h2>
            <p className="text-sm text-white/70">{vehicle.plate}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={vehicle.status} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-white/80 hover:text-white p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Top row: small 1:1 front photo + key stats */}
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Small 1:1 front photo */}
            <div className="lg:col-span-1">
              <div
                className="relative w-full aspect-square bg-[#eef3f8] overflow-hidden mb-2"
                style={{ borderRadius: '12px' }}
              >
                <Image
                  src={vehicle.views[0].src}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="text-xs text-[#5b6575] text-center">Front view</div>
            </div>

            {/* Key stats — Current Driver tile gets a small avatar next to the name */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Current Driver — special tile with mini profile photo */}
              <div
                className="bg-white border border-[#cfd6e3] p-3"
                style={{ borderRadius: '10px', borderTop: '3px solid #0f766e' }}
              >
                <div className="text-[#5b6575] text-xs mb-1">Current Driver</div>
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="relative w-7 h-7 shrink-0 overflow-hidden bg-[#eef3f8]"
                    style={{ borderRadius: '9999px' }}
                  >
                    <Image
                      src={vehicle.driverPhoto}
                      alt={vehicle.driver}
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  </div>
                  <div className="font-bold text-[#0d1b2e] text-sm truncate">{vehicle.driver}</div>
                </div>
              </div>

              {/* Remaining stats */}
              {[
                { label: 'Monthly Earnings', value: `GH₵ ${vehicle.monthlyEarnings.toLocaleString()}` },
                { label: 'Total Trips', value: vehicle.trips.toString() },
                { label: 'Transmission', value: vehicle.transmission },
                { label: 'Fuel', value: vehicle.fuel },
                { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} km` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-[#cfd6e3] p-3"
                  style={{ borderRadius: '10px', borderTop: '3px solid #0f766e' }}
                >
                  <div className="text-[#5b6575] text-xs mb-1">{s.label}</div>
                  <div className="font-bold text-[#0d1b2e] text-sm truncate">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Device Feed — owner only. Backend wires real hardware feed here. */}
          <div
            className="bg-white border border-[#cfd6e3] p-5"
            style={{ borderRadius: '12px', borderTop: '3px solid #1B6B45' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Satellite size={20} className="text-[#1B6B45]" />
                <h3 className="text-lg font-bold text-[#0d1b2e]">Live Device Feed</h3>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold ${
                  vehicle.device.online ? 'bg-[#1B6B45]/10 text-[#1B6B45]' : 'bg-[#fee2e2] text-[#dc2626]'
                }`}
                style={{ borderRadius: '9999px' }}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    vehicle.device.online ? 'bg-[#1B6B45] animate-pulse' : 'bg-[#dc2626]'
                  }`}
                />
                {vehicle.device.online ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Map placeholder — backend swaps in real map view */}
            <div
              className="relative w-full h-48 sm:h-56 mb-4 overflow-hidden"
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0d1b2e 0%, #122844 50%, #1d4ed8 100%)',
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                <MapPin size={44} className="text-[#e8c96a] mb-2" />
                <div className="text-sm font-semibold">{vehicle.device.coords}</div>
                <div className="text-xs text-white/70 mt-1">
                  Live whereabouts from installed device · backend feed
                </div>
              </div>
            </div>

            {/* Device readings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <Gauge size={18} className="text-[#1d4ed8] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-[#5b6575]">Speed</div>
                  <div className="text-sm font-semibold text-[#0d1b2e]">{vehicle.device.speed} km/h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#1d4ed8] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-[#5b6575]">Last Ping</div>
                  <div className="text-sm font-semibold text-[#0d1b2e]">{vehicle.device.lastPing}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-[#1d4ed8] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-[#5b6575]">Dashcam</div>
                  <div className="text-sm font-semibold text-[#0d1b2e]">
                    {vehicle.device.dashcamHealthy ? 'Healthy' : 'Attention'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#1B6B45] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-[#5b6575]">Tamper</div>
                  <div className="text-sm font-semibold text-[#0d1b2e]">No alerts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            <Link href="/shared/inspection" onClick={onClose}>
              <Button variant="outline">Schedule Inspection</Button>
            </Link>
            <Link href="/shared/maintenance" onClick={onClose}>
              <Button variant="outline">Book Maintenance</Button>
            </Link>
            <Link href="/shared/contracts" onClick={onClose}>
              <Button variant="outline">View Contract</Button>
            </Link>
            <Button variant="outline" className="text-[#dc2626] border-[#dc2626] hover:bg-[#fef2f2]">
              <AlertTriangle size={16} className="inline mr-1" /> Report Issue
            </Button>
          </div>
        </div>

        {/* Footer — pinned to the panel bottom, always visible */}
        <div className="p-5 sm:p-6 border-t border-[#cfd6e3] flex justify-end shrink-0">
          <Button variant="primary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
