export interface Training {
  id: number;
  title: string;
  code: string;
  description: string;
  price: number;
  image: string;
  month: string;
  monthNum: number;
  completed: boolean;
  date: string;
  time: string;
  location: string;
  facilitator: string;
}

export const trainings: Training[] = [
  {
    id: 1,
    title: "ASWS Presentation Skills",
    code: "ASWS",
    description:
      "Master the art of delivering impactful presentations. Learn storytelling techniques, slide design principles, and public speaking skills to engage and persuade any audience.",
    price: 0,
    image: "/training/asws-training.svg",
    month: "January",
    monthNum: 1,
    completed: true,
    date: "January 15, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 2,
    title: "Member Success Program",
    code: "MSP",
    description:
      "Unlock the full potential of your BNI membership. Discover proven strategies to maximize referrals, build strong business relationships, and accelerate your business growth.",
    price: 0,
    image: "/training/msp-training.svg",
    month: "January",
    monthNum: 1,
    completed: false,
    date: "January 22, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 3,
    title: "BNI Taguig Training Certification Program",
    code: "TCP",
    description:
      "Comprehensive certification covering MSP TCP, MSWS TCP, and ASWS TCP. Gain official BNI certification and deepen your expertise across all core training modules.",
    price: 5000,
    image: "/training/tcp-training.svg",
    month: "January",
    monthNum: 1,
    completed: false,
    date: "January 13–14, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 4,
    title: "MSWS Member Success Workshop Series",
    code: "MSWS",
    description:
      "An intensive workshop series designed to help members build lasting habits for BNI success. Includes hands-on exercises, group discussions, and personalized action plans.",
    price: 1500,
    image: "/training/msp-training.svg",
    month: "February",
    monthNum: 2,
    completed: false,
    date: "February 10, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 5,
    title: "ASWS Advanced Presentation Workshop",
    code: "ASWS",
    description:
      "Take your presentation skills to the next level. This advanced workshop covers complex storytelling, handling tough Q&A sessions, and presenting to C-suite executives.",
    price: 2000,
    image: "/training/asws-training.svg",
    month: "February",
    monthNum: 2,
    completed: false,
    date: "February 12–13, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 6,
    title: "Networking Mastery Program",
    code: "NMP",
    description:
      "Learn the science and art of professional networking. Build genuine connections, nurture relationships, and create a referral engine that fuels exponential business growth.",
    price: 2500,
    image: "/training/asws-training.svg",
    month: "March",
    monthNum: 3,
    completed: false,
    date: "March 5, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 7,
    title: "Leadership Excellence Training",
    code: "LET",
    description:
      "Develop the leadership qualities that drive chapter success. From running effective meetings to inspiring your team, this training equips you with essential leadership tools.",
    price: 3000,
    image: "/training/asws-training.svg",
    month: "March",
    monthNum: 3,
    completed: false,
    date: "March 19, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
  {
    id: 8,
    title: "MSP Advanced Member Strategies",
    code: "MSP",
    description:
      "An advanced continuation of the Member Success Program, focusing on high-level referral strategies, chapter leadership techniques, and long-term membership retention.",
    price: 1800,
    image: "/training/msp-training.svg",
    month: "April",
    monthNum: 4,
    completed: false,
    date: "April 8, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "BNI Taguig Back Office, Unit 30B Guimaras Bldg., Bonifacio Heights, Taguig City",
    facilitator: "Judee Quiazon",
  },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format price for display — matches TrainingCard's `price: string` prop */
export function formatPrice(price: number): string {
  return price === 0 ? "₱0.00" : `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}