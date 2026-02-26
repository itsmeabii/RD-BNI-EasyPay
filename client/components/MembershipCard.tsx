import { ShoppingCart } from "lucide-react";
import { MembershipPlan, formatMembershipPrice } from "@/data/Membership";

interface MembershipCardProps {
  plan: MembershipPlan;
  onAddToCart: (plan: MembershipPlan) => void;
  onCheckout: (plan: MembershipPlan) => void;
}

export default function MembershipCard({ plan, onAddToCart, onCheckout }: MembershipCardProps) {
  return (
    <div className="relative border-2 border-gray-200 rounded-sm overflow-hidden flex flex-col">
      {plan.popular && (
        <div className="absolute top-3 right-3 z-10">
          <img
            src="/upgrade.svg"
            alt="Popular"
            className="w-8 h-8"
          />
        </div>
      )}

      {/* Plan image */}
      <img
        src={plan.image}
        alt={plan.label}
        className="w-full h-[324px] object-cover"
      />

      {/* Card body */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-grow bg-white border-b-4 border-bni-red rounded-sm">
        {/* Label + Price */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">{plan.label}</h3>
          <span className="text-lg font-bold text-bni-red">
            {formatMembershipPrice(plan.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-grow">
          {plan.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => onAddToCart(plan)}
            className="flex items-center gap-2 bg-bni-red text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={() => onCheckout(plan)}
            className="border-2 border-bni-red bg-bni-red text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}