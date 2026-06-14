// Driver Onboarding tracker — 8-step vertical stepper.
// DEMO: every step is clickable. Clicking a step's Continue starts a 4s "Pending review..."
// then "Approved", then that step becomes done and the next step becomes current.
// Click any step to re-run the demo from there.
// Backend will replace this with real progress driven by user actions and KYC results.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Gift, Loader2, ArrowRight } from 'lucide-react';
import DriverNav from '@/components/driver/DriverNav';
import Footer from '@/components/ui/Footer';

interface OnboardingStep {
  id: string;
  title: string;
  day: string;
  detail: string;
  href?: string;
}

const STEPS: OnboardingStep[] = [
  { id: '1',   title: 'Welcome Call',      day: 'Day 1',     detail: 'Intro to policies & expectations.' },
  { id: '2',   title: 'Subscription',      day: 'Day 2-3',   detail: 'Choose Bronze / Silver / Gold / Diamond.', href: '/subscriptions' },
  { id: '2.5', title: 'Medical Exam',      day: 'Day 2-5',   detail: 'Vision, BP, sugar, hearing, physical, epilepsy.', href: '/driver/medical' },
  { id: '3',   title: 'Insurance',         day: 'Day 3-5',   detail: 'Accident cover activated.' },
  { id: '4',   title: 'Training',          day: '30 min',    detail: 'App walkthrough and earnings reporting. Quiz pass 80%.' },
  { id: '5',   title: 'Safety Orientation',day: '',          detail: 'Defensive driving, accident protocol.' },
  { id: '6',   title: 'Matching',          day: 'Day 5-7',   detail: 'Apply to vehicles, owner approves.' },
  { id: '7',   title: 'Handover',          day: 'Day 6-8',   detail: '42-point inspection + contract + keys.', href: '/shared/inspection' },
];

type StepState = 'done' | 'pending' | 'approved' | 'todo';

export default function DriverOnboardingPage() {
  // Highest step that is already done. Steps below this index are auto-done.
  // Starts at 2 → steps 0 and 1 are done by default, step 2 (Medical) is the next "current".
  const [doneUntil, setDoneUntil] = useState(2);
  // Which step is currently running the pending → approved animation
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<'pending' | 'approved' | null>(null);

  const handleContinue = (index: number) => {
    if (runningIndex !== null) return; // ignore re-clicks while one is running
    setRunningIndex(index);
    setPhase('pending');
    // 4 seconds of pending → approved → mark as done → reset
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
      <DriverNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Your Onboarding</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            Complete these steps to get matched and start earning. Click any step to run the demo.
          </p>

          <div className="flex items-center gap-2 bg-white border border-[#cfd6e3] rounded-lg p-4 mb-8 fade-in-up">
            <Gift size={18} className="text-[#1B6B45]" />
            <p className="text-sm text-[#0d1b2e]">
              Gold &amp; Diamond plans get a <span className="font-semibold text-[#1B6B45]">FREE medical exam</span>.
            </p>
          </div>

          <div className="fade-in-up">
            {STEPS.map((step, index) => {
              const isLast = index === STEPS.length - 1;
              const s = stateFor(index);
              const isCurrent = isCurrentStep(index);
              const isDone = s === 'done';
              const isLocked = runningIndex !== null && runningIndex !== index;

              const badgeClass = [
                'flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-sm font-bold transition-colors',
                isDone ? 'bg-[#1d4ed8] text-white' : '',
                s === 'pending' ? 'bg-[#e8c96a] text-[#0d1b2e]' : '',
                s === 'approved' ? 'bg-[#1B6B45] text-white' : '',
                s === 'todo' && isCurrent ? 'bg-[#1d4ed8] text-white ring-4 ring-[#1d4ed8]/30 animate-pulse' : '',
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
                      isCurrent ? 'border-[#1d4ed8]' : 'border-[#cfd6e3]',
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold text-[#0d1b2e]">{step.title}</h2>
                        {step.day && <p className="text-xs text-[#5b6575] mt-0.5">{step.day}</p>}
                      </div>
                      {isDone && <span className="text-xs font-semibold text-[#1B6B45]">Completed</span>}
                      {s === 'pending' && <span className="text-xs font-semibold text-[#e8c96a]">Pending review...</span>}
                      {s === 'approved' && <span className="text-xs font-semibold text-[#1B6B45]">Approved</span>}
                      {s === 'todo' && isCurrent && <span className="text-xs font-semibold text-[#1d4ed8]">In progress</span>}
                    </div>
                    <p className="text-sm text-[#5b6575] mt-2">{step.detail}</p>

                    {/* Continue button — every step gets one, but it's disabled while another step is running.
                        Done steps offer a "Re-run demo" so the whole list stays interactive. */}
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
