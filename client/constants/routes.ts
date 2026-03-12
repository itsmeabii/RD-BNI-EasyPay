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

export const ADMIN_PATHS = {
  ACCOUNT_DETAILS: "/admin/AccountDetails",
  ADDRESSES: "/admin/Addresses",
  DOWNLOADS: "/admin/Downloads",
  MY_WALLET: "/admin/MyWallet",
  ORDER_HISTORY: "/admin/OrderHistory",
  TRAINER_LIST: "/admin/TrainerList",
  REGULAR_TRAININGS: "/admin/RegularTrainings",
  CUSTOM_TRAININGS: "/admin/CustomTrainings",
  VIEW_RECORDS: "/admin/ViewRecords",
  LOGOUT: "/admin/Logout",
} as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Account Details", to: ADMIN_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: ADMIN_PATHS.ADDRESSES },
  { label: "Downloads", to: ADMIN_PATHS.DOWNLOADS },
  { label: "My Wallet", to: ADMIN_PATHS.MY_WALLET },
  { label: "Order History", to: ADMIN_PATHS.ORDER_HISTORY },
  { label: "Trainer List", to: ADMIN_PATHS.TRAINER_LIST },
  { label: "View Records", to: ADMIN_PATHS.VIEW_RECORDS },
  { label: "Logout", to: ADMIN_PATHS.LOGOUT },
] as const;