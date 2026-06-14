// Careers page — no openings yet. Notify-me email capture so candidates can be
// alerted when roles open. Backend will store the email + send a confirmation.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, BellRing, Mail, CheckCircle2 } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function CareersPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will record the email and send a confirmation
    console.log('Careers notify-me signup:', email);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="bg-[#0d1b2e] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto fade-in-up">
          <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">
            CAREERS AT CARLYNK
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Build the future of mobility in Africa.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            We're a small, ambitious team formalising an industry that's been informal for too long.
          </p>
        </div>
      </section>

      <main className="flex-1 py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* No openings card */}
          <Card borderColor="#e8c96a" className="fade-in-up">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-[#fef3c7] text-[#92400e] p-3 rounded-xl shrink-0">
                <Briefcase size={28} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#0d1b2e] mb-2">No open positions right now</h2>
                <p className="text-[#5b6575] text-sm leading-relaxed">
                  We don't have active openings at the moment — but we're growing fast. Leave your
                  email and we'll be in touch the second a role that fits opens up.
                </p>
              </div>
            </div>
          </Card>

          {/* Notify-me form OR success state */}
          {!submitted ? (
            <Card className="fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <BellRing size={22} className="text-[#1d4ed8]" />
                <h3 className="text-lg font-bold text-[#0d1b2e]">Get notified when we hire</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Your email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
                <Button type="submit" variant="primary" className="w-full sm:w-auto">
                  Notify me
                </Button>
              </form>
              <p className="text-xs text-[#5b6575] mt-3">
                One email per open role. No marketing, no spam.
              </p>
            </Card>
          ) : (
            <Card borderColor="#1B6B45" className="fade-in-up">
              <div className="flex items-start gap-4">
                <CheckCircle2 size={36} className="text-[#1B6B45] shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-[#0d1b2e] mb-1">You're on the list.</h3>
                  <p className="text-[#5b6575] text-sm">
                    We'll email <span className="font-semibold text-[#0d1b2e]">{email}</span> the
                    moment a role that suits you opens. Thanks for your interest in CarLynk.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* What we look for */}
          <section className="fade-in-up">
            <h3 className="text-xl font-bold text-[#0d1b2e] mb-4">What we look for</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Bias toward action — we ship, we don\'t debate forever.',
                'Care about the work — drivers and owners depend on what we build.',
                'Local context — we\'re building for Ghana first.',
                'Owners of outcomes — we don\'t pass problems sideways.',
              ].map((line) => (
                <div key={line} className="bg-[#eef3f8] border border-[#cfd6e3] rounded-xl p-4 text-sm text-[#0d1b2e]">
                  {line}
                </div>
              ))}
            </div>
          </section>

          {/* Direct contact */}
          <Card className="fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={20} className="text-[#1d4ed8]" />
              <h3 className="text-lg font-bold text-[#0d1b2e]">Reach out directly</h3>
            </div>
            <p className="text-[#5b6575] text-sm mb-4">
              Have a skill we should know about right now? Send us a short note. No CV required.
            </p>
            <Link href="/contacts">
              <Button variant="outline">View contact details</Button>
            </Link>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
