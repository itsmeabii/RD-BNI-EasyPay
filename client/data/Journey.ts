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
    "id":1,
    "title":"MEMBER SUCCESS PROGRAM VERSION 2.0 (BUSINESS BUILDER)"
  },
  {
    "id":2,
    "title":"MEMBER SUCCESS PROGRAM (WORKSHOP)"
  },
  {
    "id":3,
    "title":"MEMBER SUCCESS WORKSHOP SERIES (MSWS)"
  },
  {
    "id":4,
    "title":"ASWS: MAPPING YOUR SUCCESS (WORKSHOP)"
  },
  {
    "id":5,
    "title":"ASWS: POWER TEAM (WORKSHOP)"
  },
  {
    "id":6,
    "title":"ADVANCED SKILLS WORKSHOP SERIES (ASWS)"
  },
];