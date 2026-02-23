import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MembershipCard from "@/components/MembershipCard";

export default function Membership() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const membershipTiers = [
    {
      title: "Basic",
      price: "₱2,500",
      description: "Perfect for getting started",
      features: [
        "Access to weekly BNI meetings",
        "Networking with 50+ local members",
        "Basic training materials",
        "Email support",
        "Member directory access",
      ],
    },
    {
      title: "Professional",
      price: "₱5,000",
      description: "Best for active members",
      isPopular: true,
      cta: "Get Started",
      features: [
        "All Basic features",
        "Priority in lead exchange",
        "Advanced training programs",
        "Monthly success coaching",
        "Exclusive workshop access",
        "Direct phone support",
      ],
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For organizations",
      features: [
        "All Professional features",
        "Dedicated account manager",
        "Custom training programs",
        "Team licensing (up to 10)",
        "Analytics dashboard",
        "Priority event access",
        "Quarterly business reviews",
      ],
    },
  ];

  const benefits = [
    {
      icon: "🤝",
      title: "Networking Opportunities",
      description: "Connect with 50+ business owners and professionals in Taguig",
    },
    {
      icon: "📚",
      title: "Training & Development",
      description: "Access exclusive training materials and certification programs",
    },
    {
      icon: "💼",
      title: "Business Growth",
      description: "Get leads, referrals, and business opportunities from network",
    },
    {
      icon: "🎯",
      title: "Goal Accountability",
      description: "Regular check-ins and goal tracking to keep you on track",
    },
    {
      icon: "🏆",
      title: "Recognition",
      description: "Get recognized for your achievements and contributions",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Get help from our support team whenever you need it",
    },
  ];

  const faqs = [
    {
      question: "What is BNI Taguig?",
      answer:
        "BNI Taguig is a business networking organization dedicated to helping entrepreneurs and professionals grow their businesses through networking, referrals, and business opportunities.",
    },
    {
      question: "How much does membership cost?",
      answer:
        "We offer three membership tiers: Basic (₱2,500/year), Professional (₱5,000/year), and Enterprise (custom pricing). Choose the plan that best fits your business needs.",
    },
    {
      question: "Can I change my membership plan?",
      answer:
        "Yes, you can upgrade or downgrade your membership plan at any time. Contact our support team for assistance with plan changes.",
    },
    {
      question: "What if I'm not satisfied with the membership?",
      answer:
        "We offer a 30-day money-back guarantee if you're not satisfied with your membership. Contact us within 30 days of joining for a full refund.",
    },
    {
      question: "How often do BNI meetings take place?",
      answer:
        "BNI Taguig holds weekly meetings every week. Members are encouraged to attend as many meetings as possible to maximize networking benefits.",
    },
    {
      question: "Can I attend a meeting before joining?",
      answer:
        "Yes! Visitors are always welcome. Attend one of our meetings to see if BNI is right for you before committing to membership.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-bni-red to-red-700 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Join BNI Taguig
            </h1>
            <p className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto">
              Grow your business through powerful networking and business
              opportunities. Choose the membership plan that's right for you.
            </p>
          </div>
        </section>

        {/* Membership Tiers Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
              Membership Plans
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Choose the membership level that best suits your business goals
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membershipTiers.map((tier, idx) => (
                <MembershipCard key={idx} {...tier} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
              Membership Benefits
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Unlock exclusive benefits designed to help you grow your business
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
              How to Get Started
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Choose Your Plan",
                  description: "Select the membership tier that works best for you",
                },
                {
                  step: 2,
                  title: "Complete Registration",
                  description: "Fill out your profile and business information",
                },
                {
                  step: 3,
                  title: "Make Payment",
                  description: "Secure payment via credit card or bank transfer",
                },
                {
                  step: 4,
                  title: "Start Networking",
                  description: "Attend meetings and connect with our community",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="bg-bni-red text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === idx ? null : idx)
                    }
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-bold text-black text-left">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-bni-red flex-shrink-0 transition-transform ${
                        expandedFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedFaq === idx && (
                    <div className="px-6 pb-6 text-gray-600 border-t">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-bni-red text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-red-100 mb-8">
              Join hundreds of business owners in Taguig who are growing through
              BNI networking.
            </p>
            <Link
              to="/membership/new"
              className="inline-block bg-white text-bni-red px-8 py-4 rounded font-bold hover:bg-gray-100 transition-colors text-lg"
            >
              Join Now
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
