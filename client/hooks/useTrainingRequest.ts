import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/Client";
import type { RequestStatus } from "@/constants/Training";
import type { TrainingRequest } from "@/types/TrainingTypes";

export function useTrainingRequest() {
  const [request, setRequest] = useState<TrainingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from("training_request")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching requests:", error);
    } else if (data) {
      const mapped: TrainingRequest[] = data.map((row) => ({
        id: row.id,
        ltName: row.lt_name,
        category: row.category,
        training: row.training,
        trainingDescription: row.training_description ?? "",
        chapter: row.chapter,
        proposedDate: row.proposed_date ?? "—",
        attendees: row.attendees,
        trainer: row.trainer ?? null,
        status: row.status as RequestStatus,
        requestNote: row.request_note ?? "",
        requestedAt: row.requested_at ?? "—",
        timeApproved: row.time_approved ?? "—",
      }));
      setRequest(mapped);

    }
    setLoading(false);
  }


  async function addRequest(data: {
    requestorName: string;
    trainingName: string;
    requestNote: string;
    proposedDate: string;
    chapter: string;
    attendees: number;
  }) {
    const { data: trainingData } = await supabase
      .from("trainings")
      .select("category, description")
      .eq("title", data.trainingName.trim())
      .maybeSingle();

    const category = trainingData?.category ?? "";
    const trainingDescription = trainingData?.description ?? "";
    const requestedAt = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const { error } = await supabase.from("training_request").insert({
      lt_name: data.requestorName,
      category,
      training: data.trainingName.trim(),
      training_description: trainingDescription,
      chapter: data.chapter,
      proposed_date: data.proposedDate,
      attendees: data.attendees,
      trainer: null,
      status: "Pending",
      request_note: data.requestNote,
      requested_at: requestedAt,
      time_approved: "—",
    });

    if (error) {
      console.error("Error inserting request:", error);
    } else {
      await fetchRequests();
    }
  }

  async function clearAll() {
    const { error } = await supabase
      .from("training_request")
      .delete()
      .neq("id", "");
    if (!error) {
      setRequest([]);
    }
  }

  return {
    request,
    addRequest,
    clearAll,
    loading,
  };
}