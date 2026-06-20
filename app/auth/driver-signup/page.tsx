// Multi-step signup form for drivers
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import SectionBackground from '@/components/ui/SectionBackground';
import FormDeliveryFrame from '@/components/ui/FormDeliveryFrame';

export default function DriverSignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Step 2: Driver Details
    licenseNumber: '',
    yearsExperience: '',
    location: '',
    // Step 3: Documents
    licensePhoto: null as File | null,
    profilePhoto: null as File | null,
    idCard: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData({ ...formData, [name]: file });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will handle driver registration with KYC
    console.log('Driver signup:', formData);
    router.push('/auth/signup-success');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Photo of a driver checking the CarLynk app — anchored to keep his face visible.
          A 60% navy overlay lets the photo set the mood while the form stays foreground. */}
      <SectionBackground
        src="/images/drivermatch.png"
        alt="A CarLynk driver checking opportunities on his phone"
        variant="form"
        position="center 30%"
        className="flex-1 flex items-center justify-center py-12 px-6"
      >
        <FormDeliveryFrame className="w-full max-w-2xl">
          <div className="w-full bg-white border border-[#cfd6e3] p-8 rounded-xl shadow-lg fade-in-up">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all mb-2 ${
                    step >= 1
                      ? 'bg-[#1d4ed8] text-white scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  1
                </div>
                <span className={`text-sm text-center ${step === 1 ? 'text-[#1d4ed8] font-bold' : 'text-gray-500'}`}>
                  Basic Info
                </span>
              </div>

              <div className={`flex-1 h-1 mx-4 transition-all ${step > 1 ? 'bg-[#1d4ed8]' : 'bg-gray-200'}`} style={{ maxWidth: '100px', marginTop: '-30px' }} />

              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all mb-2 ${
                    step >= 2
                      ? 'bg-[#1d4ed8] text-white scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  2
                </div>
                <span className={`text-sm text-center ${step === 2 ? 'text-[#1d4ed8] font-bold' : 'text-gray-500'}`}>
                  Driver Details
                </span>
              </div>

              <div className={`flex-1 h-1 mx-4 transition-all ${step > 2 ? 'bg-[#1d4ed8]' : 'bg-gray-200'}`} style={{ maxWidth: '100px', marginTop: '-30px' }} />

              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all mb-2 ${
                    step >= 3
                      ? 'bg-[#1d4ed8] text-white scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  3
                </div>
                <span className={`text-sm text-center ${step === 3 ? 'text-[#1d4ed8] font-bold' : 'text-gray-500'}`}>
                  Verification
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo-blue.png"
                alt="CarLynk"
                width={80}
                height={80}
                style={{ width: 'auto', height: '80px' }}
              />
            </div>
            <h1 className="text-4xl font-bold text-[#0d1b2e] mb-2">Driver Registration</h1>
            <p className="text-[#5b6575] text-lg">
              {step === 1 && 'Create your account'}
              {step === 2 && 'Tell us about your driving experience'}
              {step === 3 && 'Upload verification documents'}
            </p>
          </div>

          <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-4">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+233 XX XXX XXXX"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </>
            )}

            {/* Step 2: Driver Details */}
            {step === 2 && (
              <>
                <Input
                  label="Driver's License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="DL-12345-GH"
                  required
                />
                <Input
                  label="Years of Driving Experience"
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  placeholder="5"
                  required
                />
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Accra, Ghana"
                  required
                />
              </>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-[#eef3f8] p-4 rounded-lg flex items-start gap-3">
                  <FileCheck size={24} className="text-[#1d4ed8] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="text-sm text-[#5b6575]">
                    <strong>Required Documents:</strong> Upload clear photos of your documents for verification.
                    All documents will be reviewed by our team within 1-3 business days.
                  </p>
                </div>
                <ImageUpload
                  label="Driver's License (Front)"
                  name="licensePhoto"
                  required
                  onChange={(file) => handleFileChange('licensePhoto', file)}
                />
                <ImageUpload
                  label="Profile Photo"
                  name="profilePhoto"
                  required
                  onChange={(file) => handleFileChange('profilePhoto', file)}
                />
                <ImageUpload
                  label="National ID Card"
                  name="idCard"
                  required
                  onChange={(file) => handleFileChange('idCard', file)}
                />
              </div>
            )}

            <div className="flex gap-4 pt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button type="submit" variant="primary" className="flex-1">
                {step === 3 ? 'Complete Registration' : 'Next'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#5b6575]">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#0d1b2e] font-semibold hover:text-[#e8c96a]">
                Sign In
              </Link>
            </p>
          </div>
          </div>
        </FormDeliveryFrame>
      </SectionBackground>
      <Footer />
    </div>
  );
}
