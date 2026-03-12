import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/Client";
import { useAuth } from "../context/AuthContext";

export function useReminders(trainings: { orderId: string }[]) {
  const { user } = useAuth();
  const [reminderOverrides, setReminderOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;

    const fetchReminders = async () => {
      const { data, error } = await supabase
        .from("reminder_value")
        .select("order_ID, reminder_value")
        .eq("user_id", user.id);

      if (error) { console.error("Error fetching reminders:", error); return; }

      const overrides: Record<string, string> = {};
      (data ?? []).forEach((row: any) => {
        overrides[row.order_ID] = row.reminder_value;
      });
      setReminderOverrides(overrides);
    };

    fetchReminders();
  }, [user, trainings]);

  const saveReminder = async (
    orderId: string,
    reminderValue: string,
    type: "preset" | "custom" = "preset",
    customNumber?: number,
    customUnit?: string
  ) => {
    if (!user) { console.warn("Not logged in"); return; }

    const { data: existing } = await supabase
      .from("reminder_value")
      .select("id")
      .eq("user_id", user.id)
      .eq("order_ID", orderId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("reminder_value")
        .update({
          reminder_type: type,
          reminder_value: reminderValue,
          custom_number: customNumber ?? null,
          custom_unit: customUnit ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .eq("order_ID", orderId);

      if (error) console.error("Error updating reminder:", error);
      else console.log("Reminder updated:", { orderId, reminderValue });
    } else {
      const { error } = await supabase
        .from("reminder_value")
        .insert({
          user_id: user.id,
          order_ID: orderId,
          reminder_type: type,
          reminder_value: reminderValue,
          custom_number: customNumber ?? null,
          custom_unit: customUnit ?? null,
        });

      if (error) console.error("Error inserting reminder:", error);
      else console.log("Reminder inserted:", { orderId, reminderValue });
    }
  };

  const setReminder = (orderId: string, value: string) => {
    setReminderOverrides((prev) => ({ ...prev, [orderId]: value }));
  };
  
  return { reminderOverrides, saveReminder, setReminder };
}