import { useCart } from "@/context/CartContext";

interface OrderSummaryPanelProps {
  coupon: string;
  setCoupon: (v: string) => void;
  couponError: string;
  onApplyCoupon: () => void;
  discount: number;
  payMethod: "paynamics" | "bank";
  setPayMethod: (v: "paynamics" | "bank") => void;
  subtotal: number;
  total: number;
}

const PAYMENT_METHODS = [
  {
    id: "paynamics" as const,
    title: "Credit / Debit Cards, G-Cash, Online banking, Over-the-Counter Payments",
    sub: "Pay via Paynamics",
  },
  { id: "bank" as const, title: "Direct Bank Transfer" },
];

export const peso = (n: number) =>
  "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2 });

export function OrderSummaryPanel({
  coupon, setCoupon, couponError, onApplyCoupon,
  discount, payMethod, setPayMethod, subtotal, total,
}: OrderSummaryPanelProps) {
  const { checkoutItems } = useCart();

  return (
    <div className="font-sans">
      <h2 className="font-extrabold text-xl text-gray-800 mb-3">Your Order</h2>

      {/* Items table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto] bg-gray-100 px-4 py-2.5 border-b border-gray-200">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Product</span>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
        </div>

        {/* Cart items */}
        {checkoutItems.map(item => (
          <div key={item.id} className="grid grid-cols-[1fr_auto] px-4 py-3 border-b border-gray-100 text-sm">
            <span className="text-gray-700">{item.title}</span>
            <span className="font-semibold text-gray-800">{peso(item.price)}</span>
          </div>
        ))}

        {/* Summary rows */}
        {[
          ["Subtotal",        peso(subtotal)],
          ["Shipping",        "NA"],
          ["Discount Coupon", discount > 0 ? `-${peso(discount)}` : peso(0)],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[1fr_auto] px-4 py-2 border-b border-gray-100 text-[13px] bg-gray-50">
            <span className="text-black">{k}</span>
            <span className="text-black">{v}</span>
          </div>
        ))}

        {/* Total */}
        <div className="grid grid-cols-[1fr_auto] px-4 py-3 bg-white">
          <span className="font-extrabold text-[15px] text-gray-800">Total</span>
          <span className="font-extrabold text-[15px] text-bni-red">{peso(total)}</span>
        </div>
      </div>

      {/* Coupon */}
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-2.5 bg-gray-50 gap-1.5">
            <span>
            <img src="/Ticket.svg" className="w-18 h-35"/>
            </span>
            <input
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 border-none bg-transparent text-[13px] py-2 outline-none"
            />
            {coupon && (
              <button onClick={() => setCoupon("")} className="text-gray-300 hover:text-gray-500 text-sm leading-none">
                ✕
              </button>
            )}
          </div>
          <button
            onClick={onApplyCoupon}
            className="bg-bni-red text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:opacity-90 transition whitespace-nowrap"
          >
            Apply Coupon
          </button>
        </div>
        {couponError && <p className="text-bni-red text-[11px] mt-1 font-semibold">{couponError}</p>}
      </div>

      {/* Payment methods */}
      {PAYMENT_METHODS.map(pm => (
        <div
          key={pm.id}
          onClick={() => setPayMethod(pm.id)}
          className={`flex items-start gap-3 border-2 rounded-xl px-3.5 py-3 mb-2.5 cursor-pointer transition-all
            ${payMethod === pm.id ? "border-bni-red bg-red-50" : "border-gray-200 bg-white"}`}
        >
          <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
            ${payMethod === pm.id ? "border-bni-red" : "border-gray-300"}`}>
            {payMethod === pm.id && (
              <div className="w-2 h-2 rounded-full bg-bni-red" />
            )}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800 m-0">{pm.title}</p>
            {"sub" in pm && pm.sub && (
              <p className="text-xs text-gray-400 mt-0.5 italic">{pm.sub}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}