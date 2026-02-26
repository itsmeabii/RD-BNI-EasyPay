import { Skeleton } from "@/components/ui/skeleton";

function LoginPanelSkeleton() {
  return (
    <div className="border border-gray-200 rounded p-8 space-y-5">
      {/* Section title */}
      <Skeleton className="h-7 w-16" />

      {/* Email field */}
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Password field */}
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Log in button + Remember me */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Lost your password */}
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

function RegistrationPanelSkeleton() {
  return (
    <div className="border border-gray-200 rounded p-8 space-y-5">
      {/* Section title */}
      <Skeleton className="h-7 w-24" />

      {/* Email field */}
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Helper text lines */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />

      {/* Register button */}
      <Skeleton className="h-10 w-24" />
    </div>
  );
}

export default function AuthPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Page title */}
      <Skeleton className="h-8 w-64 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <LoginPanelSkeleton />
        <RegistrationPanelSkeleton />
      </div>
    </div>
  );
}