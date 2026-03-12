import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/Client";
import { X, ArrowUp, ArrowDown } from "lucide-react";
import { SearchAndFilters } from "@/constants/SearchAndFilter";
import type { RequestStatus } from "@/constants/Training";
import type { TrainingRequest } from "@/types/TrainingTypes";
import { MONTHS } from "@/constants/Training";
import { categories } from "@/constants/Training";


function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === "—") return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
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
        .from("trainings")
        .select("thumbnail")
        .eq("title", req.training.trim())
        .maybeSingle();
      if (data?.thumbnail) setImage(data.thumbnail);
    }
    fetchImage();
  }, [req.training]);

  const description = req.trainingDescription || "No Description Available";

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
              <p className="text-[13px] font-semibold text-gray-800">{req.id}</p>
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
            <p className="text-[13px] text-gray-700 leading-relaxed">{req.requestNote}</p>
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
            <p className="text-[12px] text-gray-800 font-medium">{req.requestedAt}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-600 mb-1">Time Approved</p>
            <p className="text-[12px] text-gray-800 font-medium">{req.timeApproved}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-600 mb-1">Proposed Date</p>
            <p className="text-[12px] text-gray-800 font-medium">{req.proposedDate}</p>
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

  return (
    <div className="flex-1 min-w-0">
      {/* Search and filters */}
      <div className="mb-4 w-full">
        <SearchAndFilters
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search for categories, chapter, registrant ID"
          dropdowns={[
            {
              value: categoryFilter,
              onChange: setCategoryFilter,
              placeholder: "Categories",
              width: "w-[155px]",
              options: categories.map((c) => ({ label: c, value: c })),
            },
            {
              value: chapterFilter,
              onChange: setChapterFilter,
              placeholder: "Chapter",
              width: "w-[155px]",
              options: chapters.map((c) => ({ label: c, value: c })),
              scrollable: true,
            },
            {
              value: dateFilter,
              onChange: setDateFilter,
              placeholder: "Month",
              width: "w-[140px]",
              options: MONTHS.map((m) => ({ label: m, value: m })),
              scrollable: true,
            },
          ]}
        />
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
