import { toast } from "sonner";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bitcoin,
  CheckCircle2,
  CreditCard,
  Heart,
  Sparkles,
  X,
} from "lucide-react";
import { useDonation } from "@/contexts/DonationContext";

/* ===== DONATION MODAL ===== */
export default function DonationModal() {
  const {
    showDonationModal,
    closeDonation,
    donationStep,
    setDonationStep,
    donorName,
    setDonorName,
    donorEmail,
    setDonorEmail,
    donationAmount,
    setDonationAmount,
    donationCampaign,
    setDonationCampaign,
    donationType,
    setDonationType,
    paymentMethod,
    setPaymentMethod,
    isAnonymous,
    setIsAnonymous,
    donorMessage,
    setDonorMessage,
    donationTxnRef,
    isDonationProcessing,
    handleDonate,
    paymentMethodLabels,
  } = useDonation();

  // Modal: close on Escape + lock body scroll while open
  useEffect(() => {
    if (!showDonationModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDonation();
      }
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showDonationModal, closeDonation]);

  return (
    <>
      {/* ===== DONATION MODAL ===== */}
      {showDonationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => {
            closeDonation();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Donation form"
            className="w-full max-w-lg bg-[#0d0d0d] border border-white/[0.08] rounded-xl p-6 relative overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                closeDonation();
              }}
              aria-label="Close donation form"
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Step 2: Success */}
            {donationStep === 2 ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full bg-[#2d6a4f]/20 border border-[#2d6a4f]/40 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 size={32} className="text-[#2d6a4f]" />
                </motion.div>
                <h3 className="font-heading text-lg font-bold text-white mb-1">
                  Thank You!
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Your donation has been received and will be allocated to{" "}
                  <span className="text-[#e63946]">{donationCampaign}</span>.
                </p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 mb-4">
                  <span className="font-mono text-[9px] text-gray-500 uppercase">
                    Transaction Ref
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <p className="font-mono text-sm text-green-400">
                      {donationTxnRef}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard
                          ?.writeText(donationTxnRef)
                          .then(() => toast.success("Reference copied!"))
                          .catch(() => toast.error("Could not copy"));
                      }}
                      aria-label="Copy transaction reference"
                      className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/[0.1] text-gray-400 hover:text-white hover:border-white/[0.2] transition-colors"
                    >
                      COPY
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-4">
                  A confirmation email will be sent to{" "}
                  {donorEmail || "your email address"} with your tax receipt.
                </p>
                {/* Social share — spread the word */}
                <div className="mb-4">
                  <p className="font-mono text-[8px] text-gray-600 uppercase tracking-widest mb-2">
                    Spread the word
                  </p>
                  <div className="flex justify-center gap-2">
                    {[
                      {
                        label: "Share on X",
                        short: "X",
                        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("I just donated to GrinOne! Join me in making an impact.")}`,
                      },
                      {
                        label: "Share on Facebook",
                        short: "Facebook",
                        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://grinone.org")}`,
                      },
                      {
                        label: "Share on LinkedIn",
                        short: "LinkedIn",
                        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://grinone.org")}`,
                      },
                    ].map(s => (
                      <button
                        key={s.short}
                        onClick={() =>
                          window.open(s.url, "_blank", "noopener,noreferrer")
                        }
                        aria-label={s.label}
                        className="font-mono text-[9px] px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:border-white/[0.2] transition-colors"
                      >
                        {s.short}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeDonation();
                  }}
                  className="font-mono text-[10px] px-4 py-2 rounded bg-white/[0.06] text-gray-300 hover:bg-white/[0.1] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Step 1: Form */
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={16} className="text-[#e63946]" />
                  <h3 className="font-heading text-sm font-bold text-white">
                    Make a Donation
                  </h3>
                </div>

                {/* Amount selection */}
                <div className="mb-4">
                  <label
                    htmlFor="donation-amount"
                    className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2 block"
                  >
                    Select Amount (USD)
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {["25", "50", "100", "250"].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setDonationAmount(amt)}
                        className={`py-2 rounded border text-xs font-mono transition-all ${
                          donationAmount === amt
                            ? "border-[#e63946] bg-[#e63946]/10 text-[#e63946]"
                            : "border-white/[0.08] bg-white/[0.03] text-gray-300 hover:border-white/[0.15]"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <input
                    id="donation-amount"
                    type="number"
                    min="1"
                    max="1000000"
                    value={donationAmount}
                    onChange={e => setDonationAmount(e.target.value)}
                    placeholder="Custom amount"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#e63946]/50"
                  />
                </div>

                {/* Campaign */}
                <div className="mb-4">
                  <label
                    htmlFor="donation-campaign"
                    className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2 block"
                  >
                    Campaign
                  </label>
                  <select
                    id="donation-campaign"
                    value={donationCampaign}
                    onChange={e => setDonationCampaign(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-[#e63946]/50 cursor-pointer"
                  >
                    <option value="Education Programs">
                      Education Programs
                    </option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Community Development">
                      Community Development
                    </option>
                    <option value="Environment & Sustainability">
                      Environment & Sustainability
                    </option>
                    <option value="Emergency Relief">Emergency Relief</option>
                    <option value="General Fund">General Fund</option>
                  </select>
                </div>

                {/* Donation type */}
                <div className="mb-4">
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2 block">
                    Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["one-time", "monthly", "recurring"] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setDonationType(t)}
                        className={`py-1.5 rounded border text-[10px] font-mono transition-all ${
                          donationType === t
                            ? "border-[#0077b6] bg-[#0077b6]/10 text-[#0077b6]"
                            : "border-white/[0.08] bg-white/[0.03] text-gray-400 hover:border-white/[0.15]"
                        }`}
                      >
                        {t === "one-time"
                          ? "One-Time"
                          : t === "monthly"
                            ? "Monthly"
                            : "Recurring"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment method */}
                <div className="mb-4">
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2 block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      Object.keys(paymentMethodLabels) as Array<
                        keyof typeof paymentMethodLabels
                      >
                    ).map(pm => {
                      const pmInfo = paymentMethodLabels[pm];
                      return (
                        <button
                          key={pm}
                          onClick={() =>
                            setPaymentMethod(pm as typeof paymentMethod)
                          }
                          className={`flex items-center gap-2 py-2 px-3 rounded border text-[10px] font-mono transition-all ${
                            paymentMethod === pm
                              ? "border-[#f77f00] bg-[#f77f00]/10 text-[#f77f00]"
                              : "border-white/[0.08] bg-white/[0.03] text-gray-400 hover:border-white/[0.15]"
                          }`}
                        >
                          <pmInfo.icon size={12} />
                          {pmInfo.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Donor info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      id="donate-anonymously"
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={e => setIsAnonymous(e.target.checked)}
                      className="w-3 h-3 accent-[#e63946]"
                    />
                    <label
                      htmlFor="donate-anonymously"
                      className="text-[10px] text-gray-400 cursor-pointer"
                    >
                      Donate anonymously
                    </label>
                  </div>
                  {!isAnonymous && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={donorName}
                        onChange={e => setDonorName(e.target.value)}
                        placeholder="Your name *"
                        aria-label="Your name"
                        maxLength={100}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#e63946]/50"
                      />
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={e => setDonorEmail(e.target.value)}
                        placeholder="Email (for receipt)"
                        aria-label="Email for receipt"
                        maxLength={254}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#e63946]/50"
                      />
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-4">
                  <textarea
                    value={donorMessage}
                    onChange={e => setDonorMessage(e.target.value)}
                    placeholder="Leave a message (optional)"
                    aria-label="Donation message"
                    rows={2}
                    maxLength={500}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#e63946]/50 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleDonate}
                  disabled={isDonationProcessing}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-mono text-xs font-semibold hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDonationProcessing
                    ? "Processing..."
                    : `Donate $${donationAmount}`}{" "}
                  →
                </button>

                <p className="text-[8px] text-gray-600 text-center mt-3 font-mono">
                  SECURE PAYMENT · PCI DSS COMPLIANT · TAX DEDUCTIBLE
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
