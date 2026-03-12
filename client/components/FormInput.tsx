type FormInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  inputClassName?: string; 
  labelClassName?: string; 
};

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  className,
  inputClassName,
  labelClassName,
}: FormInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      <label className={`text-md text-gray-500 font-semibold ${labelClassName ?? ""}`}>
        {label}
        {required && <span className="text-bni-red ml-1">*</span>}
      </label>
      <input
        placeholder={placeholder}
        className={`border rounded-lg px-3 py-2 text-md outline-none focus:border-bni-red ${
          error ? "border-red-400" : "border-gray-300"
        } ${inputClassName ?? ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}