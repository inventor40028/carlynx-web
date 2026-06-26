// ─────────────────────────────────────────────────────────────────────────────
// BOOK APPOINTMENT PAGE — public route (lead capture)
// ─────────────────────────────────────────────────────────────────────────────
// Weekday picker, time slot, name/email/phone, reason.
// Currently shows success state in-browser; backend will store + send confirmation email.
//
// Backend integration points:
//   POST /api/appointments  { name, email, phone, role, preferredDate, preferredTime, message }
//   → { id, status: 'pending' }
//   Send confirmation email via Resend/Postmark.
//   Customer Service Lead dashboard lists all pending appointments.
//
// Marketing Lead can track appointment conversion rate from their dashboard.
// ─────────────────────────────────────────────────────────────────────────────
// Book an Appointment — weekday picker, time slot, reason. Frontend stub:
// submitting shows a success state. Backend will store the booking and confirm via email.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck, CheckCircle2, Clock3, MessageSquareText, Phone, Mail, MapPin,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { company } from '@/lib/company';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];
const REASONS = [
  'General inquiry',
  'Become a car owner partner',
  'Become a driver partner',
  'Investor / partnership opportunity',
  'Press / media',
  'Other',
];

export default function BookAppointmentPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    day: '',
    time: '',
    reason: REASONS[0],
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm({ ...form, notes: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.day || !form.time) {
      alert('Please choose a weekday and a time slot.');
      return;
    }
    // Backend will store the booking and send a confirmation email
    console.log('Appointment request:', form);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="bg-[#0d1b2e] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto fade-in-up">
          <div className="text-[#e8c96a] font-bold text-sm tracking-widest mb-3">BOOK AN APPOINTMENT</div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Let's talk in person.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            We don't have a walk-in office yet — pick a weekday and time, and a team member will
            confirm by phone or email.
          </p>
        </div>
      </section>

      <main className="flex-1 py-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form OR success state */}
          <div className="fade-in-up">
            {submitted ? (
              <Card borderColor="#1B6B45">
                <div className="flex flex-col items-center text-center py-6">
                  <CheckCircle2 size={64} className="text-[#1B6B45] mb-4" />
                  <h2 className="text-2xl font-bold text-[#0d1b2e] mb-2">Appointment requested.</h2>
                  <p className="text-[#5b6575] max-w-md mb-6">
                    Thanks <span className="font-semibold text-[#0d1b2e]">{form.name.split(' ')[0]}</span> —
                    we'll confirm your <span className="font-semibold">{form.day} at {form.time}</span> slot
                    via email or phone within one business day.
                  </p>
                  <div className="bg-[#eef3f8] rounded-xl px-5 py-4 text-sm text-[#0d1b2e] mb-6 w-full max-w-md">
                    <div className="flex justify-between border-b border-[#cfd6e3] py-2">
                      <span className="text-[#5b6575]">Name</span>
                      <span className="font-semibold">{form.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#cfd6e3] py-2">
                      <span className="text-[#5b6575]">Email</span>
                      <span className="font-semibold break-all">{form.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#cfd6e3] py-2">
                      <span className="text-[#5b6575]">Phone</span>
                      <span className="font-semibold">{form.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#cfd6e3] py-2">
                      <span className="text-[#5b6575]">Day &amp; time</span>
                      <span className="font-semibold">{form.day}, {form.time}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[#5b6575]">Reason</span>
                      <span className="font-semibold">{form.reason}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', day: '', time: '', reason: REASONS[0], notes: '' }); }}>
                      Book another
                    </Button>
                    <Link href="/">
                      <Button variant="outline">Back to home</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <CalendarCheck size={24} className="text-[#1d4ed8]" />
                  <h2 className="text-xl font-bold text-[#0d1b2e]">Request a slot</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ama Mensah"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+233 ..."
                    required
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Weekday picker */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="day" className="text-[#111827] font-semibold">
                        Weekday <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="day"
                        name="day"
                        value={form.day}
                        onChange={handleSelect}
                        required
                        style={{ borderRadius: '8px' }}
                        className="border border-[#cfd6e3] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all"
                      >
                        <option value="" disabled>Choose a weekday…</option>
                        {WEEKDAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <p className="text-xs text-[#5b6575]">Weekdays only — we're closed on weekends.</p>
                    </div>

                    {/* Time slot */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="time" className="text-[#111827] font-semibold">
                        Time slot <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={form.time}
                        onChange={handleSelect}
                        required
                        style={{ borderRadius: '8px' }}
                        className="border border-[#cfd6e3] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all"
                      >
                        <option value="" disabled>Choose a time…</option>
                        {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reason" className="text-[#111827] font-semibold">Reason for the meeting</label>
                    <select
                      id="reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleSelect}
                      style={{ borderRadius: '8px' }}
                      className="border border-[#cfd6e3] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all"
                    >
                      {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="text-[#111827] font-semibold">
                      Anything we should know? <span className="text-[#5b6575] text-sm font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleTextarea}
                      rows={4}
                      placeholder="A short note about what you'd like to discuss…"
                      style={{ borderRadius: '8px' }}
                      className="border border-[#cfd6e3] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    Request appointment
                  </Button>
                </form>
              </Card>
            )}
          </div>

          {/* Side panel — quick facts */}
          <aside className="space-y-4 fade-in-up">
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Clock3 size={18} className="text-[#1d4ed8]" />
                <h3 className="font-bold text-[#0d1b2e]">When</h3>
              </div>
              <p className="text-sm text-[#5b6575]">{company.officeHours.days}</p>
              <p className="text-sm text-[#5b6575]">{company.officeHours.timeRange}</p>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-[#0f766e]" />
                <h3 className="font-bold text-[#0d1b2e]">Where</h3>
              </div>
              <p className="text-sm text-[#0d1b2e] font-semibold leading-snug">
                {company.address.line1}<br />
                {company.address.line2}<br />
                {company.address.city}, {company.address.country}
              </p>
              <p className="text-xs text-[#5b6575] mt-2">
                Visits are by appointment only.
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareText size={18} className="text-[#e8c96a]" />
                <h3 className="font-bold text-[#0d1b2e]">Prefer a quick chat?</h3>
              </div>
              <div className="space-y-2 text-sm">
                <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2 text-[#0d1b2e] hover:text-[#1d4ed8] transition-colors">
                  <Phone size={14} /> {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-[#0d1b2e] hover:text-[#1d4ed8] transition-colors break-all">
                  <Mail size={14} /> {company.email}
                </a>
              </div>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
