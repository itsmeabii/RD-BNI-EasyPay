"use client";

import { useState } from "react";

export default function RegisterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Replace with real API call
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-[#c0392b] mb-6">Register</h2>
        <div className="flex flex-col items-center gap-3 py-10 text-center text-gray-500">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p className="text-sm">
            A link to set your password has been sent to{" "}
            <strong className="text-gray-700">{email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#c0392b] mb-6">Register</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
            Email address <span className="text-[#c0392b]">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded px-3 py-2.5 text-sm bg-gray-100 border border-transparent outline-none transition focus:bg-white focus:border-[#c0392b]"
          />
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          A link to set a new password will be sent to your email address.
        </p>

        <p className="text-sm text-gray-500 leading-relaxed">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our{" "}
          <a href="#" className="text-[#c0392b] hover:underline">
            privacy policy
          </a>
          .
        </p>

        <button
          type="submit"
          className="bg-[#c0392b] hover:bg-[#a93226] text-white text-sm font-semibold px-5 py-2.5 rounded transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}