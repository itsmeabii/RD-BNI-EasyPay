/* ─── Types ─────────────────────────────────────────────────────────────── */

export type SortOrder = "newest" | "oldest" | "";

export type TrainingCategory = "AWS" | "MSP" | "MSS" | "ASWS";

export interface TrainingData {
  orderId: string;
  trainingName: string;
  trainingDate: string;
  reminder: string;
  category: TrainingCategory;
}

export interface DropdownOption {
  label: string;
  value: string;
}

/* ─── Table Column Labels ────────────────────────────────────────────────── */

export const TRAINING_TABLE_COLUMNS = [
  "Order ID",
  "Training Name",
  "Training Date",
  "Categories",
  "Reminders",
  "Action",
];

/* ─── Trainings Data ─────────────────────────────────────────────────────── */

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
    trainingDate: "January 26, 2026",
    reminder: "1 week before",
    category: "AWS",
  },
  {
    orderId: "RQ-004",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 21, 2026",
    reminder: "1 week before",
    category: "MSP",
  },
  {
    orderId: "RQ-005",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 22, 2026",
    reminder: "1 week before",
    category: "AWS",
  },
];

/* ─── Filter / Sort Options ──────────────────────────────────────────────── */

export const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: "AWS", value: "AWS" },
  { label: "AMS", value: "AMS" },
  { label: "MSP", value: "MSP" },
];

export const MONTH_OPTIONS: DropdownOption[] = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export const DATE_SORT_OPTIONS: DropdownOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];