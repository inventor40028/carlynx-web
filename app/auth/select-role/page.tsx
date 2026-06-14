// Role selection page
'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Car, User } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';

function SelectRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedRole = searchParams.get('role');

  const handleRoleSelect = (role: 'owner' | 'driver') => {
    // If coming from signup (has preselectedRole), go to dashboard
    // Otherwise, go to signup
    if (preselectedRole) {
      // User just signed up, send to dashboard
      if (role === 'owner') {
        router.push('/owner/dashboard');
      } else {
        router.push('/driver/dashboard');
      }
    } else {
      // User clicked "Get Started", send to signup
      if (role === 'owner') {
        router.push('/auth/signup?role=owner');
      } else {
        router.push('/auth/driver-signup');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#0d1b2e] mb-4">Choose Your Role</h1>
        <p className="text-xl text-[#5b6575]">
          Select how you want to use CarLynk
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Owner Option */}
        <div className="bg-white border-t-4 border-t-[#0f766e] border border-[#cfd6e3] p-8">
          <div className="text-[#0f766e] mb-4">
            <Car size={56} strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Car Owner</h2>
          <p className="text-[#5b6575] mb-6">
            I own a vehicle and want to partner with verified drivers
          </p>
          <ul className="space-y-2 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#0f766e]">✓</span>
              <span>List your vehicles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0f766e]">✓</span>
              <span>Review driver applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0f766e]">✓</span>
              <span>Track vehicle performance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0f766e]">✓</span>
              <span>Monitor earnings</span>
            </li>
          </ul>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => handleRoleSelect('owner')}
          >
            Continue as Owner
          </Button>
        </div>

        {/* Driver Option */}
        <div className="bg-white border-t-4 border-t-[#1d4ed8] border border-[#cfd6e3] p-8">
          <div className="text-[#1d4ed8] mb-4">
            <User size={56} strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Driver</h2>
          <p className="text-[#5b6575] mb-6">
            I need a vehicle and want to partner with car owners
          </p>
          <ul className="space-y-2 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#1d4ed8]">✓</span>
              <span>Browse available vehicles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1d4ed8]">✓</span>
              <span>Submit partnership requests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1d4ed8]">✓</span>
              <span>Report earnings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1d4ed8]">✓</span>
              <span>Build your profile</span>
            </li>
          </ul>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => handleRoleSelect('driver')}
          >
            Continue as Driver
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SelectRole() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-6 bg-[#eef3f8]">
        <Suspense fallback={<div>Loading...</div>}>
          <SelectRoleContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
