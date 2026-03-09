import { useState } from "react";
import { X } from "lucide-react";

const CHAPTERS = [
  "All-Star",
  "Catalyst",
  "Dauntless",
  "Dynamic",
  "Elite",
  "Empire",
  "Gear",
  "GRiT",
  "Iconic",
  "RISE",
  "Trailblazer",
  "BNI Taguig Admin",
  "Guests",
  "Sponsor",
];

interface NewRequestModalProps {
  onClose: () => void;
  onSubmit: (data: {
    requestorName: string;
    requestId: string;
    trainingName: string;
    requestNote: string;
    proposedDate: string;
    chapter: string;
    attendees: number;
  }) => void;
  nextId: string;
}

const INITIAL_FORM = {
  requestorName: "",
  trainingName: "",
  requestNote: "",
  proposedDate: "",
  chapter: "",
  attendees: 15,
};

const fieldClass =
  "w-full rounded-[6px] px-3 py-[6px] text-[13.5px] text-gray-700 placeholder-gray-400 bg-white focus:outline-none border border-[#DEDEDE] shadow-[inset_0_2px_5px_rgba(0,0,0,0.12)]";

const labelClass = "block text-[12.5px] font-semibold text-gray-800 mb-[6px]";

export default function NewRequestModal({ onClose, onSubmit, nextId }: NewRequestModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingData, setPendingData] = useState<typeof form | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttendees = (delta: number) => {
    setForm((prev) => ({ ...prev, attendees: Math.max(1, prev.attendees + delta) }));
  };

  const handleSendRequest = () => {
    if (!isFormComplete) return;
    setPendingData({ ...form });
    setShowSuccess(true);
  };

  const handleOk = () => {
    if (!pendingData) return;
    onSubmit({
      requestorName: pendingData.requestorName,
      requestId: nextId,
      trainingName: pendingData.trainingName,
      requestNote: pendingData.requestNote,
      proposedDate: pendingData.proposedDate,
      chapter: pendingData.chapter,
      attendees: pendingData.attendees,
    });
    setForm(INITIAL_FORM);
    setPendingData(null);
    setShowSuccess(false);
    onClose();
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setPendingData(null);
    setShowSuccess(false);
    onClose();
  };

  const isFormComplete =
    form.requestorName.trim() !== "" &&
    form.trainingName.trim() !== "" &&
    form.requestNote.trim() !== "" &&
    form.proposedDate !== "" &&
    form.chapter.trim() !== "";

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left dim backdrop */}
      <div className="flex-1 bg-black/40" onClick={handleClose} />

      {/* RIGHT PANEL */}
      <div className="w-[415px] bg-white flex flex-col h-full shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 shrink-0">
          <h2 className="text-[21px] font-bold text-gray-900">Request Form</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-[22px] h-[22px]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-7 pb-16">
          <div className="flex flex-col gap-[18px]">

            {/* Requestor's Name + Request ID */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Requestor's Name:</label>
                <input
                  name="requestorName"
                  value={form.requestorName}
                  onChange={handleChange}
                  placeholder="Jane Marie Doe"
                  className={fieldClass}
                />
              </div>
              <div className="w-[138px]">
                <label className={labelClass}>Request ID</label>
                <input
                  value={nextId}
                  readOnly
                  className={`${fieldClass} text-gray-500 cursor-default`}
                />
              </div>
            </div>

            {/* Training Name */}
            <div>
              <label className={labelClass}>Training Name:</label>
              <input
                name="trainingName"
                value={form.trainingName}
                onChange={handleChange}
                placeholder="Add training name"
                className={fieldClass}
              />
            </div>

            {/* Request Note */}
            <div>
              <label className={labelClass}>Request Note:</label>
              <textarea
                name="requestNote"
                value={form.requestNote}
                onChange={handleChange}
                className="w-full rounded-[6px] px-3 py-[6px] text-[13.5px] text-gray-700 bg-white focus:outline-none resize-none overflow-y-scroll border border-[#DEDEDE] shadow-[inset_0_2px_5px_rgba(0,0,0,0.12)]"
                style={{ height: 162 }}
              />
            </div>

            {/* Proposed Date with Time + Chapter */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Proposed Date with Time:</label>
                <input
                  type="text"
                  name="proposedDate"
                  value={form.proposedDate}
                  onChange={handleChange}
                  onFocus={(e) => { (e.target as HTMLInputElement).type = "datetime-local"; }}
                  onBlur={(e) => { if (!(e.target as HTMLInputElement).value) (e.target as HTMLInputElement).type = "text"; }}
                  placeholder="Select date with time"
                  className={fieldClass}
                />
              </div>
              <div className="w-[138px]">
                <label className={labelClass}>Chapter:</label>
                <select
                  name="chapter"
                  value={form.chapter}
                  onChange={handleChange}
                  className={`${fieldClass} appearance-none cursor-pointer ${form.chapter === "" ? "text-gray-400" : "text-gray-700"}`}
                >
                  <option value="" disabled>Chapter</option>
                  {CHAPTERS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* No. of Attendees */}
            <div>
              <label className={labelClass}>No. of Attendees:</label>
              <div
                className="flex items-center rounded-[6px] border border-[#DEDEDE] overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.12)] bg-white"
                style={{ width: 155, height: 36 }}
              >
                <button
                  type="button"
                  onClick={() => handleAttendees(-1)}
                  className="w-[36px] h-full flex items-center justify-center text-gray-600 hover:bg-black/5 active:bg-black/10 transition-colors shrink-0 border-r border-[#DEDEDE]"
                >
                  <span className="text-[20px] font-light leading-none">−</span>
                </button>
                <span className="flex-1 text-center text-[15px] font-semibold text-gray-800 select-none">
                  {form.attendees}
                </span>
                <button
                  type="button"
                  onClick={() => handleAttendees(1)}
                  className="w-[36px] h-full flex items-center justify-center text-gray-600 hover:bg-black/5 active:bg-black/10 transition-colors shrink-0 border-l border-[#DEDEDE]"
                >
                  <span className="text-[20px] font-light leading-none">+</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="px-7 pb-10 pt-6 flex gap-3 shrink-0 items-center">
          <button
            type="button"
            onClick={handleSendRequest}
            disabled={!isFormComplete}
            className={`flex-1 font-bold py-[7px] rounded-[10px] text-[15px] tracking-wide transition-colors shadow-[0_3px_8px_rgba(0,0,0,0.25)] ${
              isFormComplete
                ? "bg-[#CF2031] hover:bg-[#b01c2a] text-white cursor-pointer"
                : "bg-[#CF2031] opacity-40 text-white cursor-not-allowed"
            }`}
          >
            Send Request
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-[138px] shrink-0 bg-[#D4D4D4] hover:bg-[#c0c0c0] text-[#555555] font-semibold py-[7px] rounded-[10px] text-[15px] transition-colors shadow-[0_3px_8px_rgba(0,0,0,0.20)]"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* SUCCESS DIALOG */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl px-12 py-9 flex flex-col items-center" style={{ minWidth: 320 }}>
            <p className="text-[15px] text-gray-800 text-center leading-relaxed mb-7">
              Your request has been sent.<br />
              Please wait for approval.
            </p>
            <button
              onClick={handleOk}
              className="text-[#CF2031] font-bold text-[16px] hover:opacity-70 transition-opacity"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
