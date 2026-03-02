import RedButton from "@/components/Checkout/RedButton";
import { BillingData, ShippingData } from "@/data/Checkout";
import { OrderSummaryPanel } from "@/components/Checkout/OrderSummaryPanel";
import { BillingSection, ShippingSection, TermsAndNotes } from "@/components/Checkout/BillingFields";


interface BillingPageProps {
  billing: BillingData;
  setBilling: (d: BillingData) => void;
  shipping: ShippingData;
  setShipping: (d: ShippingData) => void;
  shipDiff: boolean;
  setShipDiff: (v: boolean) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  coupon: string;
  setCoupon: (v: string) => void;
  couponError: string;
  onApplyCoupon: () => void;
  discount: number;
  payMethod: "paynamics" | "bank";
  setPayMethod: (v: "paynamics" | "bank") => void;
  subtotal: number;
  total: number;
  onProceed: () => void;
}

export default function BillingPage({
  billing, setBilling,
  shipping, setShipping,
  shipDiff, setShipDiff,
  agreed, setAgreed,
  coupon, setCoupon,
  couponError, onApplyCoupon,
  discount, payMethod, setPayMethod,
  subtotal, total,
  onProceed,
}: BillingPageProps) {
  return (
    <div className="max-w-[1080px] mx-auto px-7 pt-7 pb-20">
      {/* Title */}
      <div className="flex items-center gap-5 mb-7 bg-gray-100 rounded-xl p-3">
        <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center flex-shrink-0">
          <img src="/Checkout.svg" alt="Checkout" className="w-20 h-20 object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-bni-red m-0">Checkout</h1>
      </div>

      <div className="flex gap-8 items-start">
        {/* Left — forms */}
        <div className="flex-1 min-w-0">
          <BillingSection data={billing} onChange={setBilling} />

          <button
            onClick={() => setShipping({ ...billing })}
            className="flex items-center gap-1.5 text-bni-red text-[13px] font-bold mb-3 bg-transparent border-none cursor-pointer hover:opacity-80 transition"
          >
            Copy billing Details Above
          </button>

          <div
            onClick={() => setShipDiff(!shipDiff)}
            className="flex justify-between items-center bg-gray-100 rounded-xl px-5 py-3.5 cursor-pointer mb-4 select-none"
          >
            <span className="text-gray-400 font-semibold text-[15px]">Ship to a different address?</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${shipDiff ? "bg-bni-red" : "bg-gray-300"}`}>
              {shipDiff && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
          </div>

          {shipDiff && <ShippingSection data={shipping} onChange={setShipping} />}

          <TermsAndNotes agreed={agreed} onToggle={setAgreed} />
        </div>

        {/* Right — order summary sticky */}
        <div className="w-[310px] flex-shrink-0 sticky top-5">
          <OrderSummaryPanel
            coupon={coupon}
            setCoupon={setCoupon}
            couponError={couponError}
            onApplyCoupon={onApplyCoupon}
            discount={discount}
            payMethod={payMethod}
            setPayMethod={setPayMethod}
            subtotal={subtotal}
            total={total}
          />
          <RedButton onClick={onProceed} full>
            CHECKOUT
          </RedButton>
        </div>
      </div>
    </div>
  );
}