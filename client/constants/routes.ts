export const MEMBER_PATHS = {
  ACCOUNT_DETAILS: "/my-account/AccountDetails",
  ADDRESSES: "/my-account/Addresses",
  DOWNLOADS: "/my-account/Downloads",
  MY_WALLET: "/my-account/MyWallet",
  ORDER_HISTORY: "/my-account/OrderHistory",
  TRAINER_APPLICATION: "/my-account/TrainerApplication",
  UPCOMING_TRAINING: "/my-account/UpcomingTrainings",
  LOGOUT: "/my-account/Logout",
} as const;

export const MEMBER_NAV_ITEMS = [
  { label: "Account Details", to: MEMBER_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: MEMBER_PATHS.ADDRESSES },
  { label: "Downloads", to: MEMBER_PATHS.DOWNLOADS },
  { label: "My Wallet", to: MEMBER_PATHS.MY_WALLET },
  { label: "Order History", to: MEMBER_PATHS.ORDER_HISTORY },
  { label: "Trainer Application", to: MEMBER_PATHS.TRAINER_APPLICATION },
  { label: "Upcoming Trainings", to: MEMBER_PATHS.UPCOMING_TRAINING },
  { label: "Logout", to: MEMBER_PATHS.LOGOUT },
] as const;

export const LT_PATHS = {
  ACCOUNT_DETAILS: "/my-account/AccountDetails",
  ADDRESSES: "/my-account/Addresses",
  DOWNLOADS: "/my-account/Downloads",
  MY_WALLET: "/my-account/MyWallet",
  ORDER_HISTORY: "/my-account/OrderHistory",
  TRAINING_REQUEST: "/trainingrequest",
  LOGOUT: "/my-account/Logout",
} as const;


export const LT_NAV_ITEMS = [
  { label: "Account Details", to: LT_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: LT_PATHS.ADDRESSES },
  { label: "Downloads", to: LT_PATHS.DOWNLOADS },
  { label: "My Wallet", to: LT_PATHS.MY_WALLET },
  { label: "Order History", to: LT_PATHS.ORDER_HISTORY },
  { label: "Training Request", to: LT_PATHS.TRAINING_REQUEST },
  { label: "Logout", to: LT_PATHS.LOGOUT },
] as const;