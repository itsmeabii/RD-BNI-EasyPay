
import { useState } from "react";
import { UserNavigationSection } from "@/components/UserNavigationSection";
import { LT_NAV_ITEMS } from "@/constants/routes";
import TrainingTable from "@/components/TrainingTable";
import NewRequestModal from "@/components/NewRequestModal";
import { useTrainingRequest } from "@/hooks/useTrainingRequest";

export default function TrainingRequest() {
  const [showModal, setShowModal] = useState(false);
  const { request, addRequest } = useTrainingRequest();

  const handleSubmit = (data: {
    requestorName: string;
    trainingName: string;
    requestNote: string;
    proposedDate: string;
    chapter: string;
    attendees: number;
  }) => {
    addRequest({
      requestorName: data.requestorName,
      trainingName: data.trainingName,
      requestNote: data.requestNote,
      proposedDate: data.proposedDate,
      chapter: data.chapter,
      attendees: data.attendees,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1 className="text-[#CF2031] font-inter text-[25px] font-bold leading-none">
          Training Request
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#CF2031] text-white font-inter font-bold text-base px-6 py-3 rounded-2xl shadow-md hover:bg-[#b01c2a] transition-colors"
        >
          + New Request
        </button>
      </div>

      <TrainingTable
        requests={request}
        onNewRequest={() => setShowModal(true)}
      />

      {showModal && (
        <NewRequestModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
