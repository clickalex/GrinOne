import { useDonation } from "@/contexts/DonationContext";
import { useState } from "react";
import {
  Zap,
  Clock,
  Shield,
  CreditCard,
  Heart,
  Bitcoin,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const DEMO_CARDS = ["••••4242 — Visa", "••••5555 — Mastercard", "Apple Pay"];

export function OneClickDonate({
  botTotalRaised,
  botDonorCount,
}: {
  botTotalRaised: number;
  botDonorCount: number;
}) {
  const { openDonation } = useDonation();
  const [demoCurrency, setDemoCurrency] = useState("USD");
  const [demoAmount, setDemoAmount] = useState(100);
  const [demoCard, setDemoCard] = useState(0);
  return (
    <>
      {/* ===== ONE-CLICK DONATE DEMO ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DONOR EXPERIENCE — ONE-CLICK DONATE
              </span>
              <span className="px-1.5 py-0.5 rounded border border-[#e63946]/30 bg-[#e63946]/10 font-mono text-[7px] text-[#e63946]">
                DEMO
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              One-Click Donate Experience
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: SHOWCASE — ALL NEW DONOR EXPERIENCE FEATURES IN ONE
              INTERACTIVE DEMO
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left: Campaign Card with Thermometer & Countdown */}
              <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#f77f00] uppercase">
                    Live Campaign
                  </span>
                  <span className="font-mono text-[8px] text-gray-500">
                    CAMPAIGN: EDU-2026
                  </span>
                </div>
                <h3 className="font-heading text-sm font-bold text-white mb-1">
                  Build 50 New Schools in Rural India
                </h3>
                <p className="text-[10px] text-gray-400 mb-4">
                  Help provide quality education to 10,000+ children across
                  underserved communities.
                </p>

                {/* Progress Thermometer */}
                {(() => {
                  const CAMPAIGN_GOAL = 1000000;
                  const CAMPAIGN_BASE_RAISED = 847200;
                  const CAMPAIGN_BASE_DONORS = 12458;
                  const liveRaised = Math.min(
                    CAMPAIGN_GOAL,
                    CAMPAIGN_BASE_RAISED + botTotalRaised
                  );
                  const livePercent = (liveRaised / CAMPAIGN_GOAL) * 100;
                  const liveDonors = CAMPAIGN_BASE_DONORS + botDonorCount;
                  return (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-[#2d6a4f] font-bold">
                          ${liveRaised.toLocaleString()} raised
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          Goal: ${CAMPAIGN_GOAL.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] transition-all duration-1000"
                          style={{ width: `${livePercent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[9px] text-gray-500 font-mono">
                          {liveDonors.toLocaleString()} donors
                          {botDonorCount > 0 && (
                            <span className="text-[#2d6a4f]"> (live)</span>
                          )}
                        </span>
                        <span className="text-[9px] font-bold text-[#f77f00] font-mono">
                          {livePercent.toFixed(1)}% complete
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Countdown Timer */}
                <div className="flex items-center gap-2 p-2.5 bg-[#f77f00]/[0.06] border border-[#f77f00]/15 rounded-md mb-3">
                  <Clock size={12} className="text-[#f77f00]" />
                  <span className="text-[9px] font-mono text-gray-400 mr-2">
                    Matching ends in:
                  </span>
                  <CountdownTimer />
                  <span className="text-[8px] font-mono text-gray-500 ml-1">
                    HRS MIN SEC
                  </span>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "SSL Secured",
                    "PCI DSS",
                    "Tax Deductible",
                    "EIN: 12-3456789",
                  ].map((badge, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded font-mono text-[7px] text-gray-500"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: One-Click Donate Panel */}
              <div className="lg:col-span-3 bg-white/[0.02] border border-white/[0.06] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#2d6a4f] uppercase">
                    Returning Donor — Saved
                  </span>
                  <span className="font-mono text-[8px] text-gray-500">
                    GUEST CHECKOUT
                  </span>
                </div>

                {/* Multi-Currency Selector */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] text-gray-500 font-mono">
                    Currency:
                  </span>
                  {["USD", "EUR", "GBP", "INR"].map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setDemoCurrency(curr);
                        toast.success(`Switched to ${curr}`);
                      }}
                      aria-label={`Switch to ${curr}`}
                      aria-pressed={demoCurrency === curr}
                      className={`px-2 py-0.5 rounded font-mono text-[8px] transition-colors ${demoCurrency === curr ? "bg-[#2d6a4f]/20 border border-[#2d6a4f]/40 text-[#52b788]" : "bg-white/[0.04] border border-white/[0.08] text-gray-500 hover:text-gray-300"}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>

                {/* Quick Amount Presets */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {[25, 50, 100, 250].map(amt => (
                    <button
                      key={amt}
                      onClick={() => {
                        setDemoAmount(amt);
                        toast.success(
                          `Selected ${CURRENCY_SYMBOLS[demoCurrency]}${amt}`
                        );
                      }}
                      aria-pressed={demoAmount === amt}
                      className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold transition-all duration-150 active:scale-95 ${demoAmount === amt ? "bg-[#e63946]/15 border border-[#e63946]/40 text-[#e63946]" : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:border-white/[0.15]"}`}
                    >
                      {CURRENCY_SYMBOLS[demoCurrency]}
                      {amt}
                    </button>
                  ))}
                  <button
                    onClick={openDonation}
                    className="px-3 py-1.5 rounded font-mono text-[10px] font-bold transition-all duration-150 active:scale-95 bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:border-white/[0.15]"
                  >
                    Custom
                  </button>
                </div>

                {/* Saved Cards */}
                <div className="mb-3">
                  <span className="text-[9px] text-gray-500 font-mono block mb-1.5">
                    Saved Payment Methods:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {DEMO_CARDS.map((method, i) => (
                      <button
                        key={method}
                        onClick={() => {
                          setDemoCard(i);
                          toast.success(`Selected: ${method}`);
                        }}
                        aria-pressed={demoCard === i}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md border text-left transition-all duration-150 ${demoCard === i ? "bg-[#0077b6]/[0.06] border-[#0077b6]/30" : "bg-white/[0.02] border-white/[0.08] hover:border-white/[0.15]"}`}
                      >
                        <span className="text-[10px] font-mono text-gray-300">
                          {method}
                        </span>
                        {demoCard === i && (
                          <span className="ml-auto font-mono text-[7px] text-[#0077b6] font-bold">
                            {i === 0 ? "DEFAULT" : "SELECTED"}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* One-Click Donate Button */}
                <button
                  onClick={() => {
                    toast.success(
                      `🎉 Mock donation of ${CURRENCY_SYMBOLS[demoCurrency]}${demoAmount} submitted via ${DEMO_CARDS[demoCard]}!`
                    );
                    toast(
                      "In production, this processes in under 2 seconds using saved card."
                    );
                  }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-heading text-sm font-bold shadow-lg shadow-[#e63946]/20 hover:shadow-[#e63946]/30 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Zap size={14} />
                  One-Click Donate {CURRENCY_SYMBOLS[demoCurrency]}
                  {demoAmount}
                </button>

                {/* Feature Labels */}
                <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                  {[
                    "No Account Needed",
                    "Saved Card",
                    "2-Second Process",
                    "Instant Receipt",
                  ].map((label, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full font-mono text-[7px] text-gray-500"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Alternative Quick Pay */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toast.success("Apple Pay initiated (demo)")}
                    className="flex-1 py-2 rounded-md bg-black border border-white/[0.1] text-white font-mono text-[10px] font-bold hover:border-white/[0.2] transition-colors"
                  >
                    Apple Pay
                  </button>
                  <button
                    onClick={() => toast.success("Google Pay initiated (demo)")}
                    className="flex-1 py-2 rounded-md bg-white/[0.05] border border-white/[0.1] text-gray-300 font-mono text-[10px] font-bold hover:border-white/[0.2] transition-colors"
                  >
                    G Pay
                  </button>
                  <button
                    onClick={() =>
                      toast.success("Text-to-give: Send EDU to 44144 (demo)")
                    }
                    className="flex-1 py-2 rounded-md bg-white/[0.05] border border-white/[0.1] text-gray-300 font-mono text-[10px] font-bold hover:border-white/[0.2] transition-colors"
                  >
                    Text-to-Give
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
