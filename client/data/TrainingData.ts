export interface TrainingData {
  title: string;
  category: string;
  description: string;
  image: string;
}

export const TRAINING_LIST: TrainingData[] = [
  {
    title: "Presentation Skills",
    category: "ASWS",
    description:
      "Master the art of delivering impactful presentations. Learn storytelling techniques, slide design principles, and public speaking skills to engage and persuade any audience.",
    image: "/Easypay/Presentation Skills.png",
  },
  {
    title: "Member Success Program",
    category: "MSP",
    description:
      "Unlock the full potential of your BNI membership. Discover proven strategies to maximize referrals, build strong business relationships, and accelerate your business growth.",
    image: "/Easypay/Member Success Program.png",
  },
  {
    title: "BNI Taguig Training Certification Program",
    category: "MSP",
    description:
      "Comprehensive certification covering MSP TCP, MSWS TCP, and ASWS TCP. Gain official BNI certification and deepen your expertise across all core training modules.",
    image: "/Easypay/BNI Taguig Training Certification Program.png",
  },
  {
    title: "Member Success Workshop Series",
    category: "MSWS",
    description:
      "An intensive workshop series designed to help members build lasting habits for BNI success. Includes hands-on exercises, group discussions, and personalized action plans.",
    image: "/Easypay/Member Success Workshop Series.png",
  },
  {
    title: "Advanced Presentation Workshop",
    category: "ASWS",
    description:
      "Take your presentation skills to the next level. This advanced workshop covers complex storytelling, handling tough Q&A sessions, and presenting to C-suite executives.",
    image: "/Easypay/Advanced Presentation Workshop.png",
  },
  {
    title: "Networking Mastery Program",
    category: "ASWS",
    description:
      "Learn the science and art of professional networking. Build genuine connections, nurture relationships, and create a referral engine that fuels exponential business growth.",
    image: "/Easypay/Networking Mastery Program.png",
  },
  {
    title: "Leadership Excellence Training",
    category: "ASWS",
    description:
      "Develop the leadership qualities that drive chapter success. From running effective meetings to inspiring your team, this training equips you with essential leadership tools.",
    image: "/Easypay/Leadership Excellence Training.png",
  },
  {
    title: "MSP Advanced Member Strategies",
    category: "MSP",
    description: "An advanced continuation of the Member Success Program, focusing on high-level referral strategies, chapter leadership techniques, and long-term membership retention.",
    image: "/Easypay/MSP Advanced Member Strategies.png",
  },
];

export function getTrainingData(trainingName: string): TrainingData | undefined {
  return TRAINING_LIST.find(
    (t) => t.title.toLowerCase() === trainingName.toLowerCase()
  );
}