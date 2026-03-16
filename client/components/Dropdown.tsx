import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  optionClassName?: string;
  placeholderClassName?: string;
  label?: string;           
  required?: boolean;       
  error?: string;          
  labelClassName?: string;  
};

export function Dropdown({
  value,
  options,
  onChange,
  className,
  placeholder,
  optionClassName,
  label,
  required,
  error,
  labelClassName,
  placeholderClassName
}: DropdownProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className={cn("text-md text-gray-500 font-semibold", labelClassName)}>
          {label}
          {required && <span className="text-bni-red ml-1">*</span>}
        </label>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-between bg-white focus:outline-none focus-visible:outline-none focus:ring-0",
              error ? "border-red-400" : "",
              className
            )}
          >
            <span className={value ? "text-gray-900" : cn("text-gray-400", placeholderClassName)}>
              {value || placeholder}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
          {(options ?? []).map((opt) => (
            <DropdownMenuItem
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                value === opt ? "font-semibold text-bni-red" : "",
                optionClassName
              )}
            >
              {opt}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}