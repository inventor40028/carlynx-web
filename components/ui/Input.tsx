// Input component
interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = ''
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-[#111827] font-semibold">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ borderRadius: '8px' }}
        className="border border-[#cfd6e3] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d1b2e] focus:border-transparent transition-all"
      />
    </div>
  );
}
