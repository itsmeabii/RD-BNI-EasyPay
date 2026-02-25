import { CloudUpload } from "lucide-react";
import ZigzagBorder from "./ZigzagBorder";
import { useCallback, useRef, useState } from "react";
import { peso } from "./OrderSummaryPanel";
import { OrderState } from "@/data/Checkout";
import { CartItem } from "@/context/CartContext";

interface OrderSummaryBarProps {
  orderNum: string;
  date: string;
  order: Pick<OrderState, "total" | "payMethod">;
}

export function OrderSummaryBar({ orderNum, date, order }: OrderSummaryBarProps) {
  const orderSummaryBarItems: { id: string; title: string; detail: string }[] = [
    { id: "order-number",   title: "Order Number:",   detail: orderNum },
    { id: "date",           title: "Date:",           detail: date },
    { id: "total",          title: "Total:",          detail: peso(order.total) },
    { id: "payment-method", title: "Payment Method:", detail: order.payMethod === "bank" ? "Direct Bank Transfer" : "Pay via Paynamics" },
  ];

  return (
    <div className="flex border border-gray-200 rounded-xl overflow-hidden mb-8 bg-white">
      {orderSummaryBarItems.map(({ id, title, detail }, index) => (
        <div
          key={id}
          className={`flex-1 min-w-[120px] px-5 py-3.5 ${index < orderSummaryBarItems.length - 1 ? "border-r border-gray-200" : ""}`}
        >
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{title}</div>
          <div className="text-sm font-extrabold text-gray-800 mt-1">{detail}</div>
        </div>
      ))}
    </div>
  );
}
interface OrderDetailsTableProps {
  items: CartItem[];
  order: Pick<OrderState, "payMethod" | "subtotal" | "total">;
}

export function OrderDetailsTable({ items, order }: OrderDetailsTableProps) {
  const payLabel = order.payMethod === "bank" ? "Direct Bank Transfer" : "Pay via paynamics";

  const orderSummaryRows = [
        { id: "payment-method", title: "Payment method:", detail: payLabel },
        { id: "shipping",       title: "Shipping:",       detail: "₱0.00" },
        { id: "subtotal",       title: "Subtotal:",       detail: peso(order.subtotal) },
      ];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div className="grid grid-cols-[1fr_auto] bg-gray-100 px-5 py-3 border-b border-gray-200">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Product</span>
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="px-5 py-4 text-sm text-gray-400 italic">No items found.</div>
      ) : (
        items.map(item => (
          <div key={item.id} className="grid grid-cols-[1fr_auto] px-5 py-3 border-b border-gray-100">
            <div>
              <span className="text-bni-red font-semibold text-sm block">{item.title}</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 self-center">
              {peso(item.price * (item.qty ?? 1))}
            </span>
          </div>
        ))
      )}

      {/* Spacer */}
      <div className="h-4 border-b border-gray-100 bg-gray-50" />

      {orderSummaryRows.map(({ id, title, detail }) => (
        <div key={id} className="grid grid-cols-[1fr_auto] px-5 py-2.5 border-b border-gray-100 bg-gray-50 text-sm">
          <span className="text-gray-400">{title}</span>
          <span className="text-black">{detail}</span>
        </div>
      ))}

      {/* Total */}
      <div className="grid grid-cols-[1fr_auto] px-5 py-3.5 bg-white">
        <span className="font-extrabold text-[15px] text-gray-800">Total:</span>
        <span className="font-extrabold text-[15px] text-bni-red">{peso(order.total)}</span>
      </div>
    </div>
  );
}

export function BankDetails() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
      <h2 className="font-extrabold text-xl text-bni-red mb-1">Our Bank Details</h2>
      <p className="text-[13px] text-gray-400 mb-4">Referal Partners Inc:</p>
      <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
        <div>
          <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Bank:</div>
          <div className="text-lg font-extrabold text-gray-800 mt-0.5">UnionBank</div>
        </div>
        <div className="w-px h-11 bg-gray-200 flex-shrink-0" />
        <div>
          <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Account Number:</div>
          <div className="text-[17px] font-extrabold text-gray-800 mt-0.5 tracking-widest">001970002065</div>
        </div>
      </div>
    </div>
  );
}

interface FileUploadZoneProps {
  file: File | null;
  onFile: (f: File) => void;
  onRemove: () => void;
}

export function FileUploadZone({ file, onFile, onRemove }: FileUploadZoneProps) {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    onFile(f);
    setPreview(f.type.startsWith("image/") ? URL.createObjectURL(f) : null);
  }, [onFile]);

  return (
    <div className="relative mb-10">
      {/* Upload box */}
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => !file && ref.current?.click()}
        className={`flex flex-col items-center justify-center min-h-[220px] rounded-t-md border-4 overflow-hidden transition-all cursor-pointer
          ${drag ? "border-bni-red bg-red-50" : "border-bni-red bg-white"}
        `}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {file ? (
          <div className="text-center p-6">
            {preview
              ? <img src={preview} alt="receipt" className="max-w-[170px] max-h-[130px] rounded-lg shadow-md mb-2.5 mx-auto" />
              : <div className="text-5xl mb-2.5">📄</div>}
            <p className="text-bni-red text-[13px] font-bold mb-2">{file.name}</p>
            <button
              onClick={e => { e.stopPropagation(); onRemove(); setPreview(null); }}
              className="text-gray-300 text-xs underline hover:text-gray-500 transition bg-transparent border-none cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="text-center p-7">
            <div className="mb-2 opacity-30 flex justify-center">
              <CloudUpload className="w-8 h-8" />
            </div>
            <p className="text-gray-500 text-sm italic mb-1.5">Drag and drop files here</p>
            <span className="text-bni-red text-[13px] font-bold underline">or browse files</span>
          </div>
        )}
      </div>
        <ZigzagBorder />
    </div>
   
  );
}