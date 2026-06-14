// Earnings report page
'use client';

import { useState } from 'react';
import DriverNav from '@/components/driver/DriverNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';

export default function EarningsReport() {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    trips: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will handle earnings submission
    console.log('Submit earnings:', formData);
    setFormData({ date: '', amount: '', trips: '', notes: '' });
  };

  // Backend will provide real data
  const previousReports = [
    { id: 1, date: '2026-05-30', amount: 250, trips: 8, status: 'approved' },
    { id: 2, date: '2026-05-29', amount: 280, trips: 9, status: 'approved' },
    { id: 3, date: '2026-05-28', amount: 220, trips: 7, status: 'pending' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <DriverNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-8">Earnings Report</h1>

          <Card borderColor="#1d4ed8" className="mb-8">
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-6">Submit Daily Report</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Total Earnings (GH₵)"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="250"
                  required
                />
              </div>

              <Input
                label="Number of Trips"
                type="number"
                name="trips"
                value={formData.trips}
                onChange={handleChange}
                placeholder="8"
                required
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-[#111827] font-semibold">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional notes..."
                  rows={4}
                  className="border border-[#cfd6e3] px-4 py-3 focus:outline-none focus:border-[#0d1b2e]"
                />
              </div>

              <Button type="submit" variant="primary">
                Submit Report
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Previous Reports</h2>
            <div className="space-y-4">
              {previousReports.map((report) => (
                <div key={report.id} className="flex justify-between items-center border-b border-[#cfd6e3] pb-4 last:border-0">
                  <div>
                    <div className="font-bold text-[#0d1b2e]">{report.date}</div>
                    <div className="text-sm text-[#5b6575]">
                      GH₵ {report.amount} • {report.trips} trips
                    </div>
                  </div>
                  <StatusBadge status={report.status} />
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
