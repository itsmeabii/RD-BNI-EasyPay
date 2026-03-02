import { BillingData, ShippingData } from "@/data/Checkout";

interface TermsAndNotesProps {
  agreed: boolean;
  onToggle: (v: boolean) => void;
}

interface ShippingSectionProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
}

interface BillingSectionProps {
  data: BillingData;
  onChange: (data: BillingData) => void;
}

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold text-gray-400 mb-1 tracking-wider uppercase">
      {children}{required && <span className="text-bni-red"> *</span>}
    </label>
  );
}

export function Field({ label, required, value, onChange, type = "text" }: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50 outline-none transition-colors focus:border-bni-red"
      />
    </div>
  );
}

function SelectField({ label, required, value, onChange, options }: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50 outline-none transition-colors focus:border-bni-red"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function PhoneField({ label, required, value, onChange }: {
  label: string; required?: boolean; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <div className="flex items-center gap-1 px-3 border-r border-gray-200 bg-white text-sm text-gray-500 whitespace-nowrap">
          🇵🇭 +63
        </div>
        <input
          type="tel"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="9XXXXXXXXX"
          className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

export function BillingSection({ data, onChange }: BillingSectionProps) {
  const upd = (key: keyof BillingData) => (val: string) => onChange({ ...data, [key]: val });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4 shadow-sm">
      <h2 className="font-extrabold text-xl text-gray-800 mb-5 tracking-tight">
        Billing Details
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <Field label="First Name" required value={data.firstName} onChange={upd("firstName")} />
        <Field label="Last Name"  required value={data.lastName}  onChange={upd("lastName")} />
      </div>

      <div className="grid gap-3">
        <Field label="Email Address"   required type="email" value={data.email}   onChange={upd("email")} />
        <PhoneField label="Contact Number" required value={data.phone} onChange={upd("phone")} />
        <Field label="Region (Optional)" value={data.region} onChange={upd("region")} />
        <SelectField label="Chapter Name" required value={data.chapter} onChange={upd("chapter")}
          options={["All-Star", "Achievers", "Champions", "Elite"]} />
        <Field label="Company Name" required value={data.company} onChange={upd("company")} />
        <SelectField label="Country / Region" required value={data.country} onChange={upd("country")}
          options={["Philippines", "Singapore", "USA"]} />
        <Field label="Street Address"  required value={data.street} onChange={upd("street")} />
        <Field label="Apartment, suite, unit, etc. (optional)" value={data.apt} onChange={upd("apt")} />
        <Field label="Town / City"     required value={data.city}    onChange={upd("city")} />
        <SelectField label="State / County" required value={data.state} onChange={upd("state")}
          options={["Metro Manila", "Cebu", "Davao"]} />
        <Field label="Postcode / ZIP"  required value={data.postcode} onChange={upd("postcode")} />
      </div>
    </div>
  );
}

export function ShippingSection({ data, onChange }: ShippingSectionProps) {
  const upd = (key: keyof ShippingData) => (val: string) => onChange({ ...data, [key]: val });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4 shadow-sm border-l-4 border-l-bni-red">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Field label="First Name" required value={data.firstName} onChange={upd("firstName")} />
        <Field label="Last Name"  required value={data.lastName}  onChange={upd("lastName")} />
      </div>
      <div className="grid gap-3">
        <Field label="Company Name (Optional)" value={data.company}  onChange={upd("company")} />
        <Field label="Country / Region" required value={data.country} onChange={upd("country")} />
        <Field label="Street address"   required value={data.street}  onChange={upd("street")} />
        <Field label="Apartment, suite, unit, etc. (optional)" value={data.apt} onChange={upd("apt")} />
        <Field label="Town / City"      required value={data.city}    onChange={upd("city")} />
        <Field label="State / County"   required value={data.state}   onChange={upd("state")} />
        <Field label="Postcode / ZIP"   required value={data.postcode} onChange={upd("postcode")} />
        <PhoneField label="Contact Number" required value={data.phone} onChange={upd("phone")} />
      </div>
    </div>
  );
}

export function TermsAndNotes({ agreed, onToggle }: TermsAndNotesProps) {
  return (
    <>
      <div className="flex items-start gap-2.5 mt-2 mb-2.5">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => onToggle(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-bni-red cursor-pointer"
        />
        <span className="text-[13px] text-gray-500 leading-relaxed">
          I agree to the Terms and Conditions stated in the link below *<br />
          <a href="#" className="text-bni-red underline text-xs">
            Click here to read our Terms and Conditions (opens in a new tab)
          </a>
        </span>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-gray-400 leading-7">
        <strong className="block mb-0.5 text-gray-500">Notes:</strong>
        • Registered Company Name, Registered Address, and TIN will be used for the issuance of Official Receipts<br />
        • Delivery Fee will be shouldered by member.
      </div>
    </>
  );
}