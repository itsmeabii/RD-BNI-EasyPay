import { useState } from "react";
import { X } from "lucide-react";
import { Trainer } from "@/types/TrainerTypes";
import { addTrainer } from "@/lib/utils/Trainer/TrainerUtils";
import { Dropdown } from "../Dropdown";
import { PREFERRED_CATEGORY } from "@/constants/Trainer";
import { ConfirmModal } from "../ConfirmModal";
import { FormInput } from "../FormInput";

type AddTrainerModalProps = {
  onClose: () => void;
  onAdd: (trainer: Trainer) => void;
};

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

export function AddTrainerModal({ onClose, onAdd }: AddTrainerModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    chapter: "",
    preferredCategory: "",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false); 


  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.chapter) newErrors.chapter = "Chapter is required";
    if (!form.preferredCategory)
      newErrors.preferredCategory = "Preferred training is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAdd() {
    if (!validate()) return;
    setSaving(true);
    const trainer = await addTrainer(form);
    if (trainer) {
      onAdd(trainer);
      onClose();
    }
    setSaving(false);
  }

  return (

    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-[49]" onClick={onClose} />
      {/* Side Drawer */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-xl z-[50] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Add Trainer Information
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
          <FormInput
            label="First Name"
            placeholder="John"
            required
            value={form.firstName}
            onChange={(val) => handleChange("firstName", val)}
            error={errors.firstName}
          />         
          </div>

          <div className="flex flex-col gap-1">
            <FormInput
              label="Last Name"
              placeholder="Doe"
              required
              value={form.lastName}
              onChange={(val) => handleChange("lastName", val)}
              error={errors.lastName}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
             <Dropdown
              label="Chapter"
              required
              placeholder="Select Chapter"
              options={CHAPTERS}
              value={form.chapter}
              onChange={(val) => handleChange("chapter", val)}
              error={errors.chapter}
              className="border rounded-lg px-3 py-2 text-md border-gray-300"
              optionClassName="text-md"
            />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-md text-gray-500 font-semibold">Preferred Training</label>
              <Dropdown
                className={`border rounded-lg px-3 py-2 text-md ${errors.preferredCategory ? "border-red-400" : "border-gray-300"}`}
                optionClassName="text-md"
                value={form.preferredCategory}
                placeholder="Select Category"
                options={PREFERRED_CATEGORY}
                onChange={(val) => handleChange("preferredCategory", val)}
              />
              {errors.preferredCategory && <p className="text-xs text-red-400">{errors.preferredCategory}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md text-gray-500 font-semibold">List of attended records</label>
            {/* 👈 placeholder for future implementation */}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={handleAdd}
            disabled={saving}
            className="flex-1 bg-bni-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Trainer"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
      {/* Confirm Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Add Trainer?"
          description="Are you sure you want to add this trainer?"
          cancelLabel="Cancel"
          confirmLabel="Add Trainer"
          onConfirm={handleAdd}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
