// Owner Onboarding tracker — 6-step vertical stepper.
// DEMO: every step is clickable. Clicking a step's Continue starts a 4s "Pending review..."
// then "Approved", then that step becomes done and the next step becomes current.
// Click any step to re-run the demo from there.
// Backend will replace with real progress driven by hub inspections etc.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import OwnerNav from '@/components/owner/OwnerNav';
import Footer from '@/components/ui/Footer';

interface OnboardingStep {
  id: string;
  title: string;
  detail: string;
  href?: string;
}

const STEPS: OnboardingStep[] = [
  { id: '1', title: 'Welcome Call',     detail: 'Platform overview, revenue split & owner responsibilities.' },
  { id: '2', title: 'Vehicle Listing',  detail: 'Upload docs, photos, insurance & roadworthy certificate.', href: '/owner/add-vehicle' },
  { id: '3', title: 'Inspection',       detail: '42-point vehicle check at the CarLynk hub.', href: '/shared/inspection' },
  { id: '4', title: 'GPS + Camera',     detail: 'GPS tracker & dashcam installed on your vehicle.' },
  { id: '5', title: 'Subscription',     detail: 'Choose a plan from Silver GH₵ 80 up to Commercial GH₵ 1,000.', href: '/subscriptions' },
  { id: '6', title: 'Matching',         detail: 'Review trusted drivers, approve & schedule handover.' },
];

type StepState = 'done' | 'pending' | 'approved' | 'todo';

export default function OwnerOnboardingPage() {
  const [doneUntil, setDoneUntil] = useState(2);
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<'pending' | 'approved' | null>(null);

  const handleContinue = (index: number) => {
    if (runningIndex !== null) return;
    setRunningIndex(index);
    setPhase('pending');
    setTimeout(() => {
      setPhase('approved');
      setTimeout(() => {
        setDoneUntil((d) => Math.max(d, index + 1));
        setRunningIndex(null);
        setPhase(null);
      }, 1200);
    }, 4000);
  };

  const stateFor = (index: number): StepState => {
    if (runningIndex === index && phase) return phase;
    if (index < doneUntil) return 'done';
    return 'todo';
  };

  const isCurrentStep = (index: number) => index === doneUntil && runningIndex === null;

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <OwnerNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Owner Onboarding</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            List your vehicle and get matched with trusted drivers. Click any step to run the demo.
          </p>

          <div className="fade-in-up">
            {STEPS.map((step, index) => {
              const isLast = index === STEPS.length - 1;
              const s = stateFor(index);
              const isCurrent = isCurrentStep(index);
              const isDone = s === 'done';
              const isLocked = runningIndex !== null && runningIndex !== index;

              const badgeClass = [
                'flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-sm font-bold transition-colors',
                isDone ? 'bg-[#0f766e] text-white' : '',
                s === 'pending' ? 'bg-[#e8c96a] text-[#0d1b2e]' : '',
                s === 'approved' ? 'bg-[#1B6B45] text-white' : '',
                s === 'todo' && isCurrent ? 'bg-[#0f766e] text-white ring-4 ring-[#0f766e]/30 animate-pulse' : '',
                s === 'todo' && !isCurrent ? 'bg-[#cfd6e3] text-[#5b6575]' : '',
              ].join(' ');

              return (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={badgeClass}>
                      {isDone || s === 'approved' ? <Check size={20} /> :
                       s === 'pending' ? <Loader2 size={20} className="animate-spin" /> :
                       step.id}
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-[#cfd6e3] my-1" />}
                  </div>

                  <div
                    className={[
                      'flex-1 mb-4 bg-white border rounded-xl p-5 shadow-sm transition-shadow hover:shadow-md',
                      isCurrent ? 'border-[#0f766e]' : 'border-[#cfd6e3]',
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-[#0d1b2e]">{step.title}</h2>
                      {isDone && <span className="text-xs font-semibold text-[#1B6B45]">Completed</span>}
                      {s === 'pending' && <span className="text-xs font-semibold text-[#e8c96a]">Pending review...</span>}
                      {s === 'approved' && <span className="text-xs font-semibold text-[#1B6B45]">Approved</span>}
                      {s === 'todo' && isCurrent && <span className="text-xs font-semibold text-[#0f766e]">In progress</span>}
                    </div>
                    <p className="text-sm text-[#5b6575] mt-2">{step.detail}</p>

                    {s !== 'pending' && s !== 'approved' && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleContinue(index)}
                          disabled={isLocked}
                          style={{ borderRadius: '16px' }}
                          className={[
                            'inline-flex items-center gap-2 px-6 py-3 font-semibold shadow-md transition-all duration-200',
                            isLocked
                              ? 'bg-[#cfd6e3] text-[#5b6575] cursor-not-allowed'
                              : 'bg-[#0d1b2e] text-white hover:bg-[#122844] hover:shadow-lg',
                          ].join(' ')}
                        >
                          {isDone ? 'Re-run demo' : 'Continue'}
                          <ArrowRight size={16} />
                        </button>
                        {step.href && (
                          <Link
                            href={step.href}
                            style={{ borderRadius: '16px' }}
                            className="inline-block px-6 py-3 font-semibold border-2 border-[#0d1b2e] text-[#0d1b2e] hover:bg-[#eef3f8] transition-all duration-200"
                          >
                            Open
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
