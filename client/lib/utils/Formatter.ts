export function formatPrice(price: number): string {
  return price === 0
    ? "₱0.00"
    : `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}

// Output: "Mar 6"
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Output: "March 6, 2026" — expects "MM/DD/YYYY" format
export function formatDateLong(dateStr: string): string {
  const [m, d, y] = dateStr.split("/");
  return new Date(+y, +m - 1, +d).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

// Output: timestamp number — expects "MM/DD/YYYY" format
export function parseDate(dateStr: string): number {
  const [m, d, y] = dateStr.split("/");
  return new Date(+y, +m - 1, +d).getTime();
}