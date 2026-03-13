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
      { to: "/admin/regular-trainings", label: "Regular Trainings" },
      { to: "/admin/custom-trainings", label: "Custom Trainings" },
    ],
  },
  { label: "View Records", to: "/admin/view-records" },
] as const;