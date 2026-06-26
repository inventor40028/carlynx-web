// ─────────────────────────────────────────────────────────────────────────────
// DRIVER MEDICAL EXAMINATION — driver only (onboarding step 2.5)
// ─────────────────────────────────────────────────────────────────────────────
// Upload medical certificate proving fitness to drive.
// HR Manager reviews and approves/rejects.
//
// Backend integration points:
//   GET  /api/driver/medical                → { status, uploadedAt, expiryDate, documentUrl }
//   POST /api/driver/medical/upload         → multipart upload to Supabase Storage `medical-docs/`
//   PATCH /api/admin/hr/medical/:id/review  → HR approves/rejects (audit log entry)
//
// HR Manager dashboard lists all pending medical submissions.
// ─────────────────────────────────────────────────────────────────────────────
// Driver Medical Examination page (Onboarding Step 2.5)
import DriverNav from '@/components/driver/DriverNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { medicalTests, fitnessCategories, medicalSchedule } from '@/lib/blueprint';
import { HeartPulse, CalendarClock, BadgeCheck, Wallet } from 'lucide-react';

// Priority pill styling per test priority. Backend will provide real data.
function priorityPill(priority: 'Mandatory' | 'Recommended' | 'Optional') {
  switch (priority) {
    case 'Mandatory':
      return 'bg-[#fee2e2] text-[#dc2626]';
    case 'Recommended':
      return 'bg-[#fef3c7] text-[#92400e]';
    default:
      return 'bg-[#e5e7eb] text-[#5b6575]';
  }
}

export default function DriverMedicalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <DriverNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Medical Examination</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            Step 2.5 of onboarding — required before insurance activation.
          </p>

          {/* 1) Status banner */}
          <section className="fade-in-up mb-8">
            <Card borderColor="#4c1d95">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <HeartPulse size={24} className="text-[#4c1d95]" />
                  <div>
                    <p className="font-bold text-[#0d1b2e]">Current Fitness Status</p>
                    <p className="text-sm text-[#5b6575]">Awaiting clinic results (1-3 business days)</p>
                  </div>
                </div>
                <StatusBadge status="pending" />
              </div>
            </Card>
          </section>

          {/* 2) Required Tests */}
          <section className="fade-in-up mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse size={22} className="text-[#0d1b2e]" />
              <h2 className="text-xl font-bold text-[#0d1b2e]">Required Tests</h2>
            </div>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white text-left">
                    <th className="border border-[#cfd6e3] p-3 w-12">#</th>
                    <th className="border border-[#cfd6e3] p-3">Test</th>
                    <th className="border border-[#cfd6e3] p-3">Checks</th>
                    <th className="border border-[#cfd6e3] p-3">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalTests.map((t) => (
                    <tr key={t.n} className="bg-white">
                      <td className="border border-[#cfd6e3] p-3 font-semibold text-[#0d1b2e]">{t.n}</td>
                      <td className="border border-[#cfd6e3] p-3 font-semibold text-[#0d1b2e]">{t.test}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{t.checks}</td>
                      <td className="border border-[#cfd6e3] p-3">
                        <span
                          style={{ borderRadius: '9999px' }}
                          className={`inline-block px-3 py-1 text-xs font-bold ${priorityPill(t.priority)}`}
                        >
                          {t.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3) Fitness Categories */}
          <section className="fade-in-up mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck size={22} className="text-[#0d1b2e]" />
              <h2 className="text-xl font-bold text-[#0d1b2e]">Fitness Categories</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fitnessCategories.map((f) => (
                <Card key={f.category}>
                  <p className="font-bold text-[#0d1b2e] mb-1">{f.category}</p>
                  <p className="text-sm text-[#5b6575]">{f.action}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* 4) Schedule */}
          <section className="fade-in-up mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock size={22} className="text-[#0d1b2e]" />
              <h2 className="text-xl font-bold text-[#0d1b2e]">Schedule</h2>
            </div>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white text-left">
                    <th className="border border-[#cfd6e3] p-3">When</th>
                    <th className="border border-[#cfd6e3] p-3">What</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalSchedule.map((s) => (
                    <tr key={s.when} className="bg-white">
                      <td className="border border-[#cfd6e3] p-3 font-semibold text-[#0d1b2e]">{s.when}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{s.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5) Cost note */}
          <section className="fade-in-up">
            <Card borderColor="#1B6B45">
              <div className="flex items-start gap-3">
                <Wallet size={22} className="text-[#1B6B45] mt-1 shrink-0" />
                <p className="text-sm text-[#0d1b2e]">
                  <span className="font-bold">Bronze/Silver:</span> GH₵ 80-150 partner rate.{' '}
                  <span className="font-bold">Gold/Diamond:</span> FREE medical.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
