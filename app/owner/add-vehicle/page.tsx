// ─────────────────────────────────────────────────────────────────────────────
// ADD VEHICLE PAGE — owner only
// ─────────────────────────────────────────────────────────────────────────────
// Multi-section form: details, photos (4 angles), partnership terms (rates).
//
// Backend integration point:
//   POST /api/owner/vehicles  (multipart/form-data — includes photo files)
//   Fields: make, model, year, plateNumber, color, mileage, location,
//           dailyRate, weeklyRate, monthlyRate, photos[]
//   Returns: { id, ...vehicle }
//   On success: router.push('/owner/dashboard')
//
// Photo uploads:
//   - Frontend uses <ImageUpload> component (handles file selection)
//   - Backend uploads to Supabase Storage bucket `vehicle-photos/`
//   - Store URLs in `vehicle_photos` table with position (front/side/back/interior)
//
// Fleet Manager admin dashboard sees the new vehicle in its registry instantly.
// ─────────────────────────────────────────────────────────────────────────────
// Add vehicle page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OwnerNav from '@/components/owner/OwnerNav';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AddVehicle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    plateNumber: '',
    color: '',
    mileage: '',
    location: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: ''
  });

  const [photos, setPhotos] = useState({
    frontView: null as File | null,
    sideView: null as File | null,
    backView: null as File | null,
    interior: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (name: string, file: File | null) => {
    setPhotos({ ...photos, [name]: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will handle vehicle creation with photos
    console.log('Add vehicle:', formData, photos);
    router.push('/owner/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <OwnerNav />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-8 fade-in-up">Add New Vehicle</h1>

          <Card borderColor="#0f766e" className="fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Details */}
              <div>
                <h3 className="text-lg font-bold text-[#0d1b2e] mb-4">Vehicle Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Toyota"
                    required
                  />
                  <Input
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Corolla"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <Input
                    label="Year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2020"
                    required
                  />
                  <Input
                    label="Plate Number"
                    name="plateNumber"
                    value={formData.plateNumber}
                    onChange={handleChange}
                    placeholder="GR-1234-20"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <Input
                    label="Color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Silver"
                    required
                  />
                  <Input
                    label="Current Mileage"
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="50000"
                    required
                  />
                </div>

                <div className="mt-6">
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Accra, Ghana"
                    required
                  />
                </div>
              </div>

              {/* Vehicle Photos */}
              <div className="border-t border-[#cfd6e3] pt-6">
                <h3 className="text-lg font-bold text-[#0d1b2e] mb-4">Vehicle Photos</h3>
                <p className="text-sm text-[#5b6575] mb-6">
                  Upload clear photos of your vehicle from different angles
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ImageUpload
                    label="Front View"
                    name="frontView"
                    required
                    onChange={(file) => handlePhotoChange('frontView', file)}
                  />
                  <ImageUpload
                    label="Side View"
                    name="sideView"
                    required
                    onChange={(file) => handlePhotoChange('sideView', file)}
                  />
                  <ImageUpload
                    label="Back View"
                    name="backView"
                    required
                    onChange={(file) => handlePhotoChange('backView', file)}
                  />
                  <ImageUpload
                    label="Interior View"
                    name="interior"
                    required
                    onChange={(file) => handlePhotoChange('interior', file)}
                  />
                </div>
              </div>

              {/* Partnership Terms */}
              <div className="border-t border-[#cfd6e3] pt-6">
                <h3 className="text-lg font-bold text-[#0d1b2e] mb-4">Partnership Terms</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="Daily Rate (GH₵)"
                    type="number"
                    name="dailyRate"
                    value={formData.dailyRate}
                    onChange={handleChange}
                    placeholder="150"
                  />
                  <Input
                    label="Weekly Rate (GH₵)"
                    type="number"
                    name="weeklyRate"
                    value={formData.weeklyRate}
                    onChange={handleChange}
                    placeholder="900"
                  />
                  <Input
                    label="Monthly Rate (GH₵)"
                    type="number"
                    name="monthlyRate"
                    value={formData.monthlyRate}
                    onChange={handleChange}
                    placeholder="3500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" variant="primary">
                  Add Vehicle
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/owner/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
