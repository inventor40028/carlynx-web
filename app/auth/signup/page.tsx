// Sign up page
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedRole = searchParams.get('role');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Backend will handle registration
    console.log('Sign up:', formData);
    // Owner signup goes to role selection, then dashboard
    router.push('/auth/select-role?role=owner');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-6 bg-[#eef3f8]">
        <div className="w-full max-w-md bg-white border border-[#cfd6e3] p-8">
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
            <h1 className="text-4xl font-bold text-[#0d1b2e] mb-2">Create Account</h1>
            <p className="text-[#5b6575] text-lg">Join CarLynk today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" variant="primary" className="w-full mt-6">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#5b6575]">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#0d1b2e] font-semibold hover:text-[#e8c96a]">
                Sign In
              </Link>
            </p>
            <p className="text-[#5b6575] mt-2">
              Want to register as a driver?{' '}
              <Link href="/auth/driver-signup" className="text-[#0d1b2e] font-semibold hover:text-[#e8c96a]">
                Driver Signup
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
