export type Trainer = {
  id: number;
  trainerId: string;
  firstName: string;
  lastName: string;
  chapter: string;
  preferredCategory: string;
  availability: string | null; 
  image: string;
};

export type TrainerListDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (trainer: Trainer) => void;
};

export type TrainingRecord = {
  id: number;
  requestId: string | null;
  trainerId: number;
  trainingId: number | null;
  trainingTitle: string;
  trainingCode: string;
  trainingDescription: string;
  trainingThumbnail: string;
  proposedDate: string;
  status: string;
  createdAt: string;
  trainingType: "regular" | "custom";
  chapter: string;
  ltName: string;
  requestedAt: string;
  timeApproved: string;
};