
import { useState } from "react";
import LoginSection from "./Login/Login";
import RegisterSection from "./Registration/Registration";
import AuthPageSkeleton from "@/components/Auth/AuthPageSkeleton";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <AuthPageSkeleton />;
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border border-gray-200 rounded p-8">
          <LoginSection onLoadingChange={setIsLoading}/>
        </div>

        <div className="border border-gray-200 rounded p-8">
          <RegisterSection />
        </div>
      </div>
    </div>
  );
}