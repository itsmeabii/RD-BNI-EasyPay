export const STEPS: [string, string][] = [
  ["1", "Billing & Checkout"],
  ["2", "Proceed to Payment"],
  ["3", "Confirmation"],
];


export interface BillingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  chapter: string;
  company: string;
  country: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  postcode: string;
}

export interface ShippingData {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
}

export interface CartItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface OrderState {
  billing: BillingData;
  shipping: ShippingData;
  payMethod: "paynamics" | "bank";
  subtotal: number;
  discount: number;
  total: number;
  receiptFile?: string;
}

export const DEFAULT_BILLING: BillingData = {
  firstName: "", lastName: "", email: "", phone: "",
  region: "", chapter: "All-Star", company: "", country: "Philippines",
  street: "", apt: "", city: "", state: "Metro Manila", postcode: "",
};

export const DEFAULT_SHIPPING: ShippingData = {
  firstName: "", lastName: "", company: "", country: "Philippines",
  street: "", apt: "", city: "", state: "Metro Manila", postcode: "", phone: "",
};

export type CheckoutStep = "billing" | "payment" | "confirmation";

