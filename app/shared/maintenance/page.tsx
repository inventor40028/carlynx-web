// Maintenance page
import RoleNav from '@/components/ui/RoleNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Wrench } from 'lucide-react';
import { maintenanceSchedule, partnerMechanics } from '@/lib/blueprint';

export default function Maintenance() {
  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <RoleNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">Maintenance</h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">Keep your vehicle road-ready.</p>

          {/* Service Schedule */}
          <section className="mb-10 fade-in-up">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#0d1b2e] mb-4">
              <Wrench size={20} className="text-[#0f766e]" />
              Service Schedule
            </h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0d1b2e] text-white">
                    <th className="border border-[#cfd6e3] p-3 text-left">Interval</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Type</th>
                    <th className="border border-[#cfd6e3] p-3 text-left">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceSchedule.map((m) => (
                    <tr key={m.interval} className="bg-white">
                      <td className="border border-[#cfd6e3] p-3 font-semibold text-[#0d1b2e]">{m.interval}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{m.type}</td>
                      <td className="border border-[#cfd6e3] p-3 text-[#5b6575]">{m.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Partner Mechanics */}
          <section className="mb-10 fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Partner Mechanics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerMechanics.map((p) => (
                <Card key={p.name} className="flex flex-col">
                  <h3 className="text-lg font-bold text-[#0d1b2e] mb-2">{p.name}</h3>
                  <p className="text-[#e8c96a] font-bold mb-1">{p.discount} CarLynk discount</p>
                  <p className="text-[#5b6575] mb-4">{p.services}</p>
                  <div className="mt-auto">
                    <Button variant="primary" className="w-full">Book Service</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Referral model note */}
          <Card className="fade-in-up">
            <p className="text-[#5b6575]">
              CarLynk earns a <span className="font-bold text-[#0d1b2e]">10% referral</span> on every
              partner-mechanic booking. This referral model funds the platform, keeping driver and owner
              subscription costs low.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
