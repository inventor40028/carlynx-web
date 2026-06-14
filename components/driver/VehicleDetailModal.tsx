// Vehicle detail modal — popup with all car views + full details + damages/problems.
// Mobile-first: sticky name banner on top so the car name & status are always visible.
// "Request Partnership" button is fixed at the bottom of the modal.
'use client';

import { useEffect } from 'react';
import {
  X, Settings, Fuel, Users, Gauge, MapPin, User, AlertTriangle, Wrench,
} from 'lucide-react';
import type { Vehicle } from '@/lib/blueprint';
import CarImageCarousel from './CarImageCarousel';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onRequest: (vehicle: Vehicle) => void;
}

export default function VehicleDetailModal({ vehicle, onClose, onRequest }: VehicleDetailModalProps) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (vehicle) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [vehicle]);

  // ESC closes the modal
  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const specs = [
    { icon: Settings, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Fuel', value: vehicle.fuel },
    { icon: Users, label: 'Seats', value: String(vehicle.seats) },
    { icon: Gauge, label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} km` },
    { icon: MapPin, label: 'Location', value: vehicle.location },
    { icon: User, label: 'Owner', value: vehicle.owner },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-stretch md:items-center justify-center md:p-4"
      onClick={onClose}
    >
      <div
        // Mobile (no md:my): full-bleed, fills the viewport.
        // Desktop (md:): centered card with rounded corners and capped at 90vh
        //                so header & footer stay visible while the body scrolls.
        className="bg-white w-full max-w-3xl flex flex-col md:max-h-[90vh] h-full md:h-auto md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title banner — pinned to the top of the panel (NOT page-sticky).
            On desktop the panel is capped at 90vh so this never overlaps content. */}
        <div
          className="bg-[#0d1b2e] text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0"
        >
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold truncate">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#e8c96a]">
              <span className="truncate">{vehicle.plate}</span>
              <span className="opacity-50">·</span>
              <StatusBadge status={vehicle.status} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-white/80 hover:text-white p-1 shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable body — flexes to fill remaining height between header and footer */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6">
          {/* All views carousel — auto-slides every 3s, tap to enlarge */}
          <CarImageCarousel views={vehicle.views} />

          {/* Specs grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="text-[#1d4ed8]"><s.icon size={20} /></div>
                <div className="min-w-0">
                  <div className="text-xs text-[#5b6575]">{s.label}</div>
                  <div className="font-semibold text-[#0d1b2e] truncate">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership rates */}
          <div className="border-t border-[#cfd6e3] pt-4">
            <div className="text-sm font-bold text-[#0d1b2e] mb-2">Partnership Rates</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#eef3f8] p-3 text-center" style={{ borderRadius: '8px' }}>
                <div className="text-xs text-[#5b6575]">Daily</div>
                <div className="font-bold text-[#0d1b2e]">GH₵ {vehicle.dailyRate}</div>
              </div>
              <div className="bg-[#eef3f8] p-3 text-center" style={{ borderRadius: '8px' }}>
                <div className="text-xs text-[#5b6575]">Weekly</div>
                <div className="font-bold text-[#0d1b2e]">GH₵ {vehicle.weeklyRate}</div>
              </div>
              <div className="bg-[#eef3f8] p-3 text-center" style={{ borderRadius: '8px' }}>
                <div className="text-xs text-[#5b6575]">Monthly</div>
                <div className="font-bold text-[#0d1b2e]">GH₵ {vehicle.monthlyRate}</div>
              </div>
            </div>
          </div>

          {/* Damages */}
          <div className="border-t border-[#cfd6e3] pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0d1b2e] mb-2">
              <AlertTriangle size={16} className="text-[#ea580c]" /> Reported Damages
            </div>
            <ul className="space-y-1 text-sm text-[#5b6575]">
              {vehicle.damages.map((d, i) => <li key={i}>• {d}</li>)}
            </ul>
          </div>

          {/* Problems */}
          <div className="border-t border-[#cfd6e3] pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0d1b2e] mb-2">
              <Wrench size={16} className="text-[#1d4ed8]" /> Known Problems
            </div>
            <ul className="space-y-1 text-sm text-[#5b6575]">
              {vehicle.problems.map((p, i) => <li key={i}>• {p}</li>)}
            </ul>
          </div>
        </div>

        {/* Footer — pinned to the panel bottom, always visible */}
        <div className="bg-white border-t border-[#cfd6e3] p-4 flex gap-3 shrink-0">
          <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
          <Button variant="primary" onClick={() => onRequest(vehicle)} className="flex-1">
            Request Partnership
          </Button>
        </div>
      </div>
    </div>
  );
}
