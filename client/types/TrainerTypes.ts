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
