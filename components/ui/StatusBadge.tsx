// Status badge component
import { getStatusColor } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      style={{ borderRadius: '9999px' }}
      className={`inline-block px-3 py-1 text-sm font-bold ${getStatusColor(status)} ${className}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
