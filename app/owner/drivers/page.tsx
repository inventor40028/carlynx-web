// Driver marketplace — owner reviews incoming driver requests.
// Click "View Profile" to open a modal with the driver's photo + full profile.
// Approve / Reject live inside the modal.
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Star, Mail, Phone, MapPin, Briefcase, ShieldCheck } from 'lucide-react';
import OwnerNav from '@/components/owner/OwnerNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';

interface DriverRequest {
  id: number;
  name: string;
  photo: string;          // profile photo path (provided by backend after KYC)
  email: string;
  phone: string;
  location: string;
  experience: string;
  rating: number;
  totalTrips: number;
  licenseNumber: string;
  vehicle: string;        // vehicle they want to operate
  status: string;
  kycStatus: string;
  trustScore: number;
  bio: string;
}

// Backend will provide real data
const driverRequests: DriverRequest[] = [
  {
    id: 1,
    name: 'Kwame Mensah',
    photo: '/profiles/manprf.png',
    email: 'kwame.mensah@example.com',
    phone: '+233 24 123 4567',
    location: 'Accra, Ghana',
    experience: '5 years',
    rating: 4.8,
    totalTrips: 312,
    licenseNumber: 'DL-12345-GH',
    vehicle: 'Toyota Corolla (GR-1234-20)',
    status: 'pending',
    kycStatus: 'approved',
    trustScore: 92,
    bio: 'Professional driver with 5 years of experience in Accra. Specializes in city and inter-regional trips.',
  },
  {
    id: 2,
    name: 'Ama Asante',
    photo: '/profiles/womanprf.png',
    email: 'ama.asante@example.com',
    phone: '+233 20 987 6543',
    location: 'Kumasi, Ghana',
    experience: '3 years',
    rating: 4.6,
    totalTrips: 178,
    licenseNumber: 'DL-67890-GH',
    vehicle: 'Honda Civic (GR-5678-19)',
    status: 'pending',
    kycStatus: 'approved',
    trustScore: 88,
    bio: 'Reliable driver based in Kumasi. Punctual, careful, and rated highly by previous partners.',
  },
  {
    id: 3,
    name: 'Kofi Owusu',
    photo: '/profiles/manprf.png',
    email: 'kofi.owusu@example.com',
    phone: '+233 27 555 0123',
    location: 'Tema, Ghana',
    experience: '7 years',
    rating: 4.9,
    totalTrips: 489,
    licenseNumber: 'DL-13579-GH',
    vehicle: 'Toyota Corolla (GR-1234-20)',
    status: 'pending',
    kycStatus: 'approved',
    trustScore: 96,
    bio: 'Senior driver with 7 years on the platform. Excellent record, no incidents.',
  },
];

export default function DriverMarketplace() {
  const [selected, setSelected] = useState<DriverRequest | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [selected]);

  // ESC closes the modal
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const handleApprove = (d: DriverRequest) => {
    // Backend will record the approval and notify the driver
    console.log('Approve driver:', d.id);
    alert(`${d.name} approved.`);
    setSelected(null);
  };

  const handleReject = (d: DriverRequest) => {
    // Backend will record the rejection and notify the driver
    console.log('Reject driver:', d.id);
    alert(`${d.name} request rejected.`);
    setSelected(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <OwnerNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Driver Requests</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            Review verified drivers requesting partnership with your vehicles.
          </p>

          <div className="space-y-4">
            {driverRequests.map((driver) => (
              <Card key={driver.id} className="fade-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Small profile photo */}
                  <div
                    className="relative w-16 h-16 shrink-0 bg-[#eef3f8] overflow-hidden"
                    style={{ borderRadius: '9999px' }}
                  >
                    <Image
                      src={driver.photo}
                      alt={driver.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#0d1b2e]">{driver.name}</h3>
                      <StatusBadge status={driver.kycStatus} />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-[#5b6575]">
                        <Briefcase size={14} />
                        <span>{driver.experience}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#5b6575]">
                        <Star size={14} className="text-[#e8c96a] fill-[#e8c96a]" />
                        <span>{driver.rating}</span>
                      </div>
                      <div className="text-[#5b6575] truncate">
                        Wants: <span className="font-semibold text-[#0d1b2e]">{driver.vehicle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:shrink-0">
                    <Button variant="primary" onClick={() => setSelected(driver)}>
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Driver Profile Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-stretch md:items-center justify-center md:p-4 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full max-w-2xl my-0 md:my-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky title banner */}
            <div className="sticky top-0 z-10 bg-[#0d1b2e] text-white px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold truncate">Driver Profile</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="text-white/80 hover:text-white p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Photo + name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  className="relative w-32 h-32 shrink-0 bg-[#eef3f8] overflow-hidden mx-auto sm:mx-0"
                  style={{ borderRadius: '9999px' }}
                >
                  <Image
                    src={selected.photo}
                    alt={selected.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-[#0d1b2e]">{selected.name}</h3>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-1">
                    <StatusBadge status={selected.kycStatus} />
                    <div className="flex items-center gap-1 text-sm text-[#5b6575]">
                      <Star size={14} className="text-[#e8c96a] fill-[#e8c96a]" />
                      <span>{selected.rating} · {selected.totalTrips} trips</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Score */}
              <div
                className="bg-[#eef3f8] p-4 flex items-center gap-3"
                style={{ borderRadius: '12px' }}
              >
                <ShieldCheck size={32} className="text-[#1B6B45] shrink-0" />
                <div>
                  <div className="text-xs text-[#5b6575]">Trust Score</div>
                  <div className="text-xl font-bold text-[#0d1b2e]">{selected.trustScore} / 100</div>
                </div>
              </div>

              {/* About */}
              <div>
                <div className="text-sm font-bold text-[#0d1b2e] mb-1">About</div>
                <p className="text-sm text-[#5b6575]">{selected.bio}</p>
              </div>

              {/* Contact & details grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#1d4ed8] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs text-[#5b6575]">Email</div>
                    <div className="text-sm font-semibold text-[#0d1b2e] truncate">{selected.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#1d4ed8] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs text-[#5b6575]">Phone</div>
                    <div className="text-sm font-semibold text-[#0d1b2e]">{selected.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#1d4ed8] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs text-[#5b6575]">Location</div>
                    <div className="text-sm font-semibold text-[#0d1b2e]">{selected.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase size={18} className="text-[#1d4ed8] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs text-[#5b6575]">Experience</div>
                    <div className="text-sm font-semibold text-[#0d1b2e]">{selected.experience}</div>
                  </div>
                </div>
              </div>

              {/* License + requested vehicle */}
              <div className="border-t border-[#cfd6e3] pt-4 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-[#5b6575]">License Number</div>
                  <div className="font-semibold text-[#0d1b2e]">{selected.licenseNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-[#5b6575]">Requested Vehicle</div>
                  <div className="font-semibold text-[#0d1b2e]">{selected.vehicle}</div>
                </div>
              </div>
            </div>

            {/* Sticky footer with Approve / Reject */}
            <div className="sticky bottom-0 bg-white border-t border-[#cfd6e3] p-4 flex gap-3">
              <Button variant="outline" onClick={() => handleReject(selected)} className="flex-1">
                Reject
              </Button>
              <Button variant="primary" onClick={() => handleApprove(selected)} className="flex-1">
                Approve
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
