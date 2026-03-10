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

// Raw Supabase row shape (internal use by TrainingUtils only)
export interface TrainingRow {
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
  training_instructors: { name: string; background: string | null; image: string | null }[];
}