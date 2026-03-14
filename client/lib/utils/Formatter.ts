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

// Output: "March 6, 2026 2:35pm"
export function formatProposedDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${month} ${day}, ${year} ${hours}:${minutes}${ampm}`;
}

// Output: "01/27/2026 8:19 pm" — for Training Request table
export function formatDateTime(dateStr: string): string {
  if (!dateStr || dateStr === "—") return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
}