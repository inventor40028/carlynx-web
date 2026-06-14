// Button component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-[#0d1b2e] text-white hover:bg-[#122844]',
    secondary: 'bg-[#e8c96a] text-[#0d1b2e] hover:bg-[#d4b556]',
    outline: 'border-2 border-[#0d1b2e] text-[#0d1b2e] hover:bg-[#eef3f8]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ borderRadius: '16px' }}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
    >
      {children}
    </button>
  );
}
