
import { cn } from "@/lib/utils";

/**
 * @param {string} className
 * @return {React.ReactElement}
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-mine-shaft-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
