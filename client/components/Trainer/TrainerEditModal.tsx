import { useState } from "react";
import { X } from "lucide-react";
import { Trainer } from "@/types/TrainerTypes";
import { updateTrainer, deleteTrainer } from "@/lib/utils/TrainerUtils";
import { Dropdown } from "@/components/Dropdown";
import { AVAILABILITY, PREFERRED_CATEGORY } from "@/constants/Trainer";
import { ConfirmModal } from "../ConfirmModal";
import { FormInput } from "../FormInput";

const CHAPTERS = [
  "All-Star",
  "RISE",
  "Dynamic",
  "Elite",
  "Iconic",
  "Traillazer",
  "Dauntless",
  "Gear",
  "GRit",
];
type TrainerEditModalProps = {
  trainer: Trainer;
  onClose: () => void;
  onSave: (updated: Trainer) => void;
  onDelete: (id: number) => void;
};

export function TrainerEditModal({ trainer, onClose, onSave, onDelete }: TrainerEditModalProps) {
  const [form, setForm] = useState({
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    chapter: trainer.chapter,
    preferredCategory: trainer.preferredCategory,
    availability: trainer.availability ?? "",
    image: trainer.image,
  });
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    const success = await updateTrainer(trainer.id, form);
    if (success) {
      onSave({ ...trainer, ...form });
      onClose();
    }
    setSaving(false);
    setShowSaveConfirm(false);
  }

  async function handleDelete() {
    setDeleting(true);
    const success = await deleteTrainer(trainer.id);
    if (success) {
      onDelete(trainer.id);
      onClose();
    }
    setDeleting(false);
    setShowDeleteConfirm(false);
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-[49]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[50] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Edit Trainer</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                required
                value={form.firstName}
                onChange={(val) => handleChange("firstName", val)}
                inputClassName="text-sm"
              />
              <FormInput
                label="Last Name"
                required
                value={form.lastName}
                onChange={(val) => handleChange("lastName", val)}
                inputClassName="text-sm"
              />
            </div>

            <Dropdown
              label="Chapter"
              required
              value={form.chapter}
              options={CHAPTERS}
              onChange={(val) => handleChange("chapter", val)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              optionClassName="text-sm"
            />

            <Dropdown
              label="Preferred Training"
              required
              value={form.preferredCategory}
              options={PREFERRED_CATEGORY}
              onChange={(val) => handleChange("preferredCategory", val)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />

            <Dropdown
              label="Availability"
              value={form.availability}
              options={AVAILABILITY}
              onChange={(val) => handleChange("availability", val)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex items-center justify-between gap-3">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm text-bni-red hover:underline font-semibold"
            >
              Remove Trainer
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSaveConfirm(true)}
                className="px-4 py-2 text-sm bg-bni-red text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSaveConfirm && (
        <ConfirmModal
          title="Save Changes?"
          description="Are you sure you want to update this trainer's details?"
          cancelLabel="Cancel"
          confirmLabel="Save Changes"
          onConfirm={handleSave}
          onCancel={() => setShowSaveConfirm(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          title="Remove Trainer?"
          description="Are you sure you want to remove this trainer?"
          cancelLabel="Cancel"
          confirmLabel="Remove"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}