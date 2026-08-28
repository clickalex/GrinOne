import { motion } from "framer-motion";
import { CheckCircle2, Star, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CommandModule } from "@/components/shared/CommandModule";
import { useDonation } from "@/contexts/DonationContext";
import { Pagination } from "@/components/shared/Pagination";
import { DEFAULT_PAGE_SIZE, usePagination } from "@/lib/usePagination";
import { useState } from "react";
import { Users, Trophy, Crown, Medal, Bot, Radio, Heart } from "lucide-react";
import { toast } from "sonner";
import {
  RECENT_DONORS,
  TYPE_COLORS,
  MONTHLY_LEADERBOARD,
  MILESTONES,
  type LiveBotEvent,
} from "@/data/demo";

export function RecentDonorsSection({
  botsActive,
  onToggleBots,
  botDonations,
  botEvents,
  botDonorCount,
}: {
  botsActive: boolean;
  onToggleBots: (active: boolean) => void;
  botDonations: Array<{
    name: string;
    amount: string;
    date: string;
    campaign: string;
    type: string;
    avatar: string;
  }>;
  botEvents: LiveBotEvent[];
  botDonorCount: number;
}) {
  const { openDonation } = useDonation();
  const [donorFilterCampaign, setDonorFilterCampaign] = useState("All");
  const [donorFilterType, setDonorFilterType] = useState("All");

  // Combined donor list: live-bot donations first, then the static sample data
  const allDonorsForTable = [...botDonations, ...RECENT_DONORS];
  const filteredDonors = allDonorsForTable.filter(
    d =>
      (donorFilterCampaign === "All" || d.campaign === donorFilterCampaign) &&
      (donorFilterType === "All" || d.type === donorFilterType)
  );
  const filteredTotal = filteredDonors.reduce((sum, d) => {
    const num = parseInt(d.amount.replace(/[$,]/g, ""), 10);
    return sum + num;
  }, 0);

  // Never render more than 10 donor rows at once
  const {
    page: donorPage,
    pageCount: donorPageCount,
    setPage: setDonorPage,
    reset: resetDonorPage,
    startIndex: donorStartIndex,
    endIndex: donorEndIndex,
  } = usePagination(filteredDonors.length, DEFAULT_PAGE_SIZE);
  const pagedDonors = filteredDonors.slice(donorStartIndex, donorEndIndex);

  return (
    <>
      {/* Recent Donors */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: RECENT DONORS
              </span>
              <span className="px-1.5 py-0.5 rounded border border-[#e63946]/30 bg-[#e63946]/10 font-mono text-[7px] text-[#e63946]">
                DEMO
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Recent Donations
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              SYS.REF: DEMO FEED — SAMPLE DATA FOR ILLUSTRATION PURPOSES
            </p>

            {/* Live Activity Bots panel */}
            <div className="mb-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {botsActive && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2d6a4f] opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${botsActive ? "bg-[#2d6a4f]" : "bg-gray-600"}`}
                    />
                  </span>
                  <Bot size={13} className="text-[#2d6a4f]" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-300">
                    Live Activity Bots
                  </span>
                  <span className="px-1.5 py-0.5 rounded border border-[#2d6a4f]/30 bg-[#2d6a4f]/10 font-mono text-[7px] text-[#2d6a4f]">
                    {botsActive ? "ACTIVE" : "PAUSED"}
                  </span>
                </div>
                <button
                  onClick={() => onToggleBots(!botsActive)}
                  aria-pressed={botsActive}
                  aria-label={
                    botsActive
                      ? "Pause simulated donor activity"
                      : "Resume simulated donor activity"
                  }
                  className={`font-mono text-[9px] px-3 py-1.5 rounded border transition-colors ${
                    botsActive
                      ? "border-[#e63946]/30 bg-[#e63946]/10 text-[#e63946] hover:bg-[#e63946]/20"
                      : "border-[#2d6a4f]/30 bg-[#2d6a4f]/10 text-[#2d6a4f] hover:bg-[#2d6a4f]/20"
                  }`}
                >
                  {botsActive ? "Pause Bots" : "Activate Bots"}
                </button>
              </div>
              <p className="text-[9px] text-gray-500 mb-2">
                Simulated donors periodically appear below and on the message
                wall to preview a live, active platform. 100% client-side — no
                real people, no real money.
              </p>
              <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                {botEvents.length > 0 ? (
                  botEvents.slice(0, 6).map(evt => (
                    <div
                      key={evt.id}
                      className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/[0.02] rounded px-2 py-1"
                    >
                      <Radio size={9} className="text-[#2d6a4f] shrink-0" />
                      {evt.kind === "donation" ? (
                        <span>
                          <span className="text-gray-200">{evt.name}</span>{" "}
                          donated{" "}
                          <span className="text-green-400">{evt.amount}</span>{" "}
                          to {evt.campaign}
                        </span>
                      ) : (
                        <span>
                          <span className="text-gray-200">{evt.name}</span>{" "}
                          posted a message on the Donor Wall
                        </span>
                      )}
                      <span className="ml-auto text-gray-600 shrink-0">
                        bot
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-[9px] text-gray-600 font-mono px-1 py-1">
                    {botsActive
                      ? "Waiting for the next simulated event…"
                      : "Bots are paused — activate to see simulated activity."}
                  </div>
                )}
              </div>
            </div>

            {/* Top Donor Spotlight */}
            {(() => {
              const parseAmount = (a: string) =>
                parseInt(a.replace(/[$,]/g, ""), 10) || 0;
              const allDonors = [...botDonations, ...RECENT_DONORS];
              const topDonor = allDonors.reduce((max, d) =>
                parseAmount(d.amount) > parseAmount(max.amount) ? d : max
              );
              const recentTotal = allDonors.reduce(
                (sum, d) => sum + parseAmount(d.amount),
                0
              );
              const topShare =
                (parseAmount(topDonor.amount) / recentTotal) * 100;
              return (
                <div className="mb-6 relative rounded-lg border border-[#f77f00]/20 bg-gradient-to-r from-[#f77f00]/[0.06] to-[#e63946]/[0.06] p-4 overflow-hidden">
                  {/* Sparkle accents */}
                  <div className="absolute top-2 right-3 text-[#f77f00]/40">
                    <Zap size={14} />
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f77f00] to-[#e63946] flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-[#e63946]/20 shrink-0">
                      {topDonor.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[9px] text-[#f77f00] uppercase tracking-wider font-semibold">
                          Top Donor Spotlight
                        </span>
                        <Star size={10} className="text-[#f77f00]" />
                      </div>
                      <h3 className="font-heading text-sm font-bold text-white">
                        {topDonor.name}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Contributed{" "}
                        <span className="text-[#f77f00] font-mono font-semibold">
                          {topDonor.amount}
                        </span>{" "}
                        to {topDonor.campaign} on {topDonor.date}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <div className="font-mono text-lg font-bold text-green-400">
                        {topDonor.amount}
                      </div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase">
                        Single contribution
                      </span>
                    </div>
                  </div>
                  {/* Progress bar showing percentage of total */}
                  <div className="mt-3 pt-2 border-t border-white/[0.04]">
                    <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-1">
                      <span>Share of recent donations</span>
                      <span>{topShare.toFixed(0)}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#f77f00] to-[#e63946]"
                        style={{ width: `${topShare}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Become a Top Donor CTA */}
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <Heart size={14} className="text-[#e63946] shrink-0" />
              <p className="text-[10px] text-gray-400 flex-1">
                Your donation could be featured here next. Join{" "}
                <span className="text-white font-semibold">
                  {(489 + botDonorCount).toLocaleString()} donors
                </span>{" "}
                who have already made an impact.
              </p>
              <button
                onClick={openDonation}
                className="font-mono text-[10px] px-3 py-1.5 rounded bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-semibold hover:opacity-90 transition-opacity active:scale-95 shrink-0"
              >
                Donate Now →
              </button>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                  Filter:
                </span>
                <select
                  value={donorFilterCampaign}
                  onChange={e => {
                    setDonorFilterCampaign(e.target.value);
                    resetDonorPage();
                  }}
                  aria-label="Filter by campaign"
                  className="bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 text-[10px] text-gray-300 font-mono cursor-pointer hover:bg-white/[0.06] transition-colors focus:outline-none focus:border-[#e63946]/50"
                >
                  <option value="All">All Campaigns</option>
                  {Array.from(new Set(RECENT_DONORS.map(d => d.campaign))).map(
                    c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
                <select
                  value={donorFilterType}
                  onChange={e => setDonorFilterType(e.target.value)}
                  aria-label="Filter by donation type"
                  className="bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 text-[10px] text-gray-300 font-mono cursor-pointer hover:bg-white/[0.06] transition-colors focus:outline-none focus:border-[#e63946]/50"
                >
                  <option value="All">All Types</option>
                  {Array.from(new Set(RECENT_DONORS.map(d => d.type))).map(
                    t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>
              {(donorFilterCampaign !== "All" || donorFilterType !== "All") && (
                <button
                  onClick={() => {
                    setDonorFilterCampaign("All");
                    setDonorFilterType("All");
                    resetDonorPage();
                  }}
                  className="font-mono text-[9px] text-[#e63946] hover:text-white underline transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
            <>
              <CommandModule className="p-1">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                        <th
                          scope="col"
                          className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                        >
                          Donor
                        </th>
                        <th
                          scope="col"
                          className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider hidden md:table-cell"
                        >
                          Campaign
                        </th>
                        <th
                          scope="col"
                          className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedDonors.map((donor, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                style={{
                                  backgroundColor:
                                    TYPE_COLORS[donor.type] || "#6a4c93",
                                }}
                              >
                                {donor.avatar}
                              </div>
                              <span className="text-gray-200 font-medium">
                                {donor.name}
                              </span>
                              {botDonations.includes(donor) && (
                                <span
                                  title="Simulated live activity"
                                  className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-[#2d6a4f]/10 border border-[#2d6a4f]/30 font-mono text-[7px] text-[#2d6a4f]"
                                >
                                  <Bot size={7} />
                                  BOT
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="font-mono text-xs font-semibold text-green-400">
                              {donor.amount}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell">
                            {donor.date}
                          </td>
                          <td className="px-4 py-2.5 text-gray-400 hidden md:table-cell">
                            {donor.campaign}
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase"
                              style={{
                                backgroundColor: `${TYPE_COLORS[donor.type] || "#6a4c93"}15`,
                                color: TYPE_COLORS[donor.type] || "#6a4c93",
                              }}
                            >
                              {donor.type}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CommandModule>

              {/* Total summary */}
              <div className="mt-3 flex items-center justify-between px-4">
                <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
                  {filteredDonors.length} of {allDonorsForTable.length}{" "}
                  donations match
                </span>
                <span className="font-mono text-[10px] text-white font-semibold">
                  Total:{" "}
                  <span className="text-green-400">
                    ${filteredTotal.toLocaleString()}
                  </span>
                </span>
              </div>

              {/* Row pagination — caps the table at 10 rows per page */}
              <Pagination
                page={donorPage}
                pageCount={donorPageCount}
                onPageChange={setDonorPage}
                totalItems={filteredDonors.length}
                pageSize={DEFAULT_PAGE_SIZE}
                itemLabel="DONORS"
                accent="#e63946"
              />
            </>

            {/* Monthly Leaderboard */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={14} className="text-[#f77f00]" />
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                  August 2026 Leaderboard — Top 5 Donors
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {MONTHLY_LEADERBOARD.map((donor, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border p-3 text-center transition-transform hover:scale-[1.02] ${
                      donor.rank === 1
                        ? "border-[#f77f00]/30 bg-[#f77f00]/[0.05]"
                        : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1.5">
                      {donor.rank === 1 && (
                        <Crown size={12} className="text-[#f77f00]" />
                      )}
                      {donor.rank === 2 && (
                        <Medal size={12} className="text-gray-300" />
                      )}
                      {donor.rank === 3 && (
                        <Medal size={12} className="text-[#cd7f32]" />
                      )}
                      {donor.rank > 3 && (
                        <span className="font-mono text-[9px] text-gray-500">
                          #{donor.rank}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto mb-1.5 ${
                        donor.rank === 1
                          ? "bg-gradient-to-br from-[#f77f00] to-[#e63946]"
                          : "bg-white/[0.08]"
                      }`}
                    >
                      {donor.avatar}
                    </div>
                    <p className="font-mono text-[10px] text-gray-200 font-medium truncate">
                      {donor.name}
                    </p>
                    <p className="font-mono text-[11px] text-green-400 font-semibold mt-0.5">
                      {donor.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Donor Milestones */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} className="text-[#6a4c93]" />
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                  Community Milestones
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {MILESTONES.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[9px] font-mono ${
                      m.achieved
                        ? "border-[#2d6a4f]/30 bg-[#2d6a4f]/[0.08] text-green-400"
                        : "border-white/[0.06] bg-white/[0.02] text-gray-500"
                    }`}
                  >
                    {m.achieved ? (
                      <CheckCircle2 size={10} className="shrink-0" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border border-dashed border-gray-500 shrink-0" />
                    )}
                    <span className="font-semibold">{m.threshold}</span>
                    {m.achieved ? (
                      <span className="text-gray-500">
                        · {m.date} · {m.donors} donors
                      </span>
                    ) : (
                      <span className="text-gray-600">
                        · In progress ({m.donors} donors so far)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
