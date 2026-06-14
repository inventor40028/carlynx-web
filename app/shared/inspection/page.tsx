'use client';

import { useState } from 'react';
import { Square, CheckSquare, AlertTriangle } from 'lucide-react';
import RoleNav from '@/components/ui/RoleNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import { inspectionSections, rejectCriteria } from '@/lib/blueprint';

const TOTAL_POINTS = 42;

export default function InspectionPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (code: string) =>
    setChecked((prev) => ({ ...prev, [code]: !prev[code] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const percent = Math.round((checkedCount / TOTAL_POINTS) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <RoleNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2 fade-in-up">42-Point Inspection</h1>
          <p className="text-[#5b6575] mb-6 fade-in-up">Vehicle handover &amp; return condition check.</p>

          {/* Live progress counter */}
          <Card className="mb-8 fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-[#0d1b2e]">
                {checkedCount} / {TOTAL_POINTS} checked
              </span>
              <span className="text-sm font-medium text-[#5b6575]">{percent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#cfd6e3] overflow-hidden">
              <div
                className="h-full bg-[#1d4ed8] transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </Card>

          {/* Inspection sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {inspectionSections.map((section) => (
              <Card key={section.key} className="fade-in-up">
                <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">
                  {section.key} — {section.title} ({section.items.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.items.map((item) => {
                    const isChecked = !!checked[item.code];
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => toggle(item.code)}
                        className={`flex items-center gap-2 text-left p-2 rounded-lg border transition-colors ${
                          isChecked
                            ? 'border-[#1d4ed8] bg-[#1d4ed8]/5'
                            : 'border-[#cfd6e3] hover:bg-[#eef3f8]'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare size={20} className="text-[#1d4ed8] shrink-0" />
                        ) : (
                          <Square size={20} className="text-[#5b6575] shrink-0" />
                        )}
                        <span className="text-sm text-[#0d1b2e]">
                          <span className="font-medium">{item.code}</span> {item.item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>

          {/* Reject criteria */}
          <Card borderColor="#dc2626" className="mb-8 fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={22} className="text-[#dc2626]" />
              <h2 className="text-xl font-bold text-[#0d1b2e]">Reject if</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rejectCriteria.map((criterion) => (
                <li key={criterion} className="flex items-center gap-2 text-sm text-[#5b6575]">
                  <AlertTriangle size={16} className="text-[#dc2626] shrink-0" />
                  {criterion}
                </li>
              ))}
            </ul>
          </Card>

          {/* Sign-off row */}
          <Card className="fade-in-up">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-6">Sign-off</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Car Owner', 'Driver', 'Inspector'].map((role) => (
                <div key={role}>
                  <p className="font-semibold text-[#0d1b2e] mb-6">{role}</p>
                  <div className="border-t border-[#cfd6e3] pt-2 text-sm text-[#5b6575]">Name</div>
                  <div className="border-t border-[#cfd6e3] pt-2 mt-6 text-sm text-[#5b6575]">Date</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
