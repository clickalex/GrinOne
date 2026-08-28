import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DemoSeparator } from "@/components/sections/DemoSeparator";
import { OneClickDonate } from "@/components/sections/OneClickDonate";
import { RecentDonorsSection } from "@/components/sections/RecentDonorsSection";
import {
  MessageWall,
  type DemoMessage,
} from "@/components/sections/MessageWall";
import { ImpactCalculator } from "@/components/donation/ImpactCalculator";
import { PhysicalDonationWidget } from "@/components/donation/PhysicalDonationWidget";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  pickRandom,
  BOT_DONOR_NAMES,
  BOT_DONATION_AMOUNTS,
  BOT_DONATION_CAMPAIGNS,
  BOT_DONATION_TYPES,
  BOT_MESSAGE_TEXTS,
  type LiveBotEvent,
} from "@/data/demo";

export default function Demo() {
  // Demo message wall entries (client-side only)
  const [demoMessages, setDemoMessages] = useState<DemoMessage[]>([]);

  /* ===== LIVE ACTIVITY BOTS (demo only) =====
   * Purely client-side simulation of other people using the page — no
   * network calls, no real donations. Lets a demo/sandbox feel "alive"
   * with activity instead of static sample data.
   */
  const [botsActive, setBotsActive] = useState(true);
  const [botDonations, setBotDonations] = useState<
    Array<{
      name: string;
      amount: string;
      date: string;
      campaign: string;
      type: string;
      avatar: string;
    }>
  >([]);
  const [botEvents, setBotEvents] = useState<LiveBotEvent[]>([]);
  const [botTotalRaised, setBotTotalRaised] = useState(0);
  const [botDonorCount, setBotDonorCount] = useState(0);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  // Bot activity engine: periodically simulates a new donor donating or
  // posting a gratitude message. Pauses when the tab is hidden, when the
  // user has "prefers-reduced-motion" set, or when toggled off.
  useEffect(() => {
    if (!botsActive) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      // 4-9 seconds between simulated events
      const delay = 4000 + Math.random() * 5000;
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        if (document.hidden || prefersReducedMotionRef.current) {
          scheduleNext();
          return;
        }
        const isMessage = Math.random() < 0.3;
        const name = pickRandom(BOT_DONOR_NAMES);
        const initials = name
          .split(" ")
          .map(p => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        if (isMessage) {
          const campaign = pickRandom(BOT_DONATION_CAMPAIGNS);
          const message = pickRandom(BOT_MESSAGE_TEXTS);
          setDemoMessages(prev =>
            [{ name, message, campaign, isBot: true }, ...prev].slice(0, 40)
          );
          setBotEvents(prev =>
            [
              {
                id: `bot-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                kind: "message" as const,
                name,
                campaign,
                message,
                timestamp: Date.now(),
              },
              ...prev,
            ].slice(0, 20)
          );
        } else {
          const amount = pickRandom(BOT_DONATION_AMOUNTS);
          const campaign = pickRandom(BOT_DONATION_CAMPAIGNS);
          const type = pickRandom(BOT_DONATION_TYPES);
          const entry = {
            name,
            amount: `$${amount}`,
            date: "Just now",
            campaign,
            type,
            avatar: initials.slice(0, 1),
          };
          setBotDonations(prev => [entry, ...prev].slice(0, 30));
          setBotTotalRaised(prev => prev + amount);
          setBotDonorCount(prev => prev + 1);
          setBotEvents(prev =>
            [
              {
                id: `bot-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                kind: "donation" as const,
                name,
                amount: `$${amount}`,
                campaign,
                type,
                timestamp: Date.now(),
              },
              ...prev,
            ].slice(0, 20)
          );
        }
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [botsActive]);

  return (
    <div>
      <PageHeader
        icon={Zap}
        kicker="Live Demo Zone"
        title="Try the Platform, No Real Money"
        description="Every interactive module from the plan, running entirely in your browser — one-click donate, impact calculator, in-kind scheduler, donor wall, and simulated live activity."
        accent="#e63946"
        badge="DEMO"
      />

      <DemoSeparator />

      {/* ===== ONE-CLICK DONATE DEMO ===== */}
      <OneClickDonate
        botTotalRaised={botTotalRaised}
        botDonorCount={botDonorCount}
      />

      {/* ===== IMPACT CALCULATOR ===== */}
      <section className="py-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <ImpactCalculator />
          </AnimatedSection>
        </div>
      </section>

      {/* Recent Donors */}
      <RecentDonorsSection
        botsActive={botsActive}
        onToggleBots={setBotsActive}
        botDonations={botDonations}
        botEvents={botEvents}
        botDonorCount={botDonorCount}
      />

      {/* ===== PHYSICAL DONATION DEMO ===== */}
      <section className="py-10 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <PhysicalDonationWidget />
          </AnimatedSection>
        </div>
      </section>

      {/* ===== DONOR MESSAGE WALL ===== */}
      <MessageWall
        demoMessages={demoMessages}
        onPostMessage={msg => setDemoMessages(prev => [msg, ...prev])}
      />
    </div>
  );
}
