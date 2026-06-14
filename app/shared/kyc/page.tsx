// KYC status page
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';

export default function KYCStatus() {
  // Backend will provide real data
  const kycData = {
    status: 'approved',
    submittedDate: '2026-05-15',
    approvedDate: '2026-05-18',
    documents: [
      { name: 'National ID', status: 'approved' },
      { name: 'Driver License', status: 'approved' },
      { name: 'Proof of Address', status: 'approved' }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eef3f8]">
      <Header />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d1b2e] mb-8">KYC Verification Status</h1>

          <Card borderColor="#4c1d95" className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#0d1b2e] mb-2">Verification Status</h2>
                <p className="text-[#5b6575]">Your identity verification status</p>
              </div>
              <StatusBadge status={kycData.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-[#5b6575] text-sm mb-1">Submitted Date</div>
                <div className="font-bold text-[#0d1b2e]">{kycData.submittedDate}</div>
              </div>
              <div>
                <div className="text-[#5b6575] text-sm mb-1">Approved Date</div>
                <div className="font-bold text-[#0d1b2e]">{kycData.approvedDate}</div>
              </div>
            </div>

            <div className="border-t border-[#cfd6e3] pt-6">
              <h3 className="font-bold text-[#0d1b2e] mb-4">Submitted Documents</h3>
              <div className="space-y-3">
                {kycData.documents.map((doc, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-[#111827]">{doc.name}</span>
                    <StatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-[#0d1b2e] mb-4">Important Information</h2>
            <ul className="space-y-2 text-[#5b6575]">
              <li>• All users must complete KYC verification before accessing partnership features</li>
              <li>• Document verification typically takes 1-3 business days</li>
              <li>• Ensure all documents are clear and valid</li>
              <li>• Contact support if you have questions about your verification status</li>
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
