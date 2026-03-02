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
  completed: boolean;
  completedDate?: string;
  dates: TrainingDate[];
  location: string;
  instructors: Instructor[];
}

export const trainings: Training[] = [
  {
    id: 1,
    title: "ASWS Presentation Skills",
    code: "ASWS",
    description:
      "Master the art of delivering impactful presentations. Learn storytelling techniques, slide design principles, and public speaking skills to engage and persuade any audience.",
    keyTopics: "Storytelling techniques, slide design principles, body language, vocal delivery, and handling Q&A sessions.",
    outcomes: "Participants will leave with the ability to craft compelling presentations, deliver with confidence, and earn their ASWS certification.",
    price: 0,
    thumbnail: "/training/asws-training.svg",
    images: [
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
    ],
    months: ["January"],
    completed: true,
    completedDate: "12-15-2025",
    dates: [
      { date: "January 15, 2026", time: "9:00 AM – 5:00 PM" },
      { date: "February 20, 2026", time: "8:00 AM – 4:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Darwin Cheng",
        background: "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
        image: "/training/instructor.svg",
      },
      {
        name: "Judee Quiazon",
        background: "Executive Director of BNI Taguig with over 10 years of experience in business networking, leadership development, and professional training.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Member Success Program",
    code: "MSP",
    description:
      "Unlock the full potential of your BNI membership. Discover proven strategies to maximize referrals, build strong business relationships, and accelerate your business growth.",
    keyTopics: "BNI membership strategies, referral generation, relationship building, and chapter participation best practices.",
    outcomes: "Participants will maximize their BNI membership value and earn their MSP certification.",
    price: 0,
    thumbnail: "/training/msp-training.svg",
    images: [
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
    ],
    months: ["January"],
    completed: false,
    dates: [
      { date: "January 22, 2026", time: "9:00 AM – 5:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Darwin Cheng",
        background: "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 3,
    title: "BNI Taguig Training Certification Program",
    code: "TCP",
    description:
      "Comprehensive certification covering MSP TCP, MSWS TCP, and ASWS TCP. Gain official BNI certification and deepen your expertise across all core training modules.",
    keyTopics: "MSP certification, MSWS certification, ASWS certification, and BNI core training modules.",
    outcomes: "Participants will earn full BNI Taguig Training Certification across all three core programs.",
    price: 5000,
    thumbnail: "/training/tcp-training.svg",
    images: [
      "/training/tcp-training.svg",
      "/training/tcp-training.svg",
      "/training/tcp-training.svg",
      "/training/tcp-training.svg",
      "/training/tcp-training.svg",
      "/training/tcp-training.svg",
    ],
    months: ["January"],
    completed: false,
    dates: [
      { date: "January 13, 2026", time: "9:00 AM – 5:00 PM" },
      { date: "January 14, 2026", time: "9:00 AM – 3:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Judee Quiazon",
        background: "Executive Director of BNI Taguig with over 10 years of experience in business networking, leadership development, and professional training.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 4,
    title: "MSWS Member Success Workshop Series",
    code: "MSWS",
    description:
      "An intensive workshop series designed to help members build lasting habits for BNI success. Includes hands-on exercises, group discussions, and personalized action plans.",
    keyTopics: "Habit formation, accountability systems, group dynamics, and personalized BNI action planning.",
    outcomes: "Participants will have a concrete BNI action plan and earn their MSWS certification.",
    price: 1500,
    thumbnail: "/training/msp-training.svg",
    images: [
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
    ],
    months: ["February"],
    completed: false,
    dates: [
      { date: "February 10, 2026", time: "9:00 AM – 5:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Darwin Cheng",
        background: "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 5,
    title: "ASWS Advanced Presentation Workshop",
    code: "ASWS",
    description:
      "Take your presentation skills to the next level. This advanced workshop covers complex storytelling, handling tough Q&A sessions, and presenting to C-suite executives.",
    keyTopics: "Advanced storytelling, executive-level presentations, crisis communication, and media handling.",
    outcomes: "Participants will be equipped to present confidently to senior executives and high-stakes audiences.",
    price: 2000,
    thumbnail: "/training/asws-training.svg",
    images: [
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
    ],
    months: ["February"],
    completed: false,
    dates: [
      { date: "February 12, 2026", time: "9:00 AM – 5:00 PM" },
      { date: "February 13, 2026", time: "9:00 AM – 12:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Judee Quiazon",
        background: "Executive Director of BNI Taguig with over 10 years of experience in business networking, leadership development, and professional training.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Networking Mastery Program",
    code: "NMP",
    description:
      "Learn the science and art of professional networking. Build genuine connections, nurture relationships, and create a referral engine that fuels exponential business growth.",
    keyTopics: "Networking psychology, relationship nurturing, referral systems, and digital networking strategies.",
    outcomes: "Participants will build a sustainable referral network and earn their NMP certification.",
    price: 2500,
    thumbnail: "/training/asws-training.svg",
    images: [
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
    ],
    months: ["March"],
    completed: false,
    dates: [
      { date: "March 5, 2026", time: "9:00 AM – 5:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Darwin Cheng",
        background: "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 7,
    title: "Leadership Excellence Training",
    code: "LET",
    description:
      "Develop the leadership qualities that drive chapter success. From running effective meetings to inspiring your team, this training equips you with essential leadership tools.",
    keyTopics: "Leadership styles, meeting facilitation, team motivation, conflict resolution, and chapter management.",
    outcomes: "Participants will develop practical leadership skills applicable to their BNI chapter and business.",
    price: 3000,
    thumbnail: "/training/asws-training.svg",
    images: [
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
      "/training/asws-training.svg",
    ],
    months: ["March"],
    completed: false,
    dates: [
      { date: "March 19, 2026", time: "9:00 AM – 5:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Judee Quiazon",
        background: "Executive Director of BNI Taguig with over 10 years of experience in business networking, leadership development, and professional training.",
        image: "/training/instructor.svg",
      },
    ],
  },
  {
    id: 8,
    title: "MSP Advanced Member Strategies",
    code: "MSP",
    description:
      "An advanced continuation of the Member Success Program, focusing on high-level referral strategies, chapter leadership techniques, and long-term membership retention.",
    keyTopics: "Advanced referral strategies, chapter leadership, membership retention, and business growth acceleration.",
    outcomes: "Participants will implement advanced BNI strategies to significantly grow their business through referrals.",
    price: 1800,
    thumbnail: "/training/msp-training.svg",
    images: [
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
      "/training/msp-training.svg",
    ],
    months: ["April"],
    completed: false,
    dates: [
      { date: "April 8, 2026", time: "9:00 AM – 5:00 PM" },
      { date: "April 9, 2026", time: "10:00 AM – 3:00 PM" },
    ],
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    instructors: [
      {
        name: "Darwin Cheng",
        background: "He specializes in training members on core networking strategies, referral generation, and practical skills to maximize their BNI membership and business growth.",
        image: "/training/instructor.svg",
      },
    ],
  },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatPrice(price: number): string {
  return price === 0 ? "₱0.00" : `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}