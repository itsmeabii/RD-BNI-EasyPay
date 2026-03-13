interface EditTrainerModalProps {
  onEdit: () => void;
  onClose: () => void;
}

export const EditTrainerModal = ({ onEdit, onClose }: EditTrainerModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-xl w-[300px] p-6 flex flex-col gap-4">
        <h2 className="text-[16px] font-bold text-gray-800 text-center">Trainer Options</h2>
        <button
          onClick={onEdit}
          className="w-full py-3 bg-[#cf2031] text-white font-bold rounded-[8px] hover:bg-[#b01c2a] transition-colors"
        >
          Edit Trainer
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-[8px] hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};