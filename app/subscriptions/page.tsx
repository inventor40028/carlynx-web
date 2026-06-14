// Subscription Plans — role-aware.
// Logged-in driver sees only driver plans, logged-in owner sees only owner plans.
// Backend handles actual subscription creation and payment activation.
'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Header from '@/components/ui/Header';
import DriverNav from '@/components/driver/DriverNav';
import OwnerNav from '@/components/owner/OwnerNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { driverPlans, ownerPlans } from '@/lib/blueprint';
import { useSession } from '@/components/ui/useSession';

export default function SubscriptionsPage() {
  const { session, ready } = useSession();
  const [audience, setAudience] = useState<'driver' | 'owner'>('driver');
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  // Lock audience to the logged-in role
  useEffect(() => {
    if (session?.role === 'driver' || session?.role === 'owner') {
      setAudience(session.role);
    }
  }, [session]);

  // Don't render until session is read (avoids a flash of wrong tab)
  if (!ready) return null;

  const isLoggedIn = !!session;
  const isDriver = audience === 'driver';
  const suffix = billing === 'monthly' ? '/month' : '/year';

  // Pick the right top nav for the role
  const Nav = session?.role === 'driver' ? DriverNav : session?.role === 'owner' ? OwnerNav : Header;

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <Nav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Subscription Plans</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            {isLoggedIn
              ? `Plans for ${isDriver ? 'drivers' : 'vehicle owners'} — choose what fits your journey.`
              : 'Choose the plan that fits your journey.'}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 fade-in-up">
            {/* Audience tab — only shown when logged out */}
            {!isLoggedIn && (
              <div className="inline-flex rounded-xl border border-[#cfd6e3] bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setAudience('driver')}
                  className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                    isDriver ? 'bg-[#1d4ed8] text-white' : 'text-[#5b6575] hover:text-[#0d1b2e]'
                  }`}
                >
                  Driver Plans
                </button>
                <button
                  type="button"
                  onClick={() => setAudience('owner')}
                  className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                    !isDriver ? 'bg-[#0f766e] text-white' : 'text-[#5b6575] hover:text-[#0d1b2e]'
                  }`}
                >
                  Owner Plans
                </button>
              </div>
            )}

            {/* Billing toggle */}
            <div className="inline-flex rounded-xl border border-[#cfd6e3] bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                  billing === 'monthly' ? 'bg-[#0d1b2e] text-white' : 'text-[#5b6575] hover:text-[#0d1b2e]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('yearly')}
                className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                  billing === 'yearly' ? 'bg-[#0d1b2e] text-white' : 'text-[#5b6575] hover:text-[#0d1b2e]'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {isDriver ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-up">
              {driverPlans.map((plan) => {
                const price = billing === 'monthly' ? plan.monthly : plan.yearly;
                return (
                  <Card key={plan.name} borderColor="#1d4ed8" className="flex flex-col">
                    {plan.popular && (
                      <span className="self-start mb-3 inline-block rounded-full bg-[#e8c96a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0d1b2e]">
                        Popular
                      </span>
                    )}
                    <h2 className="text-2xl font-bold text-[#0d1b2e]">{plan.name}</h2>
                    <div className="mt-3 mb-4">
                      <span className="text-3xl font-bold text-[#0d1b2e]">GH₵ {price}</span>
                      <span className="text-[#5b6575] text-sm">{suffix}</span>
                    </div>
                    <p className="text-sm text-[#5b6575] flex-1">{plan.insurance}</p>
                    {plan.freeMedical && (
                      <div className="mt-3 flex items-center gap-2 text-[#1B6B45] font-semibold text-sm">
                        <Check size={18} />
                        Free medical
                      </div>
                    )}
                    <Button variant="primary" className="mt-5 w-full">
                      Choose {plan.name}
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 fade-in-up">
              {ownerPlans.map((plan) => {
                const price = billing === 'monthly' ? plan.monthly : plan.yearly;
                return (
                  <Card key={plan.name} borderColor="#0f766e" className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#0d1b2e]">{plan.name}</h2>
                    <div className="mt-3 mb-4">
                      <span className="text-3xl font-bold text-[#0d1b2e]">GH₵ {price}</span>
                      <span className="text-[#5b6575] text-sm">{suffix}</span>
                    </div>
                    <p className="text-sm text-[#5b6575] flex-1">{plan.vehicles} vehicles</p>
                    <Button variant="primary" className="mt-5 w-full">
                      Choose {plan.name}
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
