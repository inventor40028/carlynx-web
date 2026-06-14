// Success page after driver signup
'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';

export default function SignupSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-6 bg-[#eef3f8]">
        <div className="w-full max-w-md bg-white border border-[#cfd6e3] p-8 rounded-xl shadow-lg text-center fade-in-up">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-[#1d4ed8]" strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-4">
            Registration Submitted!
          </h1>

          <p className="text-[#5b6575] mb-6">
            Your driver registration has been successfully submitted. Our team will review your documents within 1-3 business days.
          </p>

          <div className="bg-[#eef3f8] p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-[#5b6575] mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-sm text-[#5b6575] space-y-1">
              <li>✓ Document verification (1-3 business days)</li>
              <li>✓ Email notification when approved</li>
              <li>✓ Access to driver dashboard</li>
              <li>✓ Start browsing available vehicles</li>
            </ul>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push('/auth/signin')}
          >
            Go to Sign In
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
