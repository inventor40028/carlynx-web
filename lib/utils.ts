// Utility functions for CARLYNX

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Format currency for Ghana Cedis
export function formatCurrency(amount: number): string {
  return `GH₵ ${amount.toFixed(2)}`;
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB');
}

// Get status badge color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    disputed: 'bg-red-100 text-red-800',
    available: 'bg-green-100 text-green-800',
    partnered: 'bg-blue-100 text-blue-800',
    inactive: 'bg-gray-100 text-gray-800',
    paid: 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}
