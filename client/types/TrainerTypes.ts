export type Trainer = {
  id: number;
  name: string;
  chapter: string;
  preferredCategory: string;
  image: string;
};

export type TrainerListDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (trainer: Trainer) => void;
};
