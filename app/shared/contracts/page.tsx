// ─────────────────────────────────────────────────────────────────────────────
// CONTRACTS PAGE — shared by owner + driver (RoleNav switches based on session)
// ─────────────────────────────────────────────────────────────────────────────
// Shows: active partnership contract, termination types & notice periods,
// 7-step termination process, no-notice penalty notice.
//
// Business rules live in lib/blueprint.ts (terminationTypes). Backend MUST
// enforce the same rules — don't trust the frontend to compute penalties.
//
// Backend integration points:
//   GET  /api/contracts/me                  → active contract for current user
//   POST /api/contracts/:id/terminate       → start termination flow
//   GET  /api/contracts/:id/document        → signed PDF (Supabase Storage)
// ─────────────────────────────────────────────────────────────────────────────
// Contracts page
import RoleNav from '@/components/ui/RoleNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import { terminationTypes } from '@/lib/blueprint';

// Backend will provide real data
const activeContract = {
  vehicle: 'Toyota Corolla (GR-1234-20)',
  owner: 'John Doe',
  startDate: '2026-01-01',
  status: 'active',
};

const terminationProcess = [
  'Request',
  'Settlement Calc',
  'Return Inspection (42-point)',
  'Damage Assessment',
  'Key Return',
  'Settlement (5 days)',
  'Post-Termination',
];

export default function Contracts() {
  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <RoleNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Contracts</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">Your active partnership and termination terms.</p>

          {/* Active Contract */}
          <Card className="mb-10 fade-in-up">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0d1b2e] mb-2">{activeContract.vehicle}</h2>
                <p className="text-[#5b6575]">Owner: {activeContract.owner}</p>
              </div>
              <StatusBadge status={activeContract.status} />
            </div>
            <div className="mb-4">
              <div className="text-[#5b6575] text-sm mb-1">Started</div>
              <div className="font-bold text-[#0d1b2e]">{activeContract.startDate}</div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">View Details</Button>
              <Button variant="outline">Report Issue</Button>
            </div>
          </Card>

          {/* Termination Types & Notice */}
          <section className="mb-10 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Termination Types &amp; Notice</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white">
                    <th className="border border-[#cfd6e3] p-3 text-left">Type</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Notice</th>
                  </tr>
                </thead>
                <tbody>
                  {terminationTypes.map((t) => (
                    <tr key={t.type} className="bg-white">
                      <td className="border border-[#cfd6e3] p-3 font-semibold text-[#0d1b2e]">{t.type}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{t.notice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Termination Process */}
          <section className="mb-10 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Termination Process</h2>
            <ol className="space-y-4">
              {terminationProcess.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-[#1d4ed8] text-white font-bold">
                    {i + 1}
                  </span>
                  <div className="font-bold text-[#0d1b2e] pt-1.5">{step}</div>
                </li>
              ))}
            </ol>
          </section>

          {/* No-notice penalty note */}
          <Card borderColor="#dc2626" className="fade-in-up border-2 border-[#dc2626]">
            <p className="text-[#0d1b2e]">
              <span className="font-bold text-[#dc2626]">Driver no notice:</span> GH₵ 200 + trust −15.{' '}
              <span className="font-bold text-[#dc2626]">Owner no notice:</span> 1 week earnings.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
