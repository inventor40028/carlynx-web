// ─────────────────────────────────────────────────────────────────────────────
// SIGN IN PAGE — public route, both owners and drivers land here
// ─────────────────────────────────────────────────────────────────────────────
// Ready for backend integration:
//   POST /api/auth/login  { email, password }  → { token, user }
//   Backend will set JWT in httpOnly cookie via Set-Cookie header
//   On success: redirect to role-based dashboard
//   On failure: show error message
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import FormDeliveryFrame from '@/components/ui/FormDeliveryFrame';
import SectionBackground from '@/components/ui/SectionBackground';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: Backend integration needed
    // Replace this with actual API call to: POST /api/auth/login

    setTimeout(() => {
      setLoading(false);
      setError('Login functionality requires backend integration. Contact development team.');
    }, 500);

    /* Backend integration template:
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Backend sets JWT cookie, redirect based on role
      if (data.user.role === 'owner') {
        router.push('/owner/dashboard');
      } else {
        router.push('/driver/dashboard');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SectionBackground
        src="/images/mockupmobile.png"
        alt="CarLynk mobile app mockup"
        variant="form"
        position="center"
        className="flex-1 flex items-center justify-center py-12 px-6"
      >
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
      </SectionBackground>
      <Footer />
    </div>
  );
}
