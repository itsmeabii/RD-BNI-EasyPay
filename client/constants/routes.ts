
export const MEMBER_PATHS = {
  ACCOUNT_DETAILS: "/my-account/AccountDetails",
  ADDRESSES: "/my-account/Addresses",
  DOWNLOADS: "/my-account/Downloads",
  MY_WALLET: "/my-account/MyWallet",
  ORDER_HISTORY: "/my-account/OrderHistory",
  TRAINER_APPLICATION: "/my-account/TrainerApplication",
  UPCOMING_TRAINING: "/my-account/UpcomingTrainings",
} as const;

export const MEMBER_NAV_ITEMS = [
  { label: "Account Details", to: MEMBER_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: MEMBER_PATHS.ADDRESSES },
  { label: "Downloads", to: MEMBER_PATHS.DOWNLOADS },
  { label: "My Wallet", to: MEMBER_PATHS.MY_WALLET },
  { label: "Order History", to: MEMBER_PATHS.ORDER_HISTORY },
  { label: "Trainer Application", to: MEMBER_PATHS.TRAINER_APPLICATION },
  { label: "Upcoming Trainings", to: MEMBER_PATHS.UPCOMING_TRAINING },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Account Details", to: "/admin/account-details" },
  { label: "Addresses", to: "/admin/addresses" },
  { label: "Downloads", to: "/admin/downloads" },
  { label: "My Wallet",to: "/admin/my-wallet" },
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

export const LT_PATHS = {
  ACCOUNT_DETAILS: "/my-account/AccountDetails",
  ADDRESSES: "/my-account/Addresses",
  DOWNLOADS: "/my-account/Downloads",
  MY_WALLET: "/my-account/MyWallet",
  ORDER_HISTORY: "/my-account/OrderHistory",
  TRAINING_REQUEST: "/trainingrequest",
} as const;


export const LT_NAV_ITEMS = [
  { label: "Account Details", to: LT_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: LT_PATHS.ADDRESSES },
  { label: "Downloads", to: LT_PATHS.DOWNLOADS },
  { label: "My Wallet", to: LT_PATHS.MY_WALLET },
  { label: "Order History", to: LT_PATHS.ORDER_HISTORY },
  { label: "Training Request", to: LT_PATHS.TRAINING_REQUEST },
] as const;