import type { DropdownOption } from "@/types/TrainingTypes";

export const TRAINING_CATEGORIES = ["AWS", "MSP", "MSS", "ASWS"] as const;

export type SortOrder = "newest" | "oldest" | "";

export const EVENT_TYPE_MAP = {
  MSP: "msp",
  MSWS: "msws",
  ODWB: "odwb",
} as const;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const TRAINING_MESSAGES = {
  loading: "Loading trainings...",
  noResults: "No trainings found",
  noResultsHint: "Try searching with other keywords.",
  pageTitle: "2026 BNI Taguig Trainings and Workshops",
} as const;

export const FILTER_STATUS_LABELS = {
  all: "All",
  completed: "Completed",
  upcoming: "Upcoming",
} as const;

export const TRAINING_TABLE_COLUMNS = [
  "Order ID",
  "Training Name",
  "Training Date",
  "Categories",
  "Reminders",
  "Action",
];

export const CUSTOM_TRAINING_TABLE_COLUMNS = [
  "Request ID",
  "Training Name",
  "Training",
  "Chapter",
  "Proposed Date / Time",
  "No. of Attendees",
  "Trainer Application",
];

export const CUSTOM_TRAINING_ADMIN_TABLE_COLUMNS = [
  "Request ID",
  "Chapter",
  "Category",
  "Training",
  "No. of Attendees",
  "Proposed Date",
  "Trainer",
  "Manage Request",
];

export const CUSTOM_TRAINING_GRID_COLS = "100px 180px 70px 170px 130px 140px 190px 140px";

export const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: "ASWS", value: "ASWS" },
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

export const CHAPTERS = [
  "All-Star",
  "Catalyst",
  "Dauntless",
  "Dynamic",
  "Elite",
  "Empire",
  "Gear",
  "GRiT",
  "Iconic",
  "RISE",
  "Trailblazer",
  "BNI Taguig Admin",
  "Guests",
  "Sponsor",
];

export const TRAININGS = [
  "Business Strategy and Training",
  "Entrepreneurship Fundamentals",
];