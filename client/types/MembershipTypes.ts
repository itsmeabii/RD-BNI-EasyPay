export interface MembershipPlan {
  id: number;
  label: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
  category?: string;
}

export interface MembershipCategory {
  key: string;
  label: string;
  path: string;
}
