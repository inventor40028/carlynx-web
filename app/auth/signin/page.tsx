// Sign in page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import FormDeliveryFrame from '@/components/ui/FormDeliveryFrame';
import { setSession } from '@/lib/session';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo credentials for testing
    const demoAccounts = {
      owner: { email: 'owner@carlynx.com', password: 'owner123' },
      driver: { email: 'driver@carlynx.com', password: 'driver123' }
    };

    // Check demo credentials
    if (formData.email === demoAccounts.owner.email && formData.password === demoAccounts.owner.password) {
      setSession({ role: 'owner', name: 'John Doe', email: formData.email });
      router.push('/owner/dashboard');
    } else if (formData.email === demoAccounts.driver.email && formData.password === demoAccounts.driver.password) {
      setSession({ role: 'driver', name: 'Kwame Mensah', email: formData.email });
      router.push('/driver/dashboard');
    } else {
      alert('Invalid credentials. Try:\nOwner: owner@carlynx.com / owner123\nDriver: driver@carlynx.com / driver123');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-6 bg-[#eef3f8]">
        <FormDeliveryFrame className="w-full max-w-md">
          <div className="w-full bg-white border border-[#cfd6e3] p-8 rounded-xl shadow-lg fade-in-up">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-2">Sign In</h1>
          <p className="text-[#5b6575] mb-6">Welcome back to CarLynk</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <Button type="submit" variant="primary" className="w-full mt-6">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-[#eef3f8] rounded-lg">
            <p className="text-sm font-semibold text-[#0d1b2e] mb-2">Demo Accounts:</p>
            <p className="text-xs text-[#5b6575]">
              <strong>Owner:</strong> owner@carlynx.com / owner123<br />
              <strong>Driver:</strong> driver@carlynx.com / driver123
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#5b6575]">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-[#0d1b2e] font-semibold hover:text-[#e8c96a]">
                Sign Up
              </Link>
            </p>
          </div>
          </div>
        </FormDeliveryFrame>
      </main>
      <Footer />
    </div>
  );
}
