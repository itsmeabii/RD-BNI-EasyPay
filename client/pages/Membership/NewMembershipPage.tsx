import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { NEW_MEMBERSHIP_PLANS, MembershipPlan } from "@/data/Membership";
import MembershipCard from "@/components/MembershipCard";
import Patterns from "@/components/Patterns";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function NewMembership() {
  const navigate = useNavigate();
  const { addToCart, openCart, checkoutSingle } = useCart();

  const handleAddToCart = (plan: MembershipPlan) => {
    addToCart({
      id: plan.price, 
      title: plan.label,
      price: plan.price,
      thumbnail: plan.image,
    });
    openCart();
  };


  const handleCheckout = (plan: MembershipPlan) => {
    const items = checkoutSingle({
      id: plan.id,
      title: plan.label,
      price: plan.price,
      thumbnail: plan.image,
      qty: 1,
    });
    navigate("/checkout", { state: { checkoutItems: items } });
  };

  return (
    <div className="bg-white relative overflow-hidden">
      {/* left side patterns */}
      <Patterns
        first="absolute left-24 bottom-40 z-0"
        second="absolute left-0 bottom-20 z-0"
        third="absolute left-24 bottom-20 z-0"
      />
      {/* right side patterns */}
      <Patterns
        first="absolute right-0 top-40 z-0"
        second="absolute right-0 top-60 z-0"
        third="absolute right-24 top-60 z-0"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Page header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            New BNI Membership
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
            Your BNI Membership is your gateway to a thriving business network.
            gain exclusive access to a community of like-minded entrepreneurs
            collaborate, and grow their business.
          </p>
        </div>

        {/* Note */}
        <div className="text-center mb-10">
          <p className="text-sm text-gray-600">
            Note: This is for new/incoming BNI Members only.
          </p>
          <Link
            to="/membership/renewal"
            className="text-sm text-bni-red hover:underline"
          >
            Click here if you would like to access membership renewals.
          </Link>
        </div>

        {/* Membership plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {NEW_MEMBERSHIP_PLANS.map((plan) => (
            <MembershipCard
              key={plan.id}
              plan={plan}
              onAddToCart={handleAddToCart}
              onCheckout={handleCheckout}
            />
          ))}
        </div>
      </div>

      <Footer />
      <ShoppingCartButton />
    </div>
  );
}