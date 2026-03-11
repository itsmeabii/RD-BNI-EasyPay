import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/Client";
import { Search, ChevronDown, X, ArrowUp, ArrowDown } from "lucide-react";

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === "—") return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
}

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
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const { data } = await supabase
        .from("tr_trainings")
        .select("image_path")
        .eq("name", req.training.trim())
        .maybeSingle();
      if (data?.image_path) setImage(data.image_path);
    }
    fetchImage();
  }, [req.training]);

  const description = req.trainingDescription || "—";

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
  const [dateSort, setDateSort] = useState<"" | "asc" | "desc">("");
  const [chapters, setChapters] = useState<string[]>([]);
  useEffect(() => {
    async function fetchDropdownData() {
      const [chaptersRes] = await Promise.all([
        supabase.from("chapters").select("name").order("name"),
      ]);
      if (chaptersRes.data) setChapters(chaptersRes.data.map((c: { name: string }) => c.name));
    }
    fetchDropdownData();
  }, []);

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
    const matchesDate = !dateFilter || (() => {
      const d = new Date(r.proposedDate);
      if (isNaN(d.getTime())) return false;
      return d.toLocaleString("default", { month: "long" }) === dateFilter;
    })();
    return matchesSearch && matchesCategory && matchesChapter && matchesDate;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!dateSort) return 0;
    const dateA = new Date(a.proposedDate).getTime();
    const dateB = new Date(b.proposedDate).getTime();
    return dateSort === "asc" ? dateA - dateB : dateB - dateA;
  });

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const categories = ["ASWS", "CDWS", "MSP", "MSWS", "NO"];

  return (
    <div className="flex-1 min-w-0">
      {/* Search and filters */}
      <div className="flex items-center gap-2 mb-4 w-full">
        <div className="relative flex-1 min-w-0">
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
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 max-h-60 overflow-y-auto">
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
                <th className="text-white font-extrabold text-xs py-4 px-3 text-center border-r border-[#817E7E] whitespace-nowrap">
                  <button
                    className="flex items-center gap-1 mx-auto hover:opacity-70 transition-opacity"
                    onClick={() => setDateSort((v) => v === "" ? "desc" : v === "desc" ? "asc" : "")}
                  >
                    Proposed Date
                    {dateSort === "" && <span className="flex flex-col"><ArrowUp className="w-2.5 h-2.5 -mb-0.5" /><ArrowDown className="w-2.5 h-2.5" /></span>}
                    {dateSort === "desc" && <ArrowDown className="w-3 h-3" />}
                    {dateSort === "asc" && <ArrowUp className="w-3 h-3" />}
                  </button>
                </th>
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
                    <td className="py-4 px-3 text-center text-xs text-[#212121] border-r border-[#817E7E] whitespace-nowrap">{formatDate(req.proposedDate)}</td>
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
