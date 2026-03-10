export const USER_PATHS = {
  ACCOUNT_DETAILS: "/my-account/AccountDetails",
  ADDRESSES: "/my-account/Addresses",
  DOWNLOADS: "/my-account/Downloads",
  MY_WALLET: "/my-account/MyWallet",
  ORDER_HISTORY: "/my-account/OrderHistory",
  TRAINER_APPLICATION: "/my-account/TrainerApplication",
  UPCOMING_TRAINING: "/my-account/UpcomingTrainings",
  LOGOUT: "/my-account/Logout",
} as const;

export const NAV_ITEMS = [
  { label: "Account Details", to: USER_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: USER_PATHS.ADDRESSES },
  { label: "Downloads", to: USER_PATHS.DOWNLOADS },
  { label: "My Wallet", to: USER_PATHS.MY_WALLET },
  { label: "Order History", to: USER_PATHS.ORDER_HISTORY },
  { label: "Trainer Application", to: USER_PATHS.TRAINER_APPLICATION },
  { label: "Upcoming Trainings", to: USER_PATHS.UPCOMING_TRAINING },
  { label: "Logout", to: USER_PATHS.LOGOUT },
] as const;