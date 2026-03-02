import { useState } from "react";
import { Search } from "lucide-react";

interface SearchButtonProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchButton({ value, onChange }: SearchButtonProps){
    return (    
        <div className="flex-1 relative">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search (Ex: Member Success Program)"
                className="w-full py-3.5 pl-4 pr-12 text-sm border-2 border-gray-200 rounded-xl outline-none focus:border-bni-red transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                <Search />
            </span>
        </div>
    )
}

