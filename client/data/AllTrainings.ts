/* ───────────────── TYPES ───────────────── */

export type SortOrder = "newest" | "oldest" | "";

export type TrainingCategory = "AWS" | "AMS" | "MSP" | "MSS" | "ASWS";

export interface DropdownOption {
  label: string;
  value: string;
}

/* ───────────────── REGULAR TRAININGS ───────────────── */

export interface TrainingData {
  orderId: string;
  trainingName: string;
  trainingDate: string;
  reminder: string;
  category: TrainingCategory;
}

export const ALL_TRAININGS: TrainingData[] = [
  {
    orderId: "RQ-001",
    trainingName: "Business Strategy & Planning",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "AWS",
  },
  {
    orderId: "RQ-002",
    trainingName: "Sales Techniques That Close Deals",
    trainingDate: "February 22, 2026",
    reminder: "No reminder",
    category: "AWS",
  },
  {
    orderId: "RQ-003",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "MSP",
  },
];

/* ───────────────── CUSTOM TRAININGS ───────────────── */

export interface CustomTraining {
  requestId: string;
  trainingName: string;
  training: TrainingCategory;
  chapter: string;
  proposedDate: string;
  noOfAttendees: number;
}

export const ALL_CUSTOM_TRAININGS: CustomTraining[] = [
  {
    requestId: "RQ-001",
    trainingName: "MSP Fundamentals",
    training: "MSP",
    chapter: "All-Star",
    proposedDate: "03/19/2026",
    noOfAttendees: 20,
  },
  {
    requestId: "RQ-002",
    trainingName: "MSP Advanced",
    training: "MSP",
    chapter: "All-Star",
    proposedDate: "06/20/2026",
    noOfAttendees: 15,
  },

    {
    requestId: "RQ-003",
    trainingName: "ASWS Presentation Training",
    training: "ASWS",
    chapter: "Trailblazer",
    proposedDate: "06/21/2026",
    noOfAttendees: 15,
  },

  {
    requestId: "RQ-004",
    trainingName: "Member Success Program",
    training: "ASWS",
    chapter: "GRiT",
    proposedDate: "06/21/2026",
    noOfAttendees: 20,
  },

    {
    requestId: "RQ-005",
    trainingName: "BNI Taguig Training Certification Program",
    training: "MSP",
    chapter: "GRiT",
    proposedDate: "06/21/2026",
    noOfAttendees: 20,
  },

    {
    requestId: "RQ-006",
    trainingName: "Advance Presentation Workshop",
    training: "ASWS",
    chapter: "Dynamic",
    proposedDate: "06/21/2026",
    noOfAttendees: 20,
  },

    {
    requestId: "RQ-007",
    trainingName: "Member Success Program",
    training: "AWS",
    chapter: "Elite",
    proposedDate: "02/04/2026",
    noOfAttendees: 20,
  },
];

/* ───────────────── FILTER OPTIONS ───────────────── */

export const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: "AWS", value: "AWS" },
  { label: "AMS", value: "AMS" },
  { label: "MSP", value: "MSP" },
  { label: "MSS", value: "MSS" },
  { label: "ASWS", value: "ASWS" },
];

export const DATE_SORT_OPTIONS: DropdownOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export const CHAPTER_OPTIONS: DropdownOption[] = [
  { label: "All-Star", value: "All-Star" },
  { label: "Catalyst", value: "Catalyst" },
  { label: "Dauntless", value: "Dauntless" },
  { label: "Dynamic", value: "Dynamic" },
  { label: "Elite", value: "Elite" },
  { label: "Empire", value: "Empire" },
  { label: "Gear", value: "Gear" },
  { label: "GRiT", value: "GRiT" },
  { label: "Iconic", value: "Iconic" },
  { label: "RISE", value: "RISE" },
  { label: "Trailblazer", value: "Trailblazer" },
  { label: "BNI Taguig Admin", value: "BNI Taguig Admin" },
  { label: "Guest", value: "Guest" },
  { label: "Sponsor", value: "Sponsor" },
];