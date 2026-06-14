// Driver profile page
'use client';

import { useState } from 'react';
import DriverNav from '@/components/driver/DriverNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import { Star } from 'lucide-react';

export default function DriverProfile() {
  const [formData, setFormData] = useState({
    name: 'Kwame Mensah',
    email: 'kwame@example.com',
    phone: '+233 24 123 4567',
    licenseNumber: 'DL-12345-GH',
    experience: '5',
    location: 'Accra, Ghana'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will handle profile update
    console.log('Update profile:', formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <DriverNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-8">My Profile</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">KYC Status</div>
              <StatusBadge status="approved" />
            </Card>
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">Rating</div>
              <div className="flex items-center gap-2 text-2xl font-bold text-[#0d1b2e]">
                <Star size={24} className="text-[#e8c96a] fill-[#e8c96a]" />
                4.8
              </div>
            </Card>
            <Card borderColor="#1d4ed8">
              <div className="text-[#5b6575] text-sm mb-1">Total Partnerships</div>
              <div className="text-2xl font-bold text-[#0d1b2e]">3</div>
            </Card>
          </div>

          <Card>
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-6">Profile Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Years of Experience"
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" variant="primary">
                Update Profile
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
