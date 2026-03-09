import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";

export type RequestStatus = "Approved" | "Declined" | "Pending";

export interface TrainingRequest {
  id: string;
  ltName: string;
  category: string;
  training: string;
  trainingDescription: string;
  chapter: string;
  proposedDate: string;
  attendees: number;
  trainer: string | null;
  status: RequestStatus;
  requestNote: string;
  requestedAt: string;
  timeApproved: string;
}

const TRAINING_DATA: Record<string, { category: string; description: string; image: string }> = {
  "Presentation Skills": {
    category: "ASWS",
    description: "Master the art of delivering impactful presentations. Learn storytelling techniques, slide design principles, and public speaking skills to engage and persuade any audience.",
    image: "/Easypay/ASWS Presentation Skills.png",
  },
  "Member Success Program": {
    category: "MSP",
    description: "Unlock the full potential of your BNI membership. Discover proven strategies to maximize referrals, build strong business relationships, and accelerate your business growth.",
    image: "/Easypay/Member Success Program.png",
  },
  "BNI Taguig Training Certification Program": {
    category: "MSP",
    description: "Comprehensive certification covering MSP TCP, MSWS TCP, and ASWS TCP. Gain official BNI certification and deepen your expertise across all core training modules.",
    image: "/Easypay/BNI Taguig Training Certification Program.png",
  },
  "Member Success Workshop Series": {
    category: "MSWS",
    description: "An intensive workshop series designed to help members build lasting habits for BNI success. Includes hands-on exercises, group discussions, and personalized action plans.",
    image: "/Easypay/MSWS Member Success Workshop Series .png",
  },
  "Advanced Presentation Workshop": {
    category: "ASWS",
    description: "Take your presentation skills to the next level. This advanced workshop covers complex storytelling, handling tough Q&A sessions, and presenting to C-suite executives.",
    image: "/Easypay/ASWS Advanced Presentation Workshop.png",
  },
  "Networking Mastery Program": {
    category: "ASWS",
    description: "Learn the science and art of professional networking. Build genuine connections, nurture relationships, and create a referral engine that fuels exponential business growth.",
    image: "/Easypay/Networking Mastery Program.png",
  },
  "Leadership Excellence Training": {
    category: "ASWS",
    description: "Develop the leadership qualities that drive chapter success. From running effective meetings to inspiring your team, this training equips you with essential leadership tools.",
    image: "/Easypay/Leadership Excellence Training.png",
  },
  "MSP Advanced Member Strategies": {
    category: "MSP",
    description: "An advanced continuation of the Member Success Program, focusing on high-level referral strategies, chapter leadership techniques, and long-term membership retention.",
    image: "/Easypay/MSP Advanced Member Strategies .png",
  },
};

function lookupTraining(name: string) {
  const trimmed = name.trim();
  if (TRAINING_DATA[trimmed]) return TRAINING_DATA[trimmed];
  const key = Object.keys(TRAINING_DATA).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase()
  );
  return key ? TRAINING_DATA[key] : undefined;
}

const CHAPTERS = [
  "All-Star", "Catalyst", "Dauntless", "Dynamic", "Elite",
  "Empire", "Gear", "GRiT", "Iconic", "RISE", "Trailblazer",
  "BNI Taguig Admin", "Guests", "Sponsor",
];

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles: Record<RequestStatus, string> = {
    Approved: "text-[#008000] font-bold text-[15px]",
    Declined: "text-[#FF2C2C] font-bold text-[15px]",
    Pending:  "text-[#808080] font-bold text-[15px]",
  };
  return <span className={styles[status]}>{status}</span>;
}

function TrainerCell({ trainer }: { trainer: string | null }) {
  if (!trainer) {
    return (
      <span className="text-[#212121] text-xs text-center leading-tight">
        No assigned Trainer
      </span>
    );
  }
  return (
    <div className="flex items-center gap-1 justify-center">
      <div className="w-5 h-5 rounded-full bg-[#D9D9D9] flex items-center justify-center overflow-hidden shrink-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/125a807543a50828071c622b450b4c90e9fc4508?width=30"
          alt="trainer"
          className="w-4 h-4 object-cover"
        />
      </div>
      <span className="text-[#212121] text-xs">{trainer}</span>
    </div>
  );
}

function TrainingDetailsPanel({ req, onClose }: { req: TrainingRequest; onClose: () => void }) {
  console.log("🔍 training name from row:", JSON.stringify(req.training));
  console.log("🔍 TRAINING_DATA keys:", Object.keys(TRAINING_DATA));
  const matched = lookupTraining(req.training);
  console.log("🔍 matched:", matched);
  const description = matched?.description ?? "—";
  const image = matched?.image ?? null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-[460px] bg-white flex flex-col h-full shadow-2xl overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 shrink-0">
          <h2 className="text-[20px] font-bold text-gray-900">Training Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Thumbnail */}
        <div className="flex justify-center px-7 pb-5 shrink-0">
          <div className="w-[200px] h-[160px] rounded-[8px] overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={req.training}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement!;
                  parent.className = "w-[200px] h-[160px] rounded-[8px] bg-gradient-to-br from-[#8B0000] to-[#CF2031] flex flex-col items-center justify-center text-white p-4 text-center";
                  parent.innerHTML = `<p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;opacity:0.8;margin-bottom:4px">${req.category}</p><p style="font-size:15px;font-weight:700;line-height:1.3">${req.training}</p>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#CF2031] flex flex-col items-center justify-center text-white p-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1 opacity-80">{req.category}</p>
                <p className="text-[15px] font-bold leading-snug">{req.training}</p>
              </div>
            )}
          </div>
        </div>

        {/* Details body */}
        <div className="flex-1 px-7 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Training Title</p>
              <p className="text-[14px] font-bold text-[#CF2031]">{req.training}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Request ID</p>
              <p className="text-[13px] font-semibold text-gray-800">{req.id.replace("RQ-", "RQ - ")}</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Category</p>
            <p className="text-[13px] text-gray-800">{req.category}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Training Description</p>
            <p className="text-[13px] text-gray-700 leading-relaxed">{description}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Request Note</p>
            <p className="text-[13px] text-gray-700 leading-relaxed">{req.requestNote || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Leadership Team Name</p>
            <p className="text-[13px] text-gray-800">{req.ltName}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Chapter</p>
            <p className="text-[13px] text-gray-800">{req.chapter}</p>
          </div>
        </div>

        {/* Bottom date bar */}
        <div className="mx-7 mb-7 mt-5 rounded-[10px] bg-[#F4F4F4] border border-[#E0E0E0] px-5 py-4 flex justify-between shrink-0">
          <div>
            <p className="text-[10px] font-bold text-gray-600 mb-1">Requested At</p>
            <p className="text-[12px] text-gray-800 font-medium">{req.requestedAt || "—"}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-600 mb-1">Time Approved</p>
            <p className="text-[12px] text-gray-800 font-medium">{req.timeApproved || "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-600 mb-1">Proposed Date</p>
            <p className="text-[12px] text-gray-800 font-medium">{req.proposedDate || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TrainingTableProps {
  requests: TrainingRequest[];
  onNewRequest: () => void;
}

export default function TrainingTable({ requests, onNewRequest }: TrainingTableProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [chapterFilter, setChapterFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showChapterDropdown, setShowChapterDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TrainingRequest | null>(null);

  const TRAINING_MONTH: Record<string, string> = {
    "Advanced Presentation Workshop": "January",
    "Presentation Skills": "January",
    "BNI Taguig Training Certification Program": "January",
    "Leadership Excellence Training": "February",
    "Member Success Program": "February",
    "MSP Advanced Member Strategies": "March",
    "Member Success Workshop Series": "March",
    "Networking Mastery Program": "April",
  };

  const filtered = requests.filter((r) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      r.id.toLowerCase().includes(searchLower) ||
      r.category.toLowerCase().includes(searchLower) ||
      r.chapter.toLowerCase().includes(searchLower) ||
      r.ltName.toLowerCase().includes(searchLower);
    const matchesCategory = !categoryFilter || r.category === categoryFilter;
    const matchesChapter = !chapterFilter || r.chapter === chapterFilter;
    const matchesDate = !dateFilter || TRAINING_MONTH[r.training.trim()] === dateFilter;
    return matchesSearch && matchesCategory && matchesChapter && matchesDate;
  });

  const sorted = [...filtered];

  const MONTHS = ["January", "February", "March", "April"];

  const categories = ["ASWS", "CDWS", "MSP", "MSWS", "NO"];
  const chapters = CHAPTERS;

  return (
    <div className="flex-1 min-w-0">
      {/* Search and filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search for categories, chapter, registrant ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[53px] pl-5 pr-12 rounded-[10px] border border-[#D9D9D9] bg-white shadow-inner text-[#817E7E] italic text-sm focus:outline-none focus:border-[#CF2031]"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#817E7E]" />
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowCategoryDropdown((v) => !v); setShowChapterDropdown(false); setShowDateDropdown(false); }}
            className="flex items-center gap-2 h-[53px] px-4 rounded-[10px] border border-[#D9D9D9] bg-white shadow text-[#817E7E] font-semibold text-sm whitespace-nowrap"
          >
            {categoryFilter || "Categories"}
            <ChevronDown className="w-4 h-4" />
          </button>
          {showCategoryDropdown && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
              <button className="block w-full text-left px-4 py-2 text-sm text-[#817E7E] hover:bg-gray-50" onClick={() => { setCategoryFilter(""); setShowCategoryDropdown(false); }}>All</button>
              {categories.map((c) => (
                <button key={c} className="block w-full text-left px-4 py-2 text-sm text-[#817E7E] hover:bg-gray-50" onClick={() => { setCategoryFilter(c); setShowCategoryDropdown(false); }}>{c}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowChapterDropdown((v) => !v); setShowCategoryDropdown(false); setShowDateDropdown(false); }}
            className="flex items-center gap-2 h-[53px] px-4 rounded-[10px] border border-[#D9D9D9] bg-white shadow text-[#817E7E] font-semibold text-sm whitespace-nowrap"
          >
            {chapterFilter || "Chapter"}
            <ChevronDown className="w-4 h-4" />
          </button>
          {showChapterDropdown && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
              <button className="block w-full text-left px-4 py-2 text-sm text-[#817E7E] hover:bg-gray-50" onClick={() => { setChapterFilter(""); setShowChapterDropdown(false); }}>All</button>
              {chapters.map((c) => (
                <button key={c} className="block w-full text-left px-4 py-2 text-sm text-[#817E7E] hover:bg-gray-50" onClick={() => { setChapterFilter(c); setShowChapterDropdown(false); }}>{c}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowDateDropdown((v) => !v); setShowCategoryDropdown(false); setShowChapterDropdown(false); }}
            className="flex items-center gap-2 h-[53px] px-4 rounded-[10px] border border-[#D9D9D9] bg-white shadow text-[#817E7E] font-semibold text-sm whitespace-nowrap"
          >
            {dateFilter || "Month"}
            <ChevronDown className="w-4 h-4" />
          </button>
          {showDateDropdown && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 max-h-60 overflow-y-auto">
              <button className="block w-full text-left px-4 py-2 text-sm text-[#817E7E] hover:bg-gray-50" onClick={() => { setDateFilter(""); setShowDateDropdown(false); }}>All</button>
              {MONTHS.map((m) => (
                <button key={m} className="block w-full text-left px-4 py-2 text-sm text-[#817E7E] hover:bg-gray-50" onClick={() => { setDateFilter(m); setShowDateDropdown(false); }}>{m}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-black rounded-[10px] overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#CF2031]">
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Request ID</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Leadership Team Name (LT)</th>
                <th className="text-white font-[500] text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Category</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Training</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Chapter</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Proposed Date</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">No. of Attendees</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">Trainer</th>
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center whitespace-nowrap">Request Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#817E7E] text-sm">
                    No training request yet. Click{" "}
                    <button onClick={onNewRequest} className="text-[#CF2031] underline font-semibold">
                      + New Request
                    </button>{" "}
                    to get started.
                  </td>
                </tr>
              ) : (
                sorted.map((req, idx) => (
                  <tr key={req.id} className={idx < sorted.length - 1 ? "border-b border-[#817E7E]" : ""}>
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E]">{req.id}</td>
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E]">{req.ltName}</td>
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E]">{req.category}</td>
                    <td className="py-4 px-3 text-center text-xs border-r border-[#817E7E] whitespace-nowrap">
                      <button
                        className="text-[#3F67EB] underline font-medium hover:opacity-80 text-xs"
                        onClick={() => setSelectedRequest(req)}
                      >
                        View Training
                      </button>
                    </td>
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E] whitespace-nowrap">{req.chapter}</td>
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E] whitespace-nowrap">{req.proposedDate}</td>
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E] whitespace-nowrap">{req.attendees}</td>
                    <td className="py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap"><TrainerCell trainer={req.trainer} /></td>
                    <td className="py-4 px-3 text-center whitespace-nowrap"><StatusBadge status={req.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <TrainingDetailsPanel req={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </div>
  );
}
