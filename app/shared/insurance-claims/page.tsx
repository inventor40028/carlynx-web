// Insurance Claims page
import RoleNav from '@/components/ui/RoleNav';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import { Shield } from 'lucide-react';
import { claimTypes, claimSteps } from '@/lib/blueprint';

export default function InsuranceClaims() {
  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <RoleNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Insurance Claims</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">48-hour filing deadline. Keep all evidence.</p>

          {/* Claim Types */}
          <section className="mb-10 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Claim Types</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white">
                    <th className="border border-[#cfd6e3] p-3 text-left">Claim</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Cover</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Holder</th>
                  </tr>
                </thead>
                <tbody>
                  {claimTypes.map((c) => (
                    <tr key={c.claim} className="bg-white">
                      <td className="border border-[#cfd6e3] p-3 font-semibold text-[#0d1b2e]">{c.claim}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{c.cover}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{c.holder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Claim Process */}
          <section className="mb-10 fade-in-up">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#0d1b2e] mb-4">
              <Shield size={20} className="text-[#1d4ed8]" />
              Claim Process
            </h2>
            <ol className="space-y-4">
              {claimSteps.map((s) => (
                <li key={s.step} className="flex items-start gap-4">
                  <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-[#1d4ed8] text-white font-bold">
                    {s.step}
                  </span>
                  <div>
                    <div className="font-bold text-[#0d1b2e]">{s.title}</div>
                    <div className="text-[#5b6575]">{s.detail}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="fade-in-up">
            <Button variant="primary">File a Claim</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
