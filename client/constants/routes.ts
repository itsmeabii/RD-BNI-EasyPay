export const MEMBER_NAV_ITEMS = [
  { label: "Account Details", to: "/my-account/account-details"},
  { label: "Addresses", to: "/my-account/addresses" },
  { label: "Downloads", to: "/my-account/downloads" },
  { label: "My Wallet", to: "/my-account/my-wallet" },
  { label: "Order History", to: "/my-account/order-history" },
  { label: "Trainer Application", to: "/my-account/trainer-application" },
  { label: "Upcoming Trainings", to: "/my-account/upcoming-trainings" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Account Details", to: "/admin/account-details" },
  { label: "Addresses", to: "/admin/addresses" },
  { label: "Downloads", to: "/admin/downloads" },
  { label: "My Wallet", to: "/admin/my-wallet" },
  { label: "Order History", to: "/admin/order-history" },
  { label: "Trainer List", to: "/admin/trainer-list" },
  {
    label: "Trainings",
    children: [
      { label: "Regular Trainings", to: "/admin/regular-trainings" },
      { label: "Custom Trainings", to: "/admin/custom-trainings" },
    ],
  },
  { label: "View Records", to: "/admin/view-records" },
] as const;

export const LT_NAV_ITEMS = [
  { label: "Account Details", to: "/leadership-account/account-details" },
  { label: "Addresses", to: "/leadership-account/addresses" },
  { label: "Downloads", to: "/leadership-account/downloads" },
  { label: "My Wallet", to: "/leadership-account/my-wallet" },
  { label: "Order History", to: "/leadership-account/order-history" },
  { label: "Training Request", to: "/leadership-account/training-request" },
] as const;