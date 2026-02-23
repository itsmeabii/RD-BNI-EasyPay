import { Check } from "lucide-react";

interface MembershipCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta?: string;
}

export default function MembershipCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  cta = "Choose Plan",
}: MembershipCardProps) {
  return (
    <div
      className={`rounded-lg border-2 overflow-hidden transition-transform hover:scale-105 ${
        isPopular
          ? "border-bni-red bg-gradient-to-br from-red-50 to-white shadow-lg"
          : "border-gray-300 bg-white"
      }`}
    >
      {isPopular && (
        <div className="bg-bni-red text-white py-2 text-center text-sm font-bold">
          MOST POPULAR
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 sm:p-8">
        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl sm:text-4xl font-bold text-black">
            {price}
          </span>
          {price !== "Custom" && (
            <span className="text-gray-600 ml-2">/year</span>
          )}
        </div>

        {/* CTA Button */}
        <button
          className={`w-full py-3 px-4 rounded font-bold transition-colors mb-6 ${
            isPopular
              ? "bg-bni-red text-white hover:opacity-90"
              : "border-2 border-bni-red text-bni-red hover:bg-red-50"
          }`}
        >
          {cta}
        </button>

        {/* Features List */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-black mb-4">Includes:</h4>
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-bni-red flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
