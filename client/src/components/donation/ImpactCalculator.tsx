import { CheckSquare, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  Calculator,
  BookOpen,
  Stethoscope,
  Sprout,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { CAMPAIGNS, ICON_MAP } from "@/data/demo";

export function ImpactCalculator() {
  const [campaign, setCampaign] = useState<string>("education");
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");

  const activeAmount = customAmount
    ? parseInt(customAmount) || 0
    : selectedAmount;
  const camp = CAMPAIGNS[campaign] || CAMPAIGNS.education;

  const getImpact = () => {
    if (activeAmount <= 0) return null;
    const exact = camp.data.find(d => d.amount === activeAmount);
    if (exact)
      return {
        items: exact.items,
        icon: ICON_MAP[exact.icon] || BookOpen,
        color: camp.color,
      };
    const sorted = [...camp.data].sort((a, b) => a.amount - b.amount);
    const lower = [...sorted].reverse().find(d => d.amount <= activeAmount);
    if (!lower) return null;
    const multiplier = Math.floor(activeAmount / lower.amount);
    return {
      items: lower.items.map(item => `${multiplier}x ${item}`),
      icon: ICON_MAP[lower.icon] || BookOpen,
      color: camp.color,
    };
  };

  const impact = getImpact();

  // General Fund: split across all 4 categories equally
  const generalImpacts =
    campaign === "general" && activeAmount > 0
      ? (() => {
          const splitAmount = Math.floor(activeAmount / 4);
          const allCampaigns = Object.entries(CAMPAIGNS).filter(
            ([k]) => k !== "general"
          );
          return allCampaigns
            .map(([, campData]) => {
              const exact = campData.data.find(d => d.amount === splitAmount);
              if (exact)
                return {
                  label: campData.label,
                  color: campData.color,
                  tagColor: campData.tagColor,
                  amount: splitAmount,
                  items: exact.items,
                  icon: ICON_MAP[exact.icon] || BookOpen,
                };
              const sorted = [...campData.data].sort(
                (a, b) => a.amount - b.amount
              );
              const lower = [...sorted]
                .reverse()
                .find(d => d.amount <= splitAmount);
              if (!lower) return null;
              const multiplier = Math.floor(splitAmount / lower.amount);
              return {
                label: campData.label,
                color: campData.color,
                tagColor: campData.tagColor,
                amount: splitAmount,
                items: lower.items.map(item => `${multiplier}x ${item}`),
                icon: ICON_MAP[lower.icon] || BookOpen,
              };
            })
            .filter(Boolean) as Array<{
            label: string;
            color: string;
            tagColor: string;
            amount: number;
            items: string[];
            icon: typeof BookOpen;
          }>;
        })()
      : null;

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <Calculator size={14} className="text-[#6a4c93]" />
        <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#6a4c93] uppercase">
          IMPACT CALCULATOR
        </span>
        <span className="px-1.5 py-0.5 rounded border border-[#e63946]/30 bg-[#e63946]/10 font-mono text-[7px] text-[#e63946]">
          DEMO
        </span>
      </div>
      <h3 className="font-heading text-sm font-bold text-white mb-1">
        See What Your Donation Achieves
      </h3>
      <p className="text-[10px] text-gray-500 mb-4">
        Select a campaign and amount to see the direct impact your contribution
        creates.
      </p>

      {/* Campaign Category Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Object.entries(CAMPAIGNS).map(([key, data]) => (
          <button
            key={key}
            onClick={() => {
              setCampaign(key);
              setSelectedAmount(100);
              setCustomAmount("");
            }}
            className={`px-3 py-1.5 rounded-md font-mono text-[9px] font-bold transition-all duration-150 active:scale-95 border ${
              campaign === key
                ? `text-white`
                : "border-white/[0.08] bg-white/[0.03] text-gray-500 hover:border-white/[0.15] hover:text-gray-300"
            }`}
            style={
              campaign === key
                ? {
                    borderColor: `${data.color}80`,
                    backgroundColor: `${data.color}20`,
                  }
                : undefined
            }
          >
            <span className="block text-[10px]">{data.label}</span>
            <span className="block text-[7px] font-normal opacity-70">
              {data.description}
            </span>
          </button>
        ))}
      </div>

      {/* Amount Selector */}
      <div className="flex flex-wrap gap-2 mb-3">
        {camp.data.map(d => (
          <button
            key={d.amount}
            onClick={() => {
              setSelectedAmount(d.amount);
              setCustomAmount("");
            }}
            className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold transition-all duration-150 active:scale-95 ${
              selectedAmount === d.amount && !customAmount
                ? "bg-[#e63946]/15 border border-[#e63946]/40 text-[#e63946]"
                : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:border-white/[0.15]"
            }`}
          >
            ${d.amount}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] text-gray-500 font-mono">Custom:</span>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-[10px]">
            $
          </span>
          <input
            type="number"
            min="1"
            value={customAmount}
            onChange={e => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            aria-label="Custom donation amount"
            className="pl-5 pr-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded font-mono text-[10px] text-white placeholder-gray-600 w-28 focus:outline-none focus:border-[#e63946]/40 transition-colors"
          />
        </div>
      </div>

      {/* Impact Display */}
      {generalImpacts ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-[#6a4c93]" />
            <span className="font-mono text-[9px] font-bold text-[#a78bfa] uppercase tracking-wider">
              Combined Impact — ${activeAmount.toLocaleString()} Split Equally
              (${Math.floor(activeAmount / 4).toLocaleString()} Each)
            </span>
          </div>
          {generalImpacts.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
              <span className="text-[10px] text-gray-500">
                Enter at least $40 so each of the 4 campaigns receives $10 or
                more.
              </span>
            </div>
          ) : null}
          {generalImpacts.map((gi, idx) => (
            <div
              key={idx}
              className={`group bg-gradient-to-r ${gi.tagColor === "text-[#52b788]" ? "from-[#2d6a4f]/[0.08] to-[#52b788]/[0.05] border-[#2d6a4f]/15 hover:border-[#2d6a4f]/30 hover:from-[#2d6a4f]/[0.12]" : gi.tagColor === "text-[#48cae4]" ? "from-[#0077b6]/[0.08] to-[#48cae4]/[0.05] border-[#0077b6]/15 hover:border-[#0077b6]/30 hover:from-[#0077b6]/[0.12]" : gi.tagColor === "text-[#95d5b2]" ? "from-[#52b788]/[0.08] to-[#95d5b2]/[0.05] border-[#52b788]/15 hover:border-[#52b788]/30 hover:from-[#52b788]/[0.12]" : "from-[#e63946]/[0.08] to-[#ff6b6b]/[0.05] border-[#e63946]/15 hover:border-[#e63946]/30 hover:from-[#e63946]/[0.12]"} border rounded-lg p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-default`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <gi.icon size={12} style={{ color: gi.color }} />
                  <span
                    className="font-mono text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: gi.tagColor }}
                  >
                    {gi.label} — ${gi.amount.toLocaleString()}
                  </span>
                </div>
                <span className="font-mono text-[7px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Hover for details
                </span>
              </div>
              <ul className="space-y-1">
                {gi.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckSquare
                      size={9}
                      className="mt-0.5 shrink-0"
                      style={{ color: gi.tagColor }}
                    />
                    <span className="text-[10px] text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              {/* Expanded detail on hover */}
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-out">
                <div className="mt-2 pt-2 border-t border-white/[0.06] space-y-1.5">
                  {(() => {
                    // Find the next tier up for comparison
                    const campKey =
                      gi.label === "Education"
                        ? "education"
                        : gi.label === "Healthcare"
                          ? "healthcare"
                          : gi.label === "Environment"
                            ? "environment"
                            : "emergency";
                    const campData = CAMPAIGNS[campKey];
                    const nextTier = campData.data.find(
                      d => d.amount > gi.amount
                    );
                    return (
                      <>
                        <p className="font-mono text-[8px] text-gray-500 uppercase tracking-wider">
                          Allocation Breakdown:
                        </p>
                        <div className="flex gap-3 text-[9px] text-gray-400">
                          <span>
                            <span className="text-gray-600">Programs:</span> 93%
                          </span>
                          <span>
                            <span className="text-gray-600">Operations:</span>{" "}
                            5%
                          </span>
                          <span>
                            <span className="text-gray-600">Fees:</span> 2%
                          </span>
                        </div>
                        <p className="text-[9px] text-gray-500 italic">
                          ${gi.amount.toLocaleString()} → $
                          {Math.round(gi.amount * 0.93).toLocaleString()} direct
                          to {gi.label.toLowerCase()} programs
                        </p>
                        {nextTier && (
                          <p className="text-[9px] text-gray-500">
                            💡 Upgrade to ${nextTier.amount.toLocaleString()}{" "}
                            for: {nextTier.items[0]}
                          </p>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : impact ? (
        <div
          className={`bg-gradient-to-r ${camp.bgGrad} ${camp.borderColor} border rounded-lg p-4`}
        >
          <div className="flex items-center gap-2 mb-2">
            <impact.icon size={16} style={{ color: impact.color }} />
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-wider"
              style={{ color: camp.tagColor }}
            >
              Your ${activeAmount.toLocaleString()} Impact — {camp.label}
            </span>
          </div>
          <ul className="space-y-1.5">
            {impact.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckSquare
                  size={11}
                  className="mt-0.5 shrink-0"
                  style={{ color: camp.tagColor }}
                />
                <span className="text-[11px] text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
          <span className="text-[10px] text-gray-500">
            Enter an amount above $1 to see your impact.
          </span>
        </div>
      )}
    </div>
  );
}
