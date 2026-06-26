// ─────────────────────────────────────────────────────────────────────────────
// DISPUTES PAGE — shared by owner + driver
// ─────────────────────────────────────────────────────────────────────────────
// File a dispute: payment issue, vehicle damage, contract breach, etc.
// Either party can start; Legal Officer + Operations Manager mediate.
//
// Backend integration points:
//   GET  /api/disputes/me                   → Dispute[] for current user
//   POST /api/disputes                      → file new dispute
//   POST /api/disputes/:id/respond          → add evidence/comments
//   PATCH /api/disputes/:id/resolve         → admin marks resolved (audit log entry)
//
// Legal Officer admin dashboard sees all disputes; can assign resolution status.
// ─────────────────────────────────────────────────────────────────────────────
// Disputes page
'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';

export default function Disputes() {
  const [formData, setFormData] = useState({
    contract: '',
    subject: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will handle dispute submission
    console.log('Submit dispute:', formData);
    setFormData({ contract: '', subject: '', description: '' });
  };

  // Backend will provide real data
  const disputes = [
    {
      id: 1,
      subject: 'Vehicle maintenance issue',
      contract: 'Toyota Corolla (GR-1234-20)',
      date: '2026-05-28',
      status: 'pending',
      lastUpdate: 'Awaiting admin review'
    },
    {
      id: 2,
      subject: 'Payment delay',
      contract: 'Honda Civic (GR-5678-19)',
      date: '2026-05-15',
      status: 'completed',
      lastUpdate: 'Resolved - Payment processed'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <Header />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-8">Issues & Disputes</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Report Issue Form */}
            <Card borderColor="#4c1d95">
              <h2 className="text-xl font-bold text-[#0d1b2e] mb-6">Report an Issue</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contract" className="text-[#111827] font-semibold">
                    Contract <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="contract"
                    name="contract"
                    value={formData.contract}
                    onChange={handleChange}
                    required
                    className="border border-[#cfd6e3] px-4 py-3 focus:outline-none focus:border-[#0d1b2e]"
                  >
                    <option value="">Select a contract</option>
                    <option value="1">Toyota Corolla (GR-1234-20)</option>
                    <option value="2">Honda Civic (GR-5678-19)</option>
                  </select>
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of the issue"
                  required
                />

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-[#111827] font-semibold">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide detailed information about the issue..."
                    rows={6}
                    required
                    className="border border-[#cfd6e3] px-4 py-3 focus:outline-none focus:border-[#0d1b2e]"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Submit Issue
                </Button>
              </form>
            </Card>

            {/* Existing Disputes */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0d1b2e]">Your Issues</h2>
              {disputes.map((dispute) => (
                <Card key={dispute.id}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-[#0d1b2e] mb-1">{dispute.subject}</h3>
                      <p className="text-sm text-[#5b6575]">{dispute.contract}</p>
                    </div>
                    <StatusBadge status={dispute.status} />
                  </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="text-[#5b6575]">Reported:</span>
                      <span className="ml-2 font-semibold">{dispute.date}</span>
                    </div>
                    <div>
                      <span className="text-[#5b6575]">Last Update:</span>
                      <span className="ml-2">{dispute.lastUpdate}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
