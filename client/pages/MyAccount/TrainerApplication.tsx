import { useState, useRef } from "react";

const chapters = [
  "All-Star", "Catalyst", "Dauntless", "Dynamic", "Elite", "Empire",
  "Gear", "GRiT", "Iconic", "RISE", "Trailblazer", "BNI Taguig Admin",
  "Guests", "Sponsor",
];

const trainings = [
  "Business Strategy and Training",
  "Entrepreneurship Fundamentals",
];

export default function TrainerApplication() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [chapter, setChapter] = useState("");
  const [training, setTraining] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFirstName(""); setLastName(""); setChapter(""); setTraining("");
    setDescription(""); setFile(null); setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateFile = (f: File) => {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type))
      return "Invalid file type. Only JPG, JPEG, and PNG are allowed.";
    if (f.size > 2 * 1024 * 1024)
      return "File is too large. Maximum size is 2MB.";
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const err = validateFile(selected);
    if (err) {
      setErrors((p) => ({ ...p, file: err }));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setErrors((p) => { const { file, ...rest } = p; return rest; });
      setFile(selected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!chapter) newErrors.chapter = "Please select a chapter";
    if (!training) newErrors.training = "Please select a training";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!file) newErrors.file = "Please upload a formal picture";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setShowModal(true);
  };

  const ErrorMsg = ({ msg }: { msg?: string }) =>
    msg ? <span className="text-[#CF2031] text-[10px] font-bold mt-1 pl-2">{msg}</span> : null;

  return (
    <>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <div className="bg-white w-[90%] max-w-[400px] rounded-[15px] shadow-2xl p-8 flex flex-col items-center text-center">
            <p className="text-[#1E1E1E] text-lg font-medium leading-tight mb-6">
              Your request has been sent.<br />Please wait for approval.
            </p>
            <button
              onClick={() => { setShowModal(false); resetForm(); }}
              className="text-[#CF2031] text-xl font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-[#CF2031] text-[30px] font-bold">
          Trainer Application
        </h1>

        <div className="bg-white rounded-[10px] border border-black shadow-[inset_0_0_0_4px_rgba(207,32,49,0.25)] p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left column */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-black text-[12px] pl-2">First Name</label>
                  <input
                    type="text" placeholder="Jane Marie" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full h-[42px] rounded-[10px] border ${errors.firstName ? "border-red-500" : "border-[#D9D9D9]"} bg-[#D9D9D9] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] px-5 focus:outline-none focus:border-[#CF2031]`}
                  />
                  <ErrorMsg msg={errors.firstName} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-black text-[12px] pl-2">Last Name</label>
                  <input
                    type="text" placeholder="Doe" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full h-[42px] rounded-[10px] border ${errors.lastName ? "border-red-500" : "border-[#D9D9D9]"} bg-[#D9D9D9] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] px-5 focus:outline-none focus:border-[#CF2031]`}
                  />
                  <ErrorMsg msg={errors.lastName} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-black text-[12px] pl-2">Chapter</label>
                  <select
                    value={chapter} onChange={(e) => setChapter(e.target.value)}
                    className={`w-full h-[40px] rounded-[10px] border ${errors.chapter ? "border-red-500" : "border-[#999]"} bg-white shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] px-3 text-[15px] appearance-none focus:outline-none cursor-pointer`}
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ErrorMsg msg={errors.chapter} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-black text-[12px] pl-2">Preferred Training</label>
                  <select
                    value={training} onChange={(e) => setTraining(e.target.value)}
                    className={`w-full h-[40px] rounded-[10px] border ${errors.training ? "border-red-500" : "border-[#999]"} bg-white px-3 text-[15px] appearance-none focus:outline-none cursor-pointer`}
                  >
                    <option value="">Select Training</option>
                    {trainings.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ErrorMsg msg={errors.training} />
                </div>

                <div className="mt-4">
                  <button type="submit" className="w-full h-[48px] rounded-[10px] bg-[#CF2031] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] text-white text-[15px] font-bold hover:bg-[#b51c2b] active:scale-[0.98] transition-all">
                    Send Application
                  </button>
                </div>
              </div>

              {/* Right column */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-black text-[12px] pl-2">Upload a Formal Picture</label>
                  <div className={`w-full h-[196px] rounded-[5px] border-2 border-dashed ${errors.file ? "border-red-500 bg-red-50" : "border-[#999] bg-white"} flex flex-col items-center justify-center gap-3`}>
                    <div className="text-[#817E7E] text-[10px] text-center">
                      <p>Max file size: 2MB</p>
                      <p>File format: .jpg, .jpeg, .png</p>
                    </div>
                    <div className="w-[254px]">
                      <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" id="formalPicture" />
                      <label htmlFor="formalPicture" className="block w-full h-[36px] rounded-[5px] border border-[#999] bg-[#D9D9D9] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] text-center leading-[36px] text-black text-[13px] italic cursor-pointer hover:bg-[#c9c9c9]">
                        {file ? file.name : "Browse File"}
                      </label>
                    </div>
                  </div>
                  <ErrorMsg msg={errors.file} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-black text-[12px] pl-2">Brief Description</label>
                  <div className="relative">
                    <textarea
                      value={description}
                      onChange={(e) => e.target.value.length <= 500 && setDescription(e.target.value)}
                      className={`w-full h-[137px] rounded-[5px] border ${errors.description ? "border-red-500" : "border-[#999]"} bg-[#D9D9D9] shadow-[inset_4px_4px_4px_rgba(0,0,0,0.25)] p-3 text-[15px] resize-none focus:outline-none`}
                    />
                    <span className="absolute bottom-2 right-2 text-[#817E7E] text-[10px]">{description.length}/500</span>
                  </div>
                  <ErrorMsg msg={errors.description} />
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}