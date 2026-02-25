export interface MembershipPlan {
  id: string;
  label: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
}

export interface MembershipCategory {
  key: string;
  label: string;
  path: string;
}

export const MEMBERSHIP_CATEGORIES: MembershipCategory[] = [
  { key: "new",     label: "New Membership", path: "/membership/new"     },
  { key: "renewal", label: "Renewal",        path: "/membership/renewal" },
  { key: "late",    label: "Late Fee",        path: "/membership/late"   },
  { key: "admin",   label: "Admin Fee",       path: "/membership/admin"  },
];

export const NEW_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "new-1yr",
    label: "1 Year Plan",
    duration: "1 year",
    price: 42000,
    description:
      "Become a BNI member for as low as ₱48,000 pesos only and enjoy the exclusive access to community of like-minded entrepreneur.",
    image: "/bni-membership.svg",
  },
  {
    id: "new-2yr",
    label: "2 Year Plan",
    duration: "2 years",
    price: 75600,
    description:
      "Become a BNI member for as low as ₱81,000 pesos only and enjoy the exclusive access to community of like-minded entrepreneur.",
    image: "/bni-membership.svg",
    popular: true,
  },
];

export const RENEWAL_PLANS: MembershipPlan[] = [
  {
    id: "renewal-1yr",
    label: "1 Year Renewal",
    duration: "1 year",
    price: 42000,
    description:
      "Renew your BNI membership for 1 year and continue enjoying exclusive access to a thriving business network.",
    image: "/membership/bni-membership.svg",
  },
  {
    id: "renewal-2yr",
    label: "2 Year Renewal",
    duration: "2 years",
    price: 75000,
    description:
      "Renew your BNI membership for 2 years at a discounted rate and keep growing your business network.",
    image: "/membership/bni-membership.svg",
    popular: true,
  },
];

export const LATE_FEE_PLANS: MembershipPlan[] = [
  {
    id: "late-fee",
    label: "Late Fee",
    duration: "",
    price: 500,
    description:
      "Pay the late fee for overdue membership renewal. Please settle as soon as possible to avoid suspension.",
    image: "/membership/bni-membership.svg",
  },
];

export const ADMIN_FEE_PLANS: MembershipPlan[] = [
  {
    id: "admin-fee",
    label: "Admin Fee",
    duration: "",
    price: 1000,
    description:
      "Administrative fee for processing membership-related requests and documentation.",
    image: "/membership/bni-membership.svg",
  },
];

export function formatMembershipPrice(price: number): string {
  return `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}