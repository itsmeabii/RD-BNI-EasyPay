export const EVENT_TYPE_MAP = {
  MSP: "msp",
  MSWS: "msws",
  ODWB: "odwb",
} as const;

export type EventType = typeof EVENT_TYPE_MAP[keyof typeof EVENT_TYPE_MAP] | "default";
export type SortOrder = "newest" | "oldest" | "";
export type TrainingCategory = "AWS" | "MSP" | "MSS" | "ASWS";

export interface Instructor {
  name: string;
  background: string;
  image: string;
}

export interface TrainingDate {
  date: string;
  time: string;
}

export interface Training {
  id: number;
  title: string;
  code: string;
  description: string;
  keyTopics: string;
  outcomes: string;
  price: number;
  thumbnail: string;
  images?: string[];
  months: string[];
  dates: TrainingDate[];
  location: string;
  instructors: Instructor[];
}

export interface TrainingCompletion {
  trainingId: number;
  completedAt: string;
}

export type TrainingRow = {
  id: number;
  title: string;
  code: string;
  description: string | null;
  key_topics: string | null;
  outcomes: string | null;
  price: number;
  thumbnail: string | null;
  images: string[] | null;
  months: string[] | null;
  location: string | null;
  training_dates: { date: string; time: string }[];
  trainer_training_records: {
    trainers: {
      id: number;
      first_name: string;
      last_name: string | null;
      background: string | null;
      image: string | null;
    };
  }[];
};
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

export interface CustomTraining {
  requestId: string;
  trainingName: string;
  training: string;
  chapter: string;
  proposedDate: string;
  noOfAttendees: number;
}

import type { RequestStatus } from "../constants/Training";

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
