// Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

export default function Card({ children, className = '', borderColor }: CardProps) {
  const borderStyle = borderColor ? `border-t-4 border-t-[${borderColor}]` : '';

  return (
    <div
      style={{ borderRadius: '12px' }}
      className={`bg-white border border-[#cfd6e3] p-6 shadow-sm hover:shadow-md transition-shadow ${borderStyle} ${className}`}
    >
      {children}
    </div>
  );
}
