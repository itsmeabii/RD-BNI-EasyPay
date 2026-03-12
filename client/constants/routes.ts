export const USER_PATHS = {
  ACCOUNT_DETAILS: "/my-account/AccountDetails",
  ADDRESSES: "/my-account/Addresses",
  DOWNLOADS: "/my-account/Downloads",
  MY_WALLET: "/my-account/MyWallet",
  ORDER_HISTORY: "/my-account/OrderHistory",
  TRAINING_REQUEST: "/trainingrequest",
  LOGOUT: "/my-account/Logout",
} as const;

export const NAV_ITEMS = [
  { label: "Account Details", to: USER_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: USER_PATHS.ADDRESSES },
  { label: "Downloads", to: USER_PATHS.DOWNLOADS },
  { label: "My Wallet", to: USER_PATHS.MY_WALLET },
  { label: "Order History", to: USER_PATHS.ORDER_HISTORY },
  { label: "Training Request", to: USER_PATHS.TRAINING_REQUEST },
  { label: "Logout", to: USER_PATHS.LOGOUT },
] as const;