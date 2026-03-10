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

export const TRAINING_TABLE_COLUMNS = [
  "Order ID",
  "Training Name",
  "Training Date",
  "Categories",
  "Reminders",
  "Action",
];

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