export type EventType = "msp" | "msws" | "odwb" | "default";

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
export interface ProgramTrackerProps {
  title: string;
  starsCompleted: number;
  totalStars?: number;
}
export const PROGRAMS: ProgramTrackerProps[] = [
  { title: "MSP (Member Success Program)", starsCompleted: 5 },
  { title: "MSWS (Member Success Workshop Series)", starsCompleted: 5 },
  { title: "MSWS (Member Success Workshop Series)", starsCompleted: 5 },
  { title: "MSWS (Member Success Workshop Series)", starsCompleted: 5 },
];

export type WorkshopItem = {
  title: string;
  description?: string;
};

export type WorkshopGroupProps = {
  groupTitle: string;
  items: WorkshopItem[];
};

export const WORKSHOP_GROUPS: WorkshopGroupProps[] = [
  {
    groupTitle: "Member Success Program",
    items: [
      {
        title: "Member Success Program Version 2.0 (Business Builder)",
      },
      {
        title: "Member Success Program (Workshop)",
        description:
          "The most essential BNI workshop that gives members an overview of the tools, templates and systems designed to help them achieve success.",
      },
    ],
  },
  {
    groupTitle: "Member Success Workshop Series (MSWS)",
    items: [
      {
        title: "Member Success Workshop Series",
      },
      {
        title: "Weekly Presentation",
        description:
          "Learn how to attract the customers you deserve through a compelling Weekly Presentation.",
      },
      {
        title: "Feature Presentation",
      },
    ],
  },
];

export type WorkshopStatus = "missed" | "completed" | "current" | "upcoming";

export type UserWorkshopProgress = {
  trainingId: number;
  status: WorkshopStatus;
};

// TODO: Replace with real API data
export const USER_PROGRESS: UserWorkshopProgress[] = [
  { trainingId: 1, status: "completed" },
  { trainingId: 2, status: "missed" },
  { trainingId: 3, status: "missed" },
  { trainingId: 4, status: "current" },
  { trainingId: 5, status: "upcoming" },
  { trainingId: 6, status: "upcoming" },
  { trainingId: 7, status: "upcoming" },
  { trainingId: 8, status: "upcoming" },
];

export function getUserStatus(trainingId: number): WorkshopStatus {
  return (
    USER_PROGRESS.find((p) => p.trainingId === trainingId)?.status ?? "upcoming"
  );
}

export const WORKSHOP_SERIES = [
  {
    id: 1,
    title: "MEMBER SUCCESS PROGRAM VERSION 2.0 (BUSINESS BUILDER)",
    description:
      "An advanced program designed to help BNI members build and grow their business using proven BNI strategies, tools, and systems. This program takes members to the next level by focusing on business development and maximizing their BNI membership.",
    learningObjectives:
      "To master the fundamentals of building a strong referral network. To leverage BNI tools and systems for business growth. To understand and apply advanced referral strategies that accelerate business success.",
    whoIsThisFor: [
      "Members looking to grow their business through BNI",
      "Members who want to maximize their membership ROI",
      "Members who have completed the basic MSP workshop",
      "Members aiming to move up the Referral Confidence Curve",
    ],
  },
  {
    id: 2,
    title: "MEMBER SUCCESS PROGRAM (WORKSHOP)",
    description:
      "The most essential BNI workshop that gives members an overview of the tools, templates and systems designed to help them achieve success.",
    learningObjectives:
      "To understand how referrals work and how you can get a return on your investment by moving up the Referral Confidence Curve. To discuss the Five Fundamentals of the BNI System. And to appreciate the different tools available to you as BNI members and how they can help your business.",
    whoIsThisFor: [
      "New members",
      "Renewing members",
      "Members who have been red or lower for at least 2 straight months",
      "Members who have been yellow for more than 4 months",
    ],
  },
  {
    id: 3,
    title: "MEMBER SUCCESS WORKSHOP SERIES (MSWS)",
    description:
      "A comprehensive workshop series that dives deeper into BNI membership success strategies. Covers key topics that help members consistently perform and contribute to their chapter's growth.",
    learningObjectives:
      "To develop a deeper understanding of BNI systems and processes. To learn best practices for building strong one-to-one relationships. To apply effective weekly presentation techniques that generate more referrals.",
    whoIsThisFor: [
      "Members who have completed the basic MSP workshop",
      "Members seeking to improve their BNI performance",
      "Members who want to develop stronger chapter relationships",
      "Members targeting green or above status",
    ],
  },
  {
    id: 4,
    title: "ASWS: MAPPING YOUR SUCCESS (WORKSHOP)",
    description:
      "A focused workshop that helps BNI members create a clear roadmap for their success within BNI. Members will identify their goals, map out their path, and align their BNI activities with their business objectives.",
    learningObjectives:
      "To define clear personal and business goals within BNI. To create a actionable success roadmap tailored to your business. To align BNI activities with your specific business growth targets.",
    whoIsThisFor: [
      "Members who want a structured plan for BNI success",
      "Members transitioning from green to gold status",
      "Members who feel stuck and need a fresh direction",
      "Members preparing for leadership roles in the chapter",
    ],
  },
  {
    id: 5,
    title: "ASWS: POWER TEAM (WORKSHOP)",
    description:
      "A specialized workshop focused on building and leveraging Power Teams within BNI. Learn how to identify, build, and maximize relationships with complementary business professionals to dramatically increase referrals.",
    learningObjectives:
      "To understand the concept and value of a BNI Power Team. To identify ideal Power Team partners within and outside your chapter. To develop strategies for nurturing Power Team relationships that generate consistent referrals.",
    whoIsThisFor: [
      "Members who want to dramatically increase referral volume",
      "Members in industries with strong referral partner potential",
      "Chapter leaders looking to strengthen chapter performance",
      "Members who have completed MSWS",
    ],
  },
  {
    id: 6,
    title: "ADVANCED SKILLS WORKSHOP SERIES (ASWS)",
    description:
      "The pinnacle of BNI member training. This advanced series equips high-performing members with elite skills in networking, referral generation, and business development to achieve outstanding results in BNI and beyond.",
    learningObjectives:
      "To master advanced networking and referral techniques. To develop leadership skills that contribute to chapter and personal growth. To apply elite BNI strategies that consistently produce exceptional business results.",
    whoIsThisFor: [
      "High-performing members at gold status or above",
      "Members aspiring to chapter leadership positions",
      "Members who have completed all previous workshop series",
      "Members committed to achieving top-tier BNI results",
    ],
  },
];