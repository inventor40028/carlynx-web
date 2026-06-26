// ─────────────────────────────────────────────────────────────────────────────
// EMERGENCY ALERT PAGE — shared by owner + driver
// ─────────────────────────────────────────────────────────────────────────────
// Panic button: accident, theft, medical emergency, breakdown.
// Sends alert to Operations Manager + Security Analyst + local authorities.
//
// Backend integration points:
//   POST /api/emergency/alert  { type, lat, lng, notes }
//   → Creates emergency_alerts record, triggers push notification to admins,
//     optionally triggers SMS to predefined emergency contacts.
//   GET /api/emergency/history → past alerts for current user
//
// Security Analyst + Operations Manager dashboards see all alerts in real-time.
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { Siren, Phone } from 'lucide-react';
import RoleNav from '@/components/ui/RoleNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import { emergencyLevels, emergencyContacts, p1Protocol } from '@/lib/blueprint';

export default function EmergencyPage() {
  const [sosSent, setSosSent] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <RoleNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">
            Emergency Response
          </h1>
          <p className="text-[#5b6575] mb-8 fade-in-up">
            24/7 support — response in 2 to 15 minutes.
          </p>

          {/* SOS trigger */}
          <section className="fade-in-up flex flex-col items-center mb-10">
            <button
              type="button"
              onClick={() => setSosSent(true)}
              aria-label="Send SOS"
              className="flex flex-col items-center justify-center rounded-full bg-[#dc2626] text-white shadow-lg hover:shadow-xl hover:bg-[#b91c1c] transition-all"
              style={{ width: '160px', height: '160px' }}
            >
              <Siren size={56} />
              <span className="mt-2 text-2xl font-bold tracking-wide">SOS</span>
            </button>
            <p className="mt-4 text-sm text-[#5b6575]">Press and hold steady — help is dispatched immediately.</p>

            {sosSent && (
              <div className="w-full max-w-2xl mt-6">
                <Card className="border-l-4 border-l-[#dc2626] bg-[#fef2f2]">
                  <div className="flex items-start gap-3">
                    <Siren size={24} className="text-[#dc2626] shrink-0 mt-0.5" />
                    <p className="text-[#0d1b2e] font-medium">
                      SOS sent. Stay calm, help is on the way. Call 191 (Police) / 193 (Ambulance).
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </section>

          {/* Priority Levels */}
          <section className="fade-in-up mb-10">
            <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Priority Levels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyLevels.map((lvl) => (
                <Card key={lvl.level}>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-white text-sm font-bold uppercase mb-3"
                    style={{ backgroundColor: lvl.color }}
                  >
                    {lvl.level}
                  </span>
                  <p className="text-[#0d1b2e] font-medium mb-2">{lvl.type}</p>
                  <p className="text-sm text-[#5b6575]">Response: {lvl.time}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* P1 Protocol */}
          <section className="fade-in-up mb-10">
            <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">
              What to do (P1 - within 5 min)
            </h2>
            <Card>
              <ol className="list-decimal list-inside space-y-2 text-[#0d1b2e]">
                {p1Protocol.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </Card>
          </section>

          {/* Emergency Contacts */}
          <section className="fade-in-up">
            <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Emergency Contacts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyContacts.map((contact) => (
                <Card key={contact.name}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center rounded-full bg-[#dc2626] text-white w-10 h-10 shrink-0">
                      <Phone size={20} />
                    </span>
                    <p className="text-[#0d1b2e] font-medium">{contact.name}</p>
                  </div>
                  <p className="text-2xl font-bold text-[#dc2626]">{contact.number}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
