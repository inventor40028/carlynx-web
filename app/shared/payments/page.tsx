// ─────────────────────────────────────────────────────────────────────────────
// PAYMENTS PAGE — shared by owner + driver
// ─────────────────────────────────────────────────────────────────────────────
// Shows: weekly settlement schedule, late-payment escalation tiers, escrow note.
//
// Backend integration points:
//   GET  /api/payments/me?period=week|month  → PaymentRow[]
//   Paystack webhook (POST /api/webhooks/paystack) writes to `payments` table.
//   Events: charge.success, transfer.success, refund.processed
//   All amounts in GHS — display as "GH₵ X,XXX".
//
// Escalation rules live in lib/blueprint.ts (paymentEscalation). Enforce server-side.
// ─────────────────────────────────────────────────────────────────────────────
// Payments page — weekly settlement, late-payment escalation, escrow note
import RoleNav from '@/components/ui/RoleNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import { ShieldCheck } from 'lucide-react';
import {
  weeklySettlement,
  settlementTotalDue,
  driverKeeps,
  latePaymentTimeline,
} from '@/lib/blueprint';

export default function Payments() {
  // Backend will provide real data
  const summary = {
    totalPaid: 7000,
    pending: 1750,
    thisMonth: 5250,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <RoleNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Payments</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">Weekly settlement — every Tuesday.</p>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 fade-in-up">
            <Card borderColor="#4c1d95">
              <div className="text-[#5b6575] text-sm mb-1">Total Paid</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">GH₵ {summary.totalPaid}</div>
            </Card>
            <Card borderColor="#4c1d95">
              <div className="text-[#5b6575] text-sm mb-1">Pending</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">GH₵ {summary.pending}</div>
            </Card>
            <Card borderColor="#4c1d95">
              <div className="text-[#5b6575] text-sm mb-1">This Month</div>
              <div className="text-3xl font-bold text-[#0d1b2e]">GH₵ {summary.thisMonth}</div>
            </Card>
          </div>

          {/* Weekly Settlement Breakdown */}
          <Card className="mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-6">Weekly Settlement Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white">
                    <th className="border border-[#cfd6e3] p-3 text-left">Line</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Item</th>
                    <th className="border border-[#cfd6e3] p-3 text-right">GH₵</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySettlement.map((row) => (
                    <tr key={row.line}>
                      <td className="border border-[#cfd6e3] p-3 font-semibold">{row.line}</td>
                      <td className="border border-[#cfd6e3] p-3">{row.item}</td>
                      <td className="border border-[#cfd6e3] p-3 text-right">{row.ghs}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="border border-[#cfd6e3] p-3"></td>
                    <td className="border border-[#cfd6e3] p-3 text-[#0d1b2e]">Total Due</td>
                    <td className="border border-[#cfd6e3] p-3 text-right text-[#0d1b2e]">
                      GH₵ {settlementTotalDue}
                    </td>
                  </tr>
                  <tr className="font-bold">
                    <td className="border border-[#cfd6e3] p-3"></td>
                    <td className="border border-[#cfd6e3] p-3 text-[#1B6B45]">Driver Keeps</td>
                    <td className="border border-[#cfd6e3] p-3 text-right text-[#1B6B45]">
                      GH₵ {driverKeeps}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Late Payment Timeline */}
          <Card className="mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-6">Late Payment Timeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white">
                    <th className="border border-[#cfd6e3] p-3 text-left">Day</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {latePaymentTimeline.map((row) => {
                    // Fri (D5) and Mon (D7) escalation rows shown in red
                    const escalated = row.day.includes('D5') || row.day.includes('D7');
                    return (
                      <tr key={row.day} className={escalated ? 'text-[#dc2626] font-semibold' : ''}>
                        <td className="border border-[#cfd6e3] p-3">{row.day}</td>
                        <td className="border border-[#cfd6e3] p-3">{row.action}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Escrow note */}
          <Card className="fade-in-up" borderColor="#1B6B45">
            <div className="flex items-start gap-3">
              <ShieldCheck size={24} className="text-[#1B6B45] shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-[#0d1b2e] mb-1">Escrow Protection</h2>
                <p className="text-sm text-[#5b6575]">
                  Funds are collected, held (max 3 days), then disbursed. Frontend never decides
                  payment approval.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
