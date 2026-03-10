import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/Client";
import { MembershipPlan } from "@/types/MembershipTypes"; 

export function useMembershipPlans(category: string) {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlans() { 
      setLoading(true);
      const { data, error } = await supabase
        .from("membership_plans")
        .select("*")
        .eq("category", category)
        .order("id");

      if (error) setError(error.message);
      else setPlans(data as MembershipPlan[]);
      setLoading(false);
    }

    fetchPlans();
  }, [category]);

  return { plans, loading, error };
}