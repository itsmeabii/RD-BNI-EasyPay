/*Types*/

export type SortOrder = "newest" | "oldest" | "";

export interface TrainingData {
  orderId: string;
  trainingName: string;
  trainingDate: string;
  reminder: string;
  category: "AWS" | "MSP" | "MSS" | "ASWS";
}

export interface DropdownOption {
  label: string;
  value: string;
}

/*Trainings Data */

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
    category: "AWS",
  },
  {
    orderId: "RQ-004",
    trainingName: "Entrepreneurship Fundamentals",
    trainingDate: "February 22, 2026",
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

/*Filter Options*/

export const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: "AWS", value: "AWS" },
  { label: "AMS", value: "AMS" },
  { label: "MSP", value: "MSP" },
];

export const DATE_SORT_OPTIONS: DropdownOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export interface TrainingData {
  orderId: string;
  trainingName: string;
  trainingDate: string;
  reminder: string;
  category: "AWS" | "MSP" | "MSS" | "ASWS";
}

// Example trainings
export const trainingsData: TrainingData[] = [
  {
    orderId: "TR001",
    trainingName: "React Basics",
    trainingDate: "2026-03-10",
    reminder: "1 day before",
    category: "AWS",
  },
  {
    orderId: "TR002",
    trainingName: "Advanced JS",
    trainingDate: "2026-03-15",
    reminder: "1 week before",
    category: "MSP",
  },
  // Add more trainings here
];