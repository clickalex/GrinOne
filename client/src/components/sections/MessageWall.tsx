import { useState } from "react";
import { MessageCircleHeart, Sparkles, Bot } from "lucide-react";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export type DemoMessage = {
  name: string;
  message: string;
  campaign: string;
  isBot?: boolean;
};

export function MessageWall({
  demoMessages,
  onPostMessage,
}: {
  demoMessages: DemoMessage[];
  onPostMessage: (msg: DemoMessage) => void;
}) {
  const [messageName, setMessageName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageCampaign, setMessageCampaign] = useState("");
  const [isMessageProcessing, setIsMessageProcessing] = useState(false);

  // Simulated message submission (demo only)
  const handleMessageSubmit = () => {
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }
    if (messageText.length > 500) {
      toast.error("Message is too long (max 500 characters)");
      return;
    }
    if (messageName.length > 100) {
      toast.error("Name is too long (max 100 characters)");
      return;
    }
    setIsMessageProcessing(true);
    setTimeout(() => {
      onPostMessage({
        name: messageName.trim() || "Anonymous",
        message: messageText.trim(),
        campaign: messageCampaign,
      });
      setMessageText("");
      setMessageName("");
      setIsMessageProcessing(false);
      toast.success("Message posted! (Demo)");
    }, 500);
  };
  return (
    <>
      {/* ===== DONOR MESSAGE WALL ===== */}
      <section className="py-10 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <MessageCircleHeart size={16} className="text-[#6a4c93]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DONOR MESSAGES
              </span>
              <span className="px-1.5 py-0.5 rounded border border-[#6a4c93]/30 bg-[#6a4c93]/10 font-mono text-[7px] text-[#6a4c93]">
                DEMO
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Donor Message Wall
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: PUBLIC GRATITUDE — WORDS FROM OUR COMMUNITY
            </p>

            {/* Submit message form */}
            <div className="mb-6 bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  value={messageName}
                  onChange={e => setMessageName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  maxLength={100}
                  className="bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6a4c93]/50"
                />
                <select
                  value={messageCampaign}
                  onChange={e => setMessageCampaign(e.target.value)}
                  aria-label="Select campaign"
                  className="bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-[#6a4c93]/50 cursor-pointer"
                >
                  <option value="">Select campaign (optional)</option>
                  <option value="Education Programs">Education Programs</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Community Development">
                    Community Development
                  </option>
                  <option value="Environment & Sustainability">
                    Environment & Sustainability
                  </option>
                  <option value="Emergency Relief">Emergency Relief</option>
                </select>
                <button
                  onClick={handleMessageSubmit}
                  disabled={isMessageProcessing}
                  className="font-mono text-[10px] px-4 py-2 rounded bg-[#6a4c93]/20 border border-[#6a4c93]/30 text-[#6a4c93] hover:bg-[#6a4c93]/30 transition-colors disabled:opacity-50"
                >
                  {isMessageProcessing ? "Sending..." : "Post Message"}
                </button>
              </div>
              <textarea
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder="Share a message of hope or gratitude..."
                aria-label="Your message"
                rows={2}
                maxLength={500}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6a4c93]/50 resize-none"
              />
            </div>

            {/* Messages display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {demoMessages.length > 0 ? (
                demoMessages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={10} className="text-[#6a4c93]" />
                      <span className="font-mono text-[9px] text-gray-400">
                        {msg.name || "Anonymous"}
                      </span>
                      {msg.campaign && (
                        <span className="font-mono text-[8px] text-[#6a4c93] bg-[#6a4c93]/10 px-1.5 py-0.5 rounded">
                          {msg.campaign}
                        </span>
                      )}
                      {msg.isBot && (
                        <span
                          title="Simulated live activity"
                          className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-[#2d6a4f]/10 border border-[#2d6a4f]/30 font-mono text-[7px] text-[#2d6a4f] ml-auto"
                        >
                          <Bot size={7} />
                          BOT
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-300">{msg.message}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-gray-500 text-[10px] font-mono">
                  Be the first to share a message of hope ✨
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
