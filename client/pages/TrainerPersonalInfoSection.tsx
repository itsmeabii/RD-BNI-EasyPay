import { useState } from "react";

export const TrainerPersonalInfoSection = (): JSX.Element => {
  const [firstName, setFirstName] = useState("Jane Marie");
  const [lastName, setLastName] = useState("Doe");
  const [chapter, setChapter] = useState("");
  const [training, setTraining] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-5"
    >
      {/* First Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="firstName"
          className="pl-1 text-xs text-black"
        >
          First Name
        </label>

        <div className="bg-[#d9d9d9] rounded-lg border shadow-inner px-4 py-2">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-[#817d7d]"
            placeholder="Jane Marie"
          />
        </div>
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="lastName"
          className="pl-1 text-xs text-black"
        >
          Last Name
        </label>

        <div className="bg-[#d9d9d9] rounded-lg border shadow-inner px-4 py-2">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-[#817d7d]"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Chapter */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="chapter"
          className="pl-1 text-xs text-black"
        >
          Chapter
        </label>

        <div className="rounded-lg border border-[#999999] shadow-inner px-3 py-2">
          <select
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-[#817d7d] cursor-pointer"
          >
            <option value="">Select Chapter</option>
          </select>
        </div>
      </div>

      {/* Preferred Training */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="training"
          className="pl-1 text-xs text-black"
        >
          Preferred Training
        </label>

        <div className="rounded-lg border border-[#999999] px-3 py-2">
          <select
            id="training"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-[#817d7d] cursor-pointer"
          >
            <option value="">Select Training</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 py-3 bg-[#cf2031] rounded-lg shadow-md flex items-center justify-center font-bold text-white text-sm hover:bg-[#b01b2a] transition-colors"
      >
        Send Application
      </button>
    </form>
  );
};