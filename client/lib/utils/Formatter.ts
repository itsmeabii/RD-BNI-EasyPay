export function formatPrice(price: number): string {
  return price === 0
    ? "₱0.00"
    : `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}