// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface SuccessModalProps {
  onClose: () => void;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

const Backdrop = ({ onClick }: { onClick: () => void }) => (
  <div className="absolute inset-0 bg-black/40" onClick={onClick} />
);

const CheckIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Confirm Modal ────────────────────────────────────────────────────────────

export const ConfirmModal = ({ onConfirm, onCancel }: ConfirmModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <Backdrop onClick={onCancel} />
    <div className="relative bg-white rounded-[12px] shadow-xl px-10 py-8 w-[380px] flex flex-col gap-4">
      <h2 className="text-[22px] font-bold text-gray-900">Are you sure?</h2>
      <p className="text-[15px] text-gray-600">
        You are about to apply as a trainer for a custom training?
      </p>
      <div className="flex items-center justify-end gap-3 mt-2">
        <button
          onClick={onConfirm}
          className="px-5 py-2 bg-[#cf2031] text-white text-[14px] font-bold rounded-[6px] hover:bg-[#b51c2b] transition-colors"
        >
          Apply Now
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-gray-100 text-gray-700 text-[14px] font-semibold rounded-[6px] hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─── Success Modal ────────────────────────────────────────────────────────────

export const SuccessModal = ({ onClose }: SuccessModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <Backdrop onClick={onClose} />
    <div className="relative bg-white rounded-[12px] shadow-xl px-10 py-8 w-[420px] flex flex-col items-center gap-4 text-center">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
        <CheckIcon />
      </div>
      <h2 className="text-[22px] font-bold text-gray-900">Success!</h2>
      <p className="text-[14px] text-gray-600 leading-relaxed">
        Your trainer application for custom training has been submitted
        successfully. Please check the training status on the Training
        Management page.
      </p>
      <button
        onClick={onClose}
        className="mt-2 px-8 py-2 text-[#cf2031] text-[15px] font-bold hover:underline transition-colors"
      >
        OK
      </button>
    </div>
  </div>
);