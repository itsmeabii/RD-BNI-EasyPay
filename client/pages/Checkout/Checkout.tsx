import { useState, useRef } from "react";
import {
  CheckoutStep, OrderState,
  BillingData, ShippingData,
  DEFAULT_BILLING, DEFAULT_SHIPPING,
} from "@/data/Checkout";
import StepBar from "@/components/Checkout/StepBar";
import { useCart } from "@/context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import BillingPage      from "./Billing";
import PaymentPage      from "./Payment";
import ConfirmationPage from "./Confirmation";

const VALID_COUPONS: Record<string, number> = { SAVE10: 29.2 };

export default function Checkout() {
  const { checkoutItems: contextItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep]               = useState<CheckoutStep>("billing");
  const [billing, setBilling]         = useState<BillingData>(DEFAULT_BILLING);
  const [shipping, setShipping]       = useState<ShippingData>(DEFAULT_SHIPPING);
  const [shipDiff, setShipDiff]       = useState(false);
  const [agreed, setAgreed]           = useState(false);
  const [coupon, setCoupon]           = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount]       = useState(0);
  const [payMethod, setPayMethod]     = useState<"paynamics" | "bank">("paynamics");
  const [order, setOrder]             = useState<OrderState | null>(null);

  const orderNum  = useRef(`A${10000 + Math.floor(Math.random() * 90000)}`).current;
  const orderDate = useRef(
    new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  ).current;

  const checkoutItems =
    contextItems.length > 0
      ? contextItems
      : (location.state?.checkoutItems ?? []);
      
  const subtotal = checkoutItems.reduce((s, i) => s + i.price * (i.qty ?? 1), 0);
  const total    = subtotal - discount;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code] !== undefined) {
      setDiscount(VALID_COUPONS[code]);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponError("This code is invalid");
    }
  };

  const handleProceedToPayment = () => {
    if (!agreed) { alert("Please agree to the Terms and Conditions."); return; }
    setOrder({ billing, shipping: shipDiff ? shipping : billing, payMethod, subtotal, discount, total });
    setStep("payment");
  };

  const handlePlaceOrder = (file: File | null) => {
    setOrder(prev => prev ? { ...prev, receiptFile: file?.name } : prev);
    setStep("confirmation");
  };

  const handleReset = () => {
    setStep("billing");
    setOrder(null);
    setBilling(DEFAULT_BILLING);
    setShipping(DEFAULT_SHIPPING);
    setCoupon("");
    setCouponError("");
    setDiscount(0);
    setPayMethod("paynamics");
    setAgreed(false);
  };

  const stepNum = step === "billing" ? 1 : step === "payment" ? 2 : 3;

   if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No items to checkout</h2>
        <p className="text-gray-400 mb-6">Looks like your cart is empty.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-bni-red text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      {/* Step indicator */}
      <div className="bg-white border-b-2 border-gray-100">
        <StepBar current={stepNum} />
      </div>
      <div className="h-[3px] bg-bni-red" />

      <div className="bg-white">
        {step === "billing" && (
          <BillingPage
            billing={billing}         setBilling={setBilling}
            shipping={shipping}       setShipping={setShipping}
            shipDiff={shipDiff}       setShipDiff={setShipDiff}
            agreed={agreed}           setAgreed={setAgreed}
            coupon={coupon}           setCoupon={setCoupon}
            couponError={couponError}
            onApplyCoupon={handleApplyCoupon}
            discount={discount}
            payMethod={payMethod}     setPayMethod={setPayMethod}
            subtotal={subtotal}
            total={total}
            onProceed={handleProceedToPayment}
          />
        )}

        {step === "payment" && order && (
          <PaymentPage
            order={order}
            orderNum={orderNum}
            orderDate={orderDate}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {step === "confirmation" && order && (
          <ConfirmationPage
            order={order}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}