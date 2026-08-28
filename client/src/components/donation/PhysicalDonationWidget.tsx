import { useState } from "react";
import { toast } from "sonner";
import {
  Shirt,
  ToyBrick,
  Laptop,
  Sofa,
  Car,
  Package,
  UtensilsCrossed,
  Pill,
  BookOpen,
  Stethoscope,
  Sprout,
  Home as HomeIcon,
  Star,
  Camera,
  Truck,
  ClipboardList,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { PHYSICAL_DONATION_CATEGORIES } from "@/data/donations";

/* ===== PHYSICAL DONATION DEMO WIDGET ===== */
export function PhysicalDonationWidget() {
  const [physItems, setPhysItems] = useState<string[]>([]);
  const [physCondition, setPhysCondition] = useState("Good");
  const [physMethod, setPhysMethod] = useState<"pickup" | "dropoff" | "ship">(
    "pickup"
  );
  const [physSubmitted, setPhysSubmitted] = useState(false);
  const [physRef, setPhysRef] = useState("");
  const physCats = [
    "Clothing & Apparel",
    "Toys & Games",
    "Books",
    "Electronics",
    "Furniture",
    "Food & Non-Perishables",
    "Medical Supplies",
    "Vehicles",
    "Other",
  ];
  const physConditions = ["New", "Like New", "Good", "Fair"];
  const physMethods = [
    {
      key: "pickup" as const,
      label: "Free Home Pickup",
      desc: "Large items, 2-4hr window",
    },
    {
      key: "dropoff" as const,
      label: "Drop-Off Center",
      desc: "12 nearby locations",
    },
    {
      key: "ship" as const,
      label: "Ship Small Items",
      desc: "Prepaid label emailed",
    },
  ];
  const togglePhysItem = (cat: string) => {
    setPhysItems(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setPhysSubmitted(false);
  };
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      {/* Step 1: Select categories */}
      <p className="font-mono text-[9px] text-[#f77f00] uppercase tracking-widest mb-2">
        1. What are you donating?
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {physCats.map(cat => (
          <button
            key={cat}
            onClick={() => togglePhysItem(cat)}
            aria-label={`Toggle ${cat}`}
            className={`px-2.5 py-1 rounded-md text-[10px] font-medium border transition-all duration-150 active:scale-95 ${
              physItems.includes(cat)
                ? "border-[#f77f00]/50 bg-[#f77f00]/15 text-[#f77f00]"
                : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {physItems.includes(cat) ? "✓ " : ""}
            {cat}
          </button>
        ))}
      </div>

      {/* Step 2: Condition */}
      <p className="font-mono text-[9px] text-[#f77f00] uppercase tracking-widest mb-2">
        2. Condition
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {physConditions.map(c => (
          <button
            key={c}
            onClick={() => {
              setPhysCondition(c);
              setPhysSubmitted(false);
            }}
            aria-label={`Set condition ${c}`}
            className={`px-3 py-1 rounded-md text-[10px] font-medium border transition-all duration-150 active:scale-95 ${
              physCondition === c
                ? "border-[#f77f00]/50 bg-[#f77f00]/15 text-[#f77f00]"
                : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Step 3: Collection method */}
      <p className="font-mono text-[9px] text-[#f77f00] uppercase tracking-widest mb-2">
        3. Collection method
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
        {physMethods.map(m => (
          <button
            key={m.key}
            onClick={() => {
              setPhysMethod(m.key);
              setPhysSubmitted(false);
            }}
            aria-label={`Choose ${m.label}`}
            className={`p-2.5 rounded-lg border text-left transition-all duration-150 active:scale-[0.98] ${
              physMethod === m.key
                ? "border-[#f77f00]/50 bg-[#f77f00]/10"
                : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <p
              className={`font-heading text-[10px] font-semibold mb-0.5 ${physMethod === m.key ? "text-[#f77f00]" : "text-white"}`}
            >
              {m.label}
            </p>
            <p className="text-[9px] text-gray-500">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Photos placeholder */}
      <p className="font-mono text-[9px] text-[#f77f00] uppercase tracking-widest mb-2">
        4. Add photos (optional)
      </p>
      <div className="flex gap-2 mb-5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-16 h-16 rounded-lg border border-dashed border-white/[0.12] flex items-center justify-center text-gray-600"
          >
            <Camera size={14} />
          </div>
        ))}
        <div className="w-16 h-16 rounded-lg border border-dashed border-[#f77f00]/30 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:border-[#f77f00]/60 transition-colors">
          <Plus size={14} className="text-[#f77f00]" />
          <span className="font-mono text-[7px] text-gray-500 uppercase">
            Add
          </span>
        </div>
      </div>

      {/* Summary & submit */}
      {!physSubmitted ? (
        <button
          onClick={() => {
            if (physItems.length > 0) {
              setPhysRef(`PK-${Math.floor(Math.random() * 9000) + 1000}`);
              setPhysSubmitted(true);
            }
          }}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#f77f00] to-[#e63946] text-white font-heading text-xs font-semibold hover:brightness-110 transition-all duration-150 active:scale-[0.98]"
        >
          {physItems.length === 0
            ? "Select at least one item"
            : `Schedule Donation · ${physItems.length} item${physItems.length > 1 ? "s" : ""}`}
        </button>
      ) : (
        <div className="rounded-lg border border-[#2d6a4f]/30 bg-[#2d6a4f]/10 p-3 text-center">
          <CheckCircle2 size={16} className="text-[#2d6a4f] mx-auto mb-1" />
          <p className="font-heading text-[11px] font-semibold text-white">
            Pickup scheduled!
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">
            {physItems.join(", ")} · {physCondition} condition ·{" "}
            {physMethods.find(m => m.key === physMethod)?.label}
          </p>
          <p className="font-mono text-[8px] text-gray-500 mt-1">
            REF: {physRef} (Demo)
          </p>
          <button
            onClick={() => {
              setPhysItems([]);
              setPhysSubmitted(false);
            }}
            className="mt-2 text-[9px] text-[#f77f00] hover:underline"
          >
            Schedule another
          </button>
        </div>
      )}
    </div>
  );
}
