export function formatPrice(price: number): string {
  return price === 0
    ? "₱0.00"
    : `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}