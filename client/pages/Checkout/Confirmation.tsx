import { peso } from "@/components/Checkout/OrderSummaryPanel";
import { OrderState } from "@/data/Checkout";

interface ConfirmationPageProps {
  order: OrderState;
  onReset: () => void;
}

export default function ConfirmationPage({ order, onReset }: ConfirmationPageProps) {
  const rows: [string, string][] = [
    ["Total Paid",     peso(order.total)],
    ["Payment Method", order.payMethod === "bank" ? "Direct Bank Transfer" : "Paynamics"],
    ["Status",         "Pending Verification"],
  ];

  return (
    <div className="max-w-[500px] mx-auto p-6 text-center">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-red-50 border-[3px] border-bni-red flex items-center justify-center text-4xl text-bni-red font-extrabold mx-auto mb-6">
        ✓
      </div>

      <h1 className="text-5xl font-extrabold text-bni-red mb-2.5">
        Order Placed!
      </h1>
      <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
        Thank you for your purchase.<br />
        We'll review your payment and confirm your order shortly.
      </p>

      {/* Order summary card */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-5 mb-8 text-left">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2.5 border-b border-gray-100 text-sm last:border-b-0">
            <span className="text-gray-400">{k}</span>
            <span className={`font-bold ${k === "Status" ? "text-amber-400" : "text-gray-800"}`}>
              {v}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="bg-bni-red hover:bg-bni-red/90 text-white border-none rounded-xl py-3.5 px-11 text-[15px] font-bold cursor-pointer tracking-wide transition-colors"
      >
        Back to Shop
      </button>
    </div>
  );
}