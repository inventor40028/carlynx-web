// Customer Service page — channels, FAQ, and a simple support ticket form.
// Backend will route tickets to the support inbox.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MessageCircle, Headset, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { company } from '@/lib/company';

const CATEGORIES = [
  'General question',
  'Account / sign in',
  'Driver onboarding',
  'Owner onboarding',
  'Payment / earnings',
  'Vehicle / partnership',
  'Report a safety issue',
  'Other',
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How do I become a verified driver?',
    a: 'Create a driver account, complete the 8-step onboarding (including the medical exam at step 2.5), and upload your license and ID. Our team verifies within 1–3 business days.',
  },
  {
    q: 'How do I list my vehicle?',
    a: 'From the Owner dashboard, click "Add Vehicle", fill the form, and upload four photos (front, side, back, interior). After our 42-point inspection it goes live to drivers.',
  },
  {
    q: 'When do payments settle?',
    a: 'Weekly settlements happen every Tuesday. Owner share, the 5% commission, the maintenance fund, and insurance are deducted automatically; the rest is paid to the driver.',
  },
  {
    q: 'How do I report a safety incident?',
    a: 'Use the in-app SOS button (driver) or call the CarLynk emergency line. P1 incidents (accident / fire) get a response within 2 minutes; P2 (theft / tamper) within 5.',
  },
  {
    q: 'What happens if a contract is broken without notice?',
    a: 'No-notice driver termination is a GH₵ 200 penalty plus 15 trust-score points. No-notice owner termination owes the driver 1 week of earnings. Mutual termination carries no penalty.',
  },
  {
    q: 'Where is my data stored, and who can see it?',
    a: 'All data is held under Ghana\'s Data Protection Act (Act 843). Drivers see only their own contracts. Owners see only their own vehicles. Support staff access only records they are authorized to handle.',
  },
];

export default function CustomerServicePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: CATEGORIES[0],
    message: '',
  });
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({ ...form, category: e.target.value });
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm({ ...form, message: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will route this ticket to the support inbox
    console.log('Support ticket:', form);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="bg-[#0d1b2e] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto fade-in-up">
          <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">CUSTOMER SERVICE</div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">We're here to help.</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Whether you're stuck on onboarding, need to escalate a partnership issue, or just have a question — we'll get back to you fast.
          </p>
        </div>
      </section>

      <main className="flex-1 py-14 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Channels */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card borderColor="#1d4ed8" className="fade-in-up">
              <div className="text-[#1d4ed8] mb-3"><Phone size={26} /></div>
              <h3 className="font-bold text-[#0d1b2e] mb-1">Phone</h3>
              <a href={`tel:${company.phoneRaw}`} className="text-[#5b6575] text-sm hover:text-[#1d4ed8] transition-colors block">{company.phone}</a>
              <p className="text-xs text-[#5b6575] mt-1">{company.officeHours.days}</p>
            </Card>

            <Card borderColor="#e8c96a" className="fade-in-up">
              <div className="text-[#e8c96a] mb-3"><Mail size={26} /></div>
              <h3 className="font-bold text-[#0d1b2e] mb-1">Email</h3>
              <a href={`mailto:${company.email}`} className="text-[#5b6575] text-sm hover:text-[#1d4ed8] transition-colors break-all block">{company.email}</a>
              <p className="text-xs text-[#5b6575] mt-1">Reply within 1 business day.</p>
            </Card>

            <Card borderColor="#0f766e" className="fade-in-up">
              <div className="text-[#0f766e] mb-3"><MessageCircle size={26} /></div>
              <h3 className="font-bold text-[#0d1b2e] mb-1">In-app support</h3>
              <p className="text-[#5b6575] text-sm">Open a ticket from your driver or owner dashboard.</p>
            </Card>

            <Card borderColor="#dc2626" className="fade-in-up">
              <div className="text-[#dc2626] mb-3"><Headset size={26} /></div>
              <h3 className="font-bold text-[#0d1b2e] mb-1">Emergency</h3>
              <Link href="/shared/emergency" className="text-[#5b6575] text-sm hover:text-[#dc2626] transition-colors block">
                Use the SOS button — 2 min response
              </Link>
            </Card>
          </section>

          {/* FAQ + Ticket form */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
            {/* FAQ */}
            <section className="fade-in-up">
              <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Frequently asked</h2>
              <div className="space-y-3">
                {FAQ.map((item, i) => {
                  const open = openIdx === i;
                  return (
                    <div
                      key={item.q}
                      className="bg-white border border-[#cfd6e3] rounded-xl overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIdx(open ? null : i)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-3 p-4 text-left"
                      >
                        <span className="font-semibold text-[#0d1b2e]">{item.q}</span>
                        <span className="text-[#1d4ed8] shrink-0">
                          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </button>
                      {open && (
                        <div className="px-4 pb-4 text-sm text-[#5b6575] leading-relaxed border-t border-[#cfd6e3] pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Ticket form */}
            <section className="fade-in-up">
              <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Open a ticket</h2>
              {submitted ? (
                <Card borderColor="#1B6B45">
                  <div className="flex flex-col items-center text-center py-4">
                    <CheckCircle2 size={48} className="text-[#1B6B45] mb-3" />
                    <h3 className="text-lg font-bold text-[#0d1b2e] mb-1">Ticket received.</h3>
                    <p className="text-sm text-[#5b6575] max-w-sm">
                      We'll reply to <span className="font-semibold text-[#0d1b2e] break-all">{form.email}</span> within
                      one business day.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-5"
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', category: CATEGORIES[0], message: '' }); }}
                    >
                      Open another ticket
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Your name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ama Mensah"
                      required
                    />
                    <Input
                      label="Your email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />

                    <div className="flex flex-col gap-2">
                      <label htmlFor="category" className="text-[#111827] font-semibold">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleSelect}
                        style={{ borderRadius: '8px' }}
                        className="border border-[#cfd6e3] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all"
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[#111827] font-semibold">
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={handleTextarea}
                        rows={5}
                        required
                        placeholder="Describe what you need help with…"
                        style={{ borderRadius: '8px' }}
                        className="border border-[#cfd6e3] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all resize-y"
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full sm:w-auto">
                      Submit ticket
                    </Button>
                  </form>
                </Card>
              )}

              {/* Trust strip */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#5b6575]">
                <ShieldCheck size={14} className="text-[#1B6B45]" />
                Your message goes to the CarLynk support inbox only.
              </div>

              {/* Emergency reminder */}
              <div className="mt-3 flex items-start gap-2 text-xs text-[#5b6575]">
                <AlertTriangle size={14} className="text-[#dc2626] mt-0.5 shrink-0" />
                In an emergency, use the SOS button instead — this form is not monitored 24/7.
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
