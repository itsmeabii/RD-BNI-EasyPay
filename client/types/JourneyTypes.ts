export type EventType = "msp" | "msws" | "odwb" | "default";

export type WorkshopStatus = "missed" | "completed" | "current" | "upcoming";

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