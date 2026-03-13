import { UserNavigationSection } from "@/components/UserNavigationSection";
import { ADMIN_NAV_ITEMS } from "@/constants/routes";

export const AdminNavigationSection = (): JSX.Element => {
  return <UserNavigationSection menu_items={ADMIN_NAV_ITEMS} />;
};