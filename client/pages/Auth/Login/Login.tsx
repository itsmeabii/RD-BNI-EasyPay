"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_USER } from "@/data/Login";
import { useAuth } from "@/context/AuthContext";

type LoginSuccessPayload = {
  userName: string;
  email: string;
};

type LoginSectionProps = {
  onSuccess?: (payload: LoginSuccessPayload) => void;
  onLoadingChange?: (isLoading: boolean) => void;
};

export default function LoginSection({ onSuccess, onLoadingChange }: LoginSectionProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoadingChange?.(true);

    // TODO: Replace with real API call
    setTimeout(() => {
      if (
        formData.email === MOCK_USER.email &&
        formData.password === MOCK_USER.password
      ) {
        login({ userName: MOCK_USER.username, email: formData.email });
        onSuccess?.({ userName: MOCK_USER.username, email: formData.email });
        navigate("/");
      } else {
        setError("Invalid username or password. Please try again.");
        onLoadingChange?.(false);
      }
    }, 300);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#c0392b] mb-6">Login</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Username or email address <span className="text-bni-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="username"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2.5 text-sm bg-gray-100 border outline-none transition focus:bg-white focus:border-bni-red ${
              error ? "border-red-400" : "border-transparent"
            }`}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password <span className="text-bni-red">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2.5 pr-10 text-sm bg-gray-100 border outline-none transition focus:bg-white focus:border-bni-red ${
                error ? "border-red-400" : "border-transparent"
              }`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-bni-red hover:bg-[#a93226] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded transition"
          >
            Login
          </button>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              className="accent-bni-red"
            />
            Remember me
          </label>
        </div>

        <a href="#" className="block text-sm text-bni-red hover:underline">
          Lost your password?
        </a>
      </form>
    </div>
  );
}