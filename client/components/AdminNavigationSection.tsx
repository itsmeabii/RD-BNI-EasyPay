import { useAuth } from "@/context/AuthContext";
import { UserNavigationSection } from "@/components/UserNavigationSection";
import { ADMIN_PATHS } from "@/constants/routes";

const ADMIN_MENU_ITEMS = [
  { label: "Account Details", to: ADMIN_PATHS.ACCOUNT_DETAILS },
  { label: "Addresses", to: ADMIN_PATHS.ADDRESSES },
  { label: "Downloads", to: ADMIN_PATHS.DOWNLOADS },
  { label: "My Wallet", to: ADMIN_PATHS.MY_WALLET },
  { label: "Order History", to: ADMIN_PATHS.ORDER_HISTORY },
  { label: "Trainer List", to: ADMIN_PATHS.TRAINER_LIST },
  {
    label: "Trainings",
    children: [
      { label: "Regular Trainings", to: ADMIN_PATHS.REGULAR_TRAININGS },
      { label: "Custom Trainings", to: ADMIN_PATHS.CUSTOM_TRAININGS },
    ],
  },
  { label: "View Records", to: ADMIN_PATHS.VIEW_RECORDS },
] as const;

export const AdminNavigationSection = (): JSX.Element => {
  return <UserNavigationSection menu_items={ADMIN_MENU_ITEMS} />;
};