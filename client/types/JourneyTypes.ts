import { TRAINING_CATEGORIES, EVENT_TYPE_MAP } from "@/constants/Training";

export type WorkshopStatus = "missed" | "completed" | "current" | "upcoming";
export type TrainingCategory = typeof TRAINING_CATEGORIES[number];
export type EventType = typeof EVENT_TYPE_MAP[keyof typeof EVENT_TYPE_MAP] | "default";

export type TrainingSeriesItem = {
  id: number;
  title: string;
  description: string;        
  learning_objectives: string; 
  who_is_this_for: string[];

};

export type WorkshopEvent = {
  trainingId: number;
  date: string;
  label: string;
  type: EventType;
  status: WorkshopStatus;
  isLastOfMonth: boolean;
  x: string;
  y: string;
};

export type WorkshopItem = {
  title: string;
  description?: string;
};

export type WorkshopGroupProps = {
  groupTitle: string;
  items: WorkshopItem[];
};

export type ProgramProgress = {
  id: number;
  title: string;
  starsCompleted: number;
  totalStars: number;
};

export type OverallProgress = {
  starsCompleted: number;
  totalStars: number;
};