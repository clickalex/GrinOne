import { BookOpen, Stethoscope, Sprout, AlertTriangle } from "lucide-react";

/* ===== LIVE ACTIVITY BOTS (demo only) =====
 * Simulates other "donors" and "supporters" being active on the page —
 * client-side only, no network calls, no real money. Purely for demo
 * atmosphere so the page doesn't feel static/empty.
 */
export const BOT_DONOR_NAMES = [
  "Alex Rivera",
  "Nina Petrova",
  "Tomás García",
  "Grace Okafor",
  "Wei Zhang",
  "Fatima Al-Sayed",
  "Liam O'Connor",
  "Sofia Rossi",
  "Kenji Watanabe",
  "Ava Johnson",
  "Diego Fernández",
  "Hana Kobayashi",
  "Noah Bennett",
  "Aisha Bello",
  "Ethan Park",
  "Ingrid Larsen",
  "Marcus Webb",
  "Ravi Patel",
  "Chloé Dubois",
  "Omar Haddad",
];
export const BOT_DONATION_AMOUNTS = [
  10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 120, 150, 200, 250, 300, 500,
];
export const BOT_DONATION_CAMPAIGNS = [
  "Education Programs",
  "Healthcare",
  "Community Development",
  "Environment & Sustainability",
  "Emergency Relief",
];
export const BOT_DONATION_TYPES = ["One-Time", "Recurring", "Monthly"];
export const BOT_MESSAGE_TEXTS = [
  "So glad to be part of this — keep up the amazing work! 💛",
  "Small gift, big hope. Proud to support this cause.",
  "This platform makes it so easy to see the impact. Thank you!",
  "In honor of my grandmother, who believed in giving back.",
  "Every child deserves this chance. Happy to help.",
  "Watching this campaign grow has been incredible. Count me in.",
  "Sending love and support from across the world 🌍",
  "Transparency like this is why I keep donating here.",
  "Matched by my employer today — double the impact!",
  "Just set up a recurring gift. See you next month!",
  "Thank you for making giving feel this simple.",
  "Donating in memory of a dear friend. This one's for you.",
];

export type LiveBotEvent = {
  id: string;
  kind: "donation" | "message";
  name: string;
  amount?: string;
  campaign?: string;
  type?: string;
  message?: string;
  timestamp: number;
};

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===== RECENT DONORS DATA ===== */
export const RECENT_DONORS = [
  {
    name: "Sarah Mitchell",
    amount: "$500",
    date: "Aug 15, 2026",
    campaign: "Education Programs",
    type: "One-Time",
    avatar: "S",
  },
  {
    name: "James Rodriguez",
    amount: "$250",
    date: "Aug 15, 2026",
    campaign: "Healthcare",
    type: "Recurring",
    avatar: "J",
  },
  {
    name: "Emily Chen",
    amount: "$1,000",
    date: "Aug 14, 2026",
    campaign: "Emergency Relief",
    type: "One-Time",
    avatar: "E",
  },
  {
    name: "Michael Thompson",
    amount: "$75",
    date: "Aug 14, 2026",
    campaign: "Community Development",
    type: "Monthly",
    avatar: "M",
  },
  {
    name: "Anonymous Donor",
    amount: "$2,500",
    date: "Aug 13, 2026",
    campaign: "Environment & Sustainability",
    type: "One-Time",
    avatar: "A",
  },
  {
    name: "Lisa & David Park",
    amount: "$300",
    date: "Aug 13, 2026",
    campaign: "Education Programs",
    type: "Recurring",
    avatar: "L",
  },
  {
    name: "Robert Kim",
    amount: "$150",
    date: "Aug 12, 2026",
    campaign: "Healthcare",
    type: "One-Time",
    avatar: "R",
  },
  {
    name: "Amanda Foster",
    amount: "$50",
    date: "Aug 12, 2026",
    campaign: "Community Development",
    type: "Monthly",
    avatar: "A",
  },
  {
    name: "John Williams",
    amount: "$750",
    date: "Aug 11, 2026",
    campaign: "Emergency Relief",
    type: "One-Time",
    avatar: "J",
  },
  {
    name: "Priya Sharma",
    amount: "$200",
    date: "Aug 11, 2026",
    campaign: "Education Programs",
    type: "Recurring",
    avatar: "P",
  },
];

export const TYPE_COLORS: Record<string, string> = {
  "One-Time": "#0077b6",
  Recurring: "#2d6a4f",
  Monthly: "#6a4c93",
};

/* ===== MONTHLY LEADERBOARD DATA ===== */
export const MONTHLY_LEADERBOARD = [
  {
    rank: 1,
    name: "Anonymous Donor",
    amount: "$2,500",
    month: "August 2026",
    campaign: "Environment & Sustainability",
    avatar: "A",
  },
  {
    rank: 2,
    name: "Emily Chen",
    amount: "$1,000",
    month: "August 2026",
    campaign: "Emergency Relief",
    avatar: "E",
  },
  {
    rank: 3,
    name: "John Williams",
    amount: "$750",
    month: "August 2026",
    campaign: "Emergency Relief",
    avatar: "J",
  },
  {
    rank: 4,
    name: "Sarah Mitchell",
    amount: "$500",
    month: "August 2026",
    campaign: "Education Programs",
    avatar: "S",
  },
  {
    rank: 5,
    name: "Lisa & David Park",
    amount: "$300",
    month: "August 2026",
    campaign: "Education Programs",
    avatar: "L",
  },
];

/* ===== DONOR MILESTONES ===== */
export const MILESTONES = [
  { threshold: "$10,000", achieved: true, date: "Mar 15, 2026", donors: 87 },
  { threshold: "$25,000", achieved: true, date: "May 22, 2026", donors: 203 },
  { threshold: "$50,000", achieved: true, date: "Jul 8, 2026", donors: 341 },
  { threshold: "$100,000", achieved: true, date: "Aug 1, 2026", donors: 489 },
  { threshold: "$250,000", achieved: false, date: null, donors: 489 },
];

/* ===== IMPACT CALCULATOR — CAMPAIGN-SPECIFIC ===== */
export type CampaignImpactItem = {
  amount: number;
  items: string[];
  icon: string;
};

export const CAMPAIGNS: Record<
  string,
  {
    color: string;
    bgGrad: string;
    borderColor: string;
    tagColor: string;
    label: string;
    description: string;
    data: CampaignImpactItem[];
  }
> = {
  education: {
    color: "#2d6a4f",
    bgGrad: "from-[#2d6a4f]/[0.08] to-[#52b788]/[0.05]",
    borderColor: "border-[#2d6a4f]/15",
    tagColor: "text-[#52b788]",
    label: "Education",
    description: "Schools, scholarships, teacher salaries, supplies",
    data: [
      {
        amount: 10,
        items: [
          "5 school notebooks + pens",
          "1 month of library access for 1 student",
        ],
        icon: "book",
      },
      {
        amount: 25,
        items: [
          "Complete school supply kit (backpack, books, stationery)",
          "1 month of internet access for a digital classroom",
        ],
        icon: "book",
      },
      {
        amount: 50,
        items: [
          "1 month of school meals for 1 child",
          "5 uniforms for students in need",
        ],
        icon: "book",
      },
      {
        amount: 75,
        items: [
          "Textbooks for an entire classroom (30 students)",
          "1 week of tutoring for 3 students",
        ],
        icon: "book",
      },
      {
        amount: 100,
        items: [
          "1 month of teacher salary in a rural school",
          "10 tablets for a digital learning lab",
        ],
        icon: "book",
      },
      {
        amount: 250,
        items: [
          "Full school year (tuition + supplies) for 1 child",
          "Renovate 1 school bathroom facility",
        ],
        icon: "book",
      },
      {
        amount: 500,
        items: [
          "Equip an entire computer lab (20 stations)",
          "Build a community library with 500+ books",
        ],
        icon: "book",
      },
      {
        amount: 1000,
        items: [
          "Renovate 1 school classroom (desks, boards, tech)",
          "Full-year scholarship for 2 students",
        ],
        icon: "book",
      },
    ],
  },
  healthcare: {
    color: "#0077b6",
    bgGrad: "from-[#0077b6]/[0.08] to-[#48cae4]/[0.05]",
    borderColor: "border-[#0077b6]/15",
    tagColor: "text-[#48cae4]",
    label: "Healthcare",
    description: "Clinics, vaccines, medical supplies, clean water",
    data: [
      {
        amount: 10,
        items: [
          "3 mosquito nets for malaria prevention",
          "1 basic first-aid kit",
        ],
        icon: "health",
      },
      {
        amount: 25,
        items: [
          "Vaccines for 2 children",
          "1 month of prenatal vitamins for an expectant mother",
        ],
        icon: "health",
      },
      {
        amount: 50,
        items: [
          "1 basic medical checkup for 5 patients",
          "200 liters of clean drinking water delivered",
        ],
        icon: "health",
      },
      {
        amount: 75,
        items: [
          "1 full medical checkup + vaccines for 3 children",
          "5 water purification tablets (1 family for 6 months)",
        ],
        icon: "health",
      },
      {
        amount: 100,
        items: [
          "Emergency medical kit for a rural clinic",
          "1 month of medication for a chronic patient",
        ],
        icon: "health",
      },
      {
        amount: 250,
        items: [
          "Equip 1 rural health clinic with basic supplies",
          "Clean water well filter for 1 village",
        ],
        icon: "health",
      },
      {
        amount: 500,
        items: [
          "Fund 1 mobile health van for 1 week",
          "Surgical supplies for 10 procedures",
        ],
        icon: "health",
      },
      {
        amount: 1000,
        items: [
          "Full medical equipment for 1 clinic room",
          "1 year of operation for a community health post",
        ],
        icon: "health",
      },
    ],
  },
  environment: {
    color: "#52b788",
    bgGrad: "from-[#52b788]/[0.08] to-[#95d5b2]/[0.05]",
    borderColor: "border-[#52b788]/15",
    tagColor: "text-[#95d5b2]",
    label: "Environment",
    description: "Reforestation, clean energy, wildlife, conservation",
    data: [
      {
        amount: 10,
        items: [
          "5 trees planted for reforestation",
          "1 kg of ocean plastic removed",
        ],
        icon: "env",
      },
      {
        amount: 25,
        items: ["15 native trees planted", "1 wildlife habitat monitoring kit"],
        icon: "env",
      },
      {
        amount: 50,
        items: [
          "1 solar garden light for a rural home",
          "1 acre of farmland restored to organic practices",
        ],
        icon: "env",
      },
      {
        amount: 75,
        items: [
          "100 native seedlings for a community garden",
          "1 month of wildlife camera monitoring",
        ],
        icon: "env",
      },
      {
        amount: 100,
        items: [
          "1 solar panel for a community center",
          "Remove 50 kg of plastic from waterways",
        ],
        icon: "env",
      },
      {
        amount: 250,
        items: [
          "Install a community composting system",
          "Plant 100 fruit-bearing trees in a food forest",
        ],
        icon: "env",
      },
      {
        amount: 500,
        items: [
          "Funding for 1 wildlife rescue for 1 month",
          "100 solar home lights for off-grid families",
        ],
        icon: "env",
      },
      {
        amount: 1000,
        items: [
          "Restore 5 acres of degraded forest",
          "Install a community solar microgrid (20 homes)",
        ],
        icon: "env",
      },
    ],
  },
  emergency: {
    color: "#e63946",
    bgGrad: "from-[#e63946]/[0.08] to-[#ff6b6b]/[0.05]",
    borderColor: "border-[#e63946]/15",
    tagColor: "text-[#ff6b6b]",
    label: "Emergency Relief",
    description: "Disaster response, food aid, shelter, evacuation",
    data: [
      {
        amount: 10,
        items: [
          "Emergency food rations for 1 family (3 days)",
          "1 hygiene kit for a displaced person",
        ],
        icon: "emergency",
      },
      {
        amount: 25,
        items: [
          "Emergency blanket + flashlight for 1 family",
          "1 week of clean water for a displaced family",
        ],
        icon: "emergency",
      },
      {
        amount: 50,
        items: [
          "Emergency food kit for a displaced family",
          "Basic medical supplies for 5 families",
        ],
        icon: "emergency",
      },
      {
        amount: 75,
        items: [
          "1 emergency tent for a displaced family",
          "3 days of emergency shelter for 2 families",
        ],
        icon: "emergency",
      },
      {
        amount: 100,
        items: [
          "Full emergency kit (food + water + medical + shelter) for 1 family",
          "Fuel for 1 rescue vehicle operation",
        ],
        icon: "emergency",
      },
      {
        amount: 250,
        items: [
          "1 month of emergency food for 3 families",
          "Deploy 1 mobile water purification unit",
        ],
        icon: "emergency",
      },
      {
        amount: 500,
        items: [
          "Emergency shelter kit for 10 families",
          "1 week of field hospital supplies",
        ],
        icon: "emergency",
      },
      {
        amount: 1000,
        items: [
          "Full emergency response package for 20 families",
          "Deploy 1 mobile medical team for 1 week",
        ],
        icon: "emergency",
      },
    ],
  },
  general: {
    color: "#6a4c93",
    bgGrad: "from-[#6a4c93]/[0.08] to-[#a78bfa]/[0.05]",
    borderColor: "border-[#6a4c93]/15",
    tagColor: "text-[#a78bfa]",
    label: "General Fund",
    description: "Split across all 4 campaigns equally",
    data: [],
  },
};

export const ICON_MAP: Record<string, typeof BookOpen> = {
  book: BookOpen,
  health: Stethoscope,
  env: Sprout,
  emergency: AlertTriangle,
};
