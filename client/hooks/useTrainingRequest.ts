import { useState, useEffect } from "react";

export type RequestStatus = "Approved" | "Declined" | "Pending";

export interface TrainingRequest {
  id: string;
  ltName: string;
  category: string;
  training: string;
  trainingDescription: string;
  chapter: string;
  proposedDate: string;
  attendees: number;
  trainer: string | null;
  status: RequestStatus;
  requestNote: string;
  requestedAt: string;
  timeApproved: string;
}

// All 8 trainings with their category and description
const TRAINING_DATA: Record<string, { category: string; description: string }> = {
  "Presentation Skills": {
    category: "ASWS",
    description:
      "Master the art of delivering impactful presentations. Learn storytelling techniques, slide design principles, and public speaking skills to engage and persuade any audience.",
  },
  "Member Success Program": {
    category: "MSP",
    description:
      "Unlock the full potential of your BNI membership. Discover proven strategies to maximize referrals, build strong business relationships, and accelerate your business growth.",
  },
  "BNI Taguig Training Certification Program": {
    category: "MSP",
    description:
      "Comprehensive certification covering MSP TCP, MSWS TCP, and ASWS TCP. Gain official BNI certification and deepen your expertise across all core training modules.",
  },
  "Member Success Workshop Series": {
    category: "MSWS",
    description:
      "An intensive workshop series designed to help members build lasting habits for BNI success. Includes hands-on exercises, group discussions, and personalized action plans.",
  },
  "Advanced Presentation Workshop": {
    category: "ASWS",
    description:
      "Take your presentation skills to the next level. This advanced workshop covers complex storytelling, handling tough Q&A sessions, and presenting to C-suite executives.",
  },
  "Networking Mastery Program": {
    category: "ASWS",
    description:
      "Learn the science and art of professional networking. Build genuine connections, nurture relationships, and create a referral engine that fuels exponential business growth.",
  },
  "Leadership Excellence Training": {
    category: "ASWS",
    description:
      "Develop the leadership qualities that drive chapter success. From running effective meetings to inspiring your team, this training equips you with essential leadership tools.",
  },
  "MSP Advanced Member Strategies": {
    category: "MSP",
    description:
      "An advanced continuation of the Member Success Program, focusing on high-level referral strategies, chapter leadership techniques, and long-term membership retention.",
  },
};

function getTraining(name: string) {
  // Try exact match first
  if (TRAINING_DATA[name]) return TRAINING_DATA[name];
  // Try case-insensitive match as fallback
  const key = Object.keys(TRAINING_DATA).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? TRAINING_DATA[key] : undefined;
}

const STORAGE_KEY = "bni_training_request";
const COUNTER_KEY = "bni_training_counter";

function loadRequest(): TrainingRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadCounter(): number {
  try {
    const raw = localStorage.getItem(COUNTER_KEY);
    return raw ? parseInt(raw, 10) : 1;
  } catch {
    return 1;
  }
}

function saveRequest(request: TrainingRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(request));
  } catch {}
}

function saveCounter(counter: number) {
  try {
    localStorage.setItem(COUNTER_KEY, String(counter));
  } catch {}
}

export function useTrainingRequest() {
  const [request, setRequest] = useState<TrainingRequest[]>([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    setRequest(loadRequest());
    setCounter(loadCounter());
  }, []);

  function generateId(current: number): string {
    return `RQ-${String(current).padStart(3, "0")}`;
  }

  function addRequest(data: {
    requestorName: string;
    trainingName: string;
    requestNote: string;
    proposedDate: string;
    chapter: string;
    attendees: number;
  }): void {
    const matched = getTraining(data.trainingName);

    const newRow: TrainingRequest = {
      id: generateId(counter),
      ltName: data.requestorName,
      category: matched?.category ?? "MSP",
      training: data.trainingName,
      trainingDescription: matched?.description ?? "",
      chapter: data.chapter || "—",
      proposedDate: data.proposedDate
        ? new Date(data.proposedDate).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        : "—",
      attendees: data.attendees,
      trainer: null,
      status: "Pending",
      requestNote: data.requestNote,
      requestedAt: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      timeApproved: "—",
    };

    const nextCounter = counter + 1;
    const updated = [...request, newRow];
    setRequest(updated);
    setCounter(nextCounter);
    saveRequest(updated);
    saveCounter(nextCounter);
  }

  function clearAll(): void {
    setRequest([]);
    setCounter(1);
    saveRequest([]);
    saveCounter(1);
  }

  return {
    request,
    counter,
    nextId: generateId(counter),
    addRequest,
    clearAll,
  };
}