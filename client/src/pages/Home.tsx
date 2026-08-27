/*
 * Design: Mission Control — Command Center aesthetic
 * Phase colors: Green(#2d6a4f), Blue(#0077b6), Crimson(#e63946), Amber(#f77f00), Purple(#6a4c93)
 * Typography: Space Grotesk headings, Source Sans 3 body, JetBrains Mono accents
 * Key principle: Every section is a command module with telemetry framing
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Shield,
  Monitor,
  Code2,
  CheckCircle2,
  Rocket,
  ChevronRight,
  CheckSquare,
  Square,
  Timer,
  Globe,
  Lock,
  Database,
  FileText,
  BarChart3,
  Activity,
  Signal,
  Zap,
  ArrowRight,
  CreditCard,
  Repeat,
  Gift,
  Building2,
  Heart,
  Coins,
  Users,
  PieChart,
  Eye,
  DollarSign,
  Truck,
  BookOpen,
  Stethoscope,
  Sprout,
  HandHeart,
  Home as HomeIcon,
  Star,
  Shirt,
  ToyBrick,
  Laptop,
  Sofa,
  Car,
  Package,
  UtensilsCrossed,
  Pill,
  ClipboardList,
  Camera,
  Plus,
  Trophy,
  Crown,
  Medal,
  Bitcoin,
  MessageCircleHeart,
  X,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Globe as GlobeOffIcon,
  MailX,
  Clock,
  Smartphone,
  UserX,
  Database as DatabaseIcon,
  Calculator,
} from "lucide-react";
import GrinOneLogo from "@/components/GrinOneLogo";
import { toast } from "sonner";

// Phase color map
const PHASES = [
  {
    id: "planning",
    number: "01",
    title: "Planning & Strategy",
    color: "#2d6a4f",
    colorLight: "rgba(45,106,79,0.12)",
    icon: Target,
    label: "FOUNDATION",
  },
  {
    id: "design",
    number: "02",
    title: "Design & User Experience",
    color: "#0077b6",
    colorLight: "rgba(0,119,182,0.12)",
    icon: Monitor,
    label: "BLUEPRINT",
  },
  {
    id: "development",
    number: "03",
    title: "Development & Integration",
    color: "#e63946",
    colorLight: "rgba(230,57,70,0.12)",
    icon: Code2,
    label: "EXECUTION",
  },
  {
    id: "testing",
    number: "04",
    title: "Testing & Quality Assurance",
    color: "#f77f00",
    colorLight: "rgba(247,127,0,0.12)",
    icon: Shield,
    label: "VALIDATION",
  },
  {
    id: "launch",
    number: "05",
    title: "Launch & Optimization",
    color: "#6a4c93",
    colorLight: "rgba(106,76,147,0.12)",
    icon: Rocket,
    label: "DEPLOYMENT",
  },
];

const PHASE_CONTENT: Record<
  string,
  {
    subtitle: string;
    telemetry: string;
    steps: { number: string; title: string; description: string }[];
  }
> = {
  planning: {
    subtitle: "Establish the foundation before writing a single line of code.",
    telemetry: "STATUS: PRE-FLIGHT  |  DURATION: 2-3 WEEKS  |  RISK LEVEL: LOW",
    steps: [
      {
        number: "1.1",
        title: "Define Goals & Target Audience",
        description:
          "Determine whether the platform supports one-time donations, recurring monthly gifts, campaign-specific fundraising, or peer-to-peer giving. Profile your target audience including demographics, giving motivations, preferred payment methods, and typical donation amounts.",
      },
      {
        number: "1.2",
        title: "Legal & Compliance Assessment",
        description:
          "Ensure charitable solicitation registration in all required jurisdictions (40+ US states). Confirm PCI DSS compliance via annual SAQ A. Configure automated tax receipts (required for $250+ per IRS). Address GDPR/CCPA data privacy requirements.",
      },
      {
        number: "1.3",
        title: "Choose Platform & Technology",
        description:
          "Evaluate hosted platforms (CauseVox, Kindful, Donorbox) vs. payment gateway APIs (Stripe, PayPal, Razorpay) vs. WordPress plugins (GiveWP, Charitable) vs. fully custom builds. Consider transaction fees, recurring donation support, CRM integration, and total cost of ownership.",
      },
    ],
  },
  design: {
    subtitle:
      "Build trust and reduce friction so visitors convert into donors.",
    telemetry: "STATUS: ACTIVE  |  DURATION: 2-3 WEEKS  |  RISK LEVEL: LOW",
    steps: [
      {
        number: "2.1",
        title: "Wireframing & Information Architecture",
        description:
          "Map the donation flow to minimize steps between arrival and payment completion. Collect only essential data: name, email, amount, and payment details. Note that 65% of visitors refuse forms that ask for too much information.",
      },
      {
        number: "2.2",
        title: "Visual Design & Branding",
        description:
          "Reinforce brand identity with consistent colors, typography, and imagery. Use high-quality photos showing real impact. Add trust indicators: security badges, SSL certificate, nonprofit registration number. Include social proof: donor testimonials, total raised counter.",
      },
      {
        number: "2.3",
        title: "Mobile Optimization",
        description:
          "Ensure seamless experience across all screen sizes. Optimize form fields for touch input. Support Apple Pay and Google Pay for one-tap mobile giving. Test across iOS, Android, and tablet breakpoints.",
      },
    ],
  },
  development: {
    subtitle: "Transform designs into a functional, secure donation platform.",
    telemetry: "STATUS: ACTIVE  |  DURATION: 3-4 WEEKS  |  RISK LEVEL: MEDIUM",
    steps: [
      {
        number: "3.1",
        title: "Frontend Development",
        description:
          "Build responsive layouts with donation amount selectors, suggested giving levels, recurring donation toggles, and payment forms with real-time validation. Ensure WCAG 2.1 accessibility and implement SSL/TLS across all pages.",
      },
      {
        number: "3.2",
        title: "Payment Gateway Integration",
        description:
          "Choose between Hosted Payment Pages (easiest, gateway handles PCI), Direct API Integration (most seamless, your PCI responsibility), iFrame Integration (balanced approach), or Mobile SDK (for native apps). Implement multi-currency, receipt generation, and fraud detection.",
      },
      {
        number: "3.3",
        title: "Backend & CRM Integration",
        description:
          "Securely store transaction records and donor information. Integrate with CRM/donor management systems (Salesforce NPSP, HubSpot, CiviCRM) so every donation automatically creates or updates donor records. Build reporting infrastructure and API endpoints.",
      },
    ],
  },
  testing: {
    subtitle: "Protect your reputation with thorough pre-launch validation.",
    telemetry: "STATUS: CRITICAL  |  DURATION: 2-3 WEEKS  |  RISK LEVEL: HIGH",
    steps: [
      {
        number: "4.1",
        title: "Security & Compliance Testing",
        description:
          "Conduct penetration testing, SSL verification, PCI DSS scan, data encryption audit, privacy policy review (GDPR/CCPA), and third-party dependency audit. Verify 3D Secure authentication and fraud detection limits.",
      },
      {
        number: "4.2",
        title: "User Acceptance Testing",
        description:
          "Test one-time and recurring donations, credit card/PayPal/Apple Pay flows, suggested vs. custom amounts, memorial gifts, corporate matching, and multi-browser/device compatibility. Verify confirmation pages and tax receipt generation.",
      },
      {
        number: "4.3",
        title: "Performance & Load Testing",
        description:
          "Validate page load times under 3 seconds, payment processing under 5 seconds, 99.9% uptime during high traffic, and concurrent transaction capacity at 2x expected peak load. Mobile load time target: under 4 seconds on 4G.",
      },
    ],
  },
  launch: {
    subtitle: "Go live and continuously optimize for maximum impact.",
    telemetry:
      "STATUS: GO-LIVE  |  DURATION: 1-3 WEEKS (ONGOING)  |  RISK LEVEL: MONITORING",
    steps: [
      {
        number: "5.1",
        title: "Soft Launch & Monitoring",
        description:
          "Expose to a controlled audience first. Monitor transaction success/failure rates, error logs, webhook responses, page load metrics, bounce rates, form abandonment, and conversion rates. Resolve critical issues before full public launch.",
      },
      {
        number: "5.2",
        title: "Marketing & Promotion",
        description:
          "Drive traffic through email campaigns to existing supporters, social media promotion, SEO optimization, paid advertising (Google/Facebook Ads), press releases, and partnership promotions with corporate sponsors and matching gift programs.",
      },
      {
        number: "5.3",
        title: "Data Analysis & Continuous Improvement",
        description:
          "Analyze conversion rates by traffic source/device/amount, average donation trends, recurring gift retention, A/B testing results on page elements, seasonal giving patterns, and donation funnel drop-off points. Review weekly for first month, then monthly.",
      },
    ],
  },
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CommandModule({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>
  );
}

/* ===== LIVE COUNTDOWN TIMER (demo) ===== */
/* ===== SCROLL PROGRESS BAR ===== */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#2d6a4f] via-[#e63946] to-[#6a4c93] transition-[width] duration-150 ease-out"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

function CountdownTimer({
  initialSeconds = 2 * 3600 + 14 * 60 + 37,
}: {
  initialSeconds?: number;
}) {
  const [remaining, setRemaining] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(
      () => setRemaining(prev => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, []);
  const units = [
    String(Math.floor(remaining / 3600)).padStart(2, "0"),
    String(Math.floor((remaining % 3600) / 60)).padStart(2, "0"),
    String(remaining % 60).padStart(2, "0"),
  ];
  return (
    <div
      className="flex gap-1"
      role="timer"
      aria-label={`Matching ends in ${units[0]} hours ${units[1]} minutes ${units[2]} seconds`}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="px-1.5 py-0.5 bg-[#0d0d0d] border border-[#f77f00]/20 rounded font-mono text-[10px] font-bold text-[#f77f00]"
        >
          {unit}
        </span>
      ))}
    </div>
  );
}

/* ===== DONATION TYPES DATA ===== */
const DONATION_TYPES = [
  {
    icon: CreditCard,
    title: "One-Time Donation",
    description:
      "Single contribution to a specific cause or general fund. Donors choose their amount freely or from suggested tiers.",
    color: "#e63946",
  },
  {
    icon: Repeat,
    title: "Recurring Monthly",
    description:
      "Automatic monthly contributions that provide predictable, sustainable funding. Donors can manage frequency and amount anytime.",
    color: "#0077b6",
  },
  {
    icon: Heart,
    title: "In Memory / Tribute",
    description:
      "Donate in honor or memory of someone special. Family is notified and the honoree's name is recorded with the gift.",
    color: "#f77f00",
  },
  {
    icon: Building2,
    title: "Corporate Matching",
    description:
      "Employer doubles or triples the employee's donation. Platform verifies eligibility and tracks corporate match requests.",
    color: "#2d6a4f",
  },
  {
    icon: Coins,
    title: "Cryptocurrency",
    description:
      "Accept Bitcoin, Ethereum, and other cryptocurrencies. Auto-converted to fiat or held as digital assets per organization preference.",
    color: "#6a4c93",
  },
  {
    icon: Gift,
    title: "Planned Giving / Bequest",
    description:
      "Donations through wills, trusts, or estate plans. Includes legacy giving options with tax-advantaged charitable remainder trusts.",
    color: "#2d6a4f",
  },
  {
    icon: Users,
    title: "Peer-to-Peer Fundraising",
    description:
      "Supporters create personal fundraising pages and recruit friends, family, and social networks to contribute to a shared campaign goal.",
    color: "#0077b6",
  },
  {
    icon: HandHeart,
    title: "Crowdfunding Campaign",
    description:
      "Time-bound fundraising with a specific target amount. Progress bar visible to all visitors. Urgency drives higher conversion rates.",
    color: "#e63946",
  },
  {
    icon: Package,
    title: "In-Kind / Physical Goods",
    description:
      "Donate clothes, toys, books, electronics, furniture, food, medical supplies, or vehicles. Free pickup, drop-off, or shipping available. Every item is inspected, sorted, and matched to those in need.",
    color: "#f77f00",
  },
];

/* ===== PHYSICAL / IN-KIND DONATION CATEGORIES ===== */
const PHYSICAL_DONATION_CATEGORIES = [
  {
    icon: Shirt,
    title: "Clothing & Apparel",
    description:
      "Gently worn clothes, shoes, winter jackets, school uniforms, and safety gear. Items must be clean, unstained, and in wearable condition. Sorted by size, season, and recipient demographic.",
    color: "#0077b6",
    accepted:
      "Adult & children's clothing, shoes, belts, hats, gloves, school uniforms",
  },
  {
    icon: ToyBrick,
    title: "Toys & Children's Items",
    description:
      "New or lightly used toys, board games, puzzles, stuffed animals, and baby items (cribs, strollers, high chairs). Must meet current safety standards with no recalled items.",
    color: "#e63946",
    accepted:
      "Toys, games, books, strollers, cribs, car seats (unexpired), baby formula (sealed)",
  },
  {
    icon: BookOpen,
    title: "Books & Educational Materials",
    description:
      "Textbooks, novels, children's books, workbooks, and art supplies. Supports school libraries, literacy programs, and community learning centers. All languages welcome.",
    color: "#f77f00",
    accepted:
      "Textbooks, fiction, non-fiction, children's books, dictionaries, workbooks, art supplies",
  },
  {
    icon: Laptop,
    title: "Electronics & Devices",
    description:
      "Laptops, tablets, smartphones, desktops, monitors, and peripherals. All data must be factory-reset. Devices under 5 years old are refurbished and distributed to students or nonprofits.",
    color: "#2d6a4f",
    accepted:
      "Laptops, desktops, tablets, smartphones, monitors, keyboards, chargers, routers",
  },
  {
    icon: Sofa,
    title: "Furniture & Household Goods",
    description:
      "Tables, chairs, beds, sofas, desks, kitchen appliances, and bedding. Must be structurally sound, clean, and free of pests. Pickup available for large items within service area.",
    color: "#6a4c93",
    accepted:
      "Beds, tables, chairs, sofas, desks, dressers, lamps, kitchen appliances, cookware",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Non-Perishables",
    description:
      "Canned goods, pasta, rice, cereal, cooking oil, baby food, and hygiene products. Unopened and unexpired. Distributed through food banks and community kitchens.",
    color: "#2d6a4f",
    accepted:
      "Canned food, rice, pasta, cereal, oil, spices, baby food, soap, shampoo, toothpaste",
  },
  {
    icon: Pill,
    title: "Medical Supplies & Equipment",
    description:
      "Wheelchairs, walkers, crutches, blood pressure monitors, first-aid kits, and unopened medications. Distributed to hospitals, clinics, and disaster relief operations.",
    color: "#e63946",
    accepted:
      "Wheelchairs, walkers, crutches, monitors, first-aid kits, gloves, masks, unopened medications",
  },
  {
    icon: Car,
    title: "Vehicles & Transport",
    description:
      "Cars, motorcycles, boats, and bicycles in running or repairable condition. Tax-deductible per IRS guidelines. Proceeds from auctioned vehicles fund program operations.",
    color: "#0077b6",
    accepted:
      "Cars, trucks, motorcycles, boats, bicycles, wheelchairs (motorized), RVs",
  },
  {
    icon: Package,
    title: "Miscellaneous In-Kind",
    description:
      "Office supplies, sporting goods, musical instruments, construction materials, and event equipment. Each item is assessed for condition and matched to the most appropriate recipient program.",
    color: "#f77f00",
    accepted:
      "Office supplies, sports equipment, instruments, tools, building materials, party supplies",
  },
];

/* ===== PHYSICAL DONATION PROCESS STEPS ===== */
const PHYSICAL_DONATION_STEPS = [
  {
    step: 1,
    title: "List Your Items",
    description:
      "Browse the accepted categories above and select what you'd like to donate. Describe each item's condition (new, like-new, good, fair) and quantity.",
    icon: ClipboardList,
  },
  {
    step: 2,
    title: "Choose Collection Method",
    description:
      "Schedule a free home pickup (large items), drop off at a nearby donation center, or ship small items using a prepaid label. Same-week slots available in metro areas.",
    icon: Truck,
  },
  {
    step: 3,
    title: "Condition Check & Sorting",
    description:
      "Our team inspects each item against quality standards. Accepted items are cleaned, repaired, and sorted by category, size, and recipient program.",
    icon: CheckCircle2,
  },
  {
    step: 4,
    title: "Distribution & Impact Report",
    description:
      "Items are distributed to partner nonprofits, schools, shelters, and families in need. Donors receive a confirmation with photos showing where their items made an impact.",
    icon: PieChart,
  },
];

/* ===== DONATION FLOW STEPS ===== */
const DONATION_FLOW_STEPS = [
  {
    step: 1,
    title: "Landing Page",
    description:
      "Donor arrives via campaign link, social media, or organic search. Hero section with impact story and CTA button.",
    icon: Eye,
  },
  {
    step: 2,
    title: "Select Amount",
    description:
      "Donor chooses from preset amounts ($25, $50, $100, $250) or enters custom amount. Recurring toggle displayed prominently.",
    icon: DollarSign,
  },
  {
    step: 3,
    title: "Donor Information",
    description:
      "Minimal form: name, email, optional message. Address fields only when tax receipt is required ($250+).",
    icon: Users,
  },
  {
    step: 4,
    title: "Payment Method",
    description:
      "Credit/debit card, PayPal, Apple Pay, Google Pay, or cryptocurrency. Secure payment form with real-time validation.",
    icon: CreditCard,
  },
  {
    step: 5,
    title: "Confirmation",
    description:
      "Instant success page with receipt, tax deduction info, share buttons, and suggested next actions (recurring, volunteer, etc.).",
    icon: CheckCircle2,
  },
  {
    step: 6,
    title: "Thank You Email",
    description:
      "Automated email with receipt, impact story, and engagement content. Drip campaign follows over weeks to build relationship.",
    icon: Heart,
  },
  {
    step: 7,
    title: "Funds Allocation",
    description:
      "Donation processed, fees deducted, net amount allocated to designated program. Donor receives quarterly impact report.",
    icon: PieChart,
  },
];

/* ===== RECENT DONORS DATA ===== */
const RECENT_DONORS = [
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

const TYPE_COLORS: Record<string, string> = {
  "One-Time": "#0077b6",
  Recurring: "#2d6a4f",
  Monthly: "#6a4c93",
};

/* ===== MONTHLY LEADERBOARD DATA ===== */
const MONTHLY_LEADERBOARD = [
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
const MILESTONES = [
  { threshold: "$10,000", achieved: true, date: "Mar 15, 2026", donors: 87 },
  { threshold: "$25,000", achieved: true, date: "May 22, 2026", donors: 203 },
  { threshold: "$50,000", achieved: true, date: "Jul 8, 2026", donors: 341 },
  { threshold: "$100,000", achieved: true, date: "Aug 1, 2026", donors: 489 },
  { threshold: "$250,000", achieved: false, date: null, donors: 489 },
];

/* ===== FUND ALLOCATION DATA ===== */
const FUND_ALLOCATION = [
  {
    category: "Education Programs",
    amount: "$45,000",
    pct: 42,
    color: "#2d6a4f",
    icon: BookOpen,
    recipients: "12 schools, 3,200 students",
    detail: "Scholarships, textbooks, teacher training, school infrastructure",
  },
  {
    category: "Healthcare",
    amount: "$22,500",
    pct: 21,
    color: "#0077b6",
    icon: Stethoscope,
    recipients: "5 clinics, 8,500 patients",
    detail: "Medical supplies, vaccination drives, health education",
  },
  {
    category: "Community Development",
    amount: "$16,200",
    pct: 15,
    color: "#e63946",
    icon: HomeIcon,
    recipients: "8 villages, 2,100 families",
    detail: "Clean water, housing repairs, livelihood programs",
  },
  {
    category: "Environment & Sustainability",
    amount: "$10,800",
    pct: 10,
    color: "#2d6a4f",
    icon: Sprout,
    recipients: "3 national parks, 15,000 acres",
    detail: "Tree planting, wildlife conservation, waste management",
  },
  {
    category: "Emergency Relief",
    amount: "$5,400",
    pct: 5,
    color: "#f77f00",
    icon: Truck,
    recipients: "4 disaster zones, 1,800 families",
    detail: "Food, shelter, medical aid, temporary housing",
  },
  {
    category: "Website Maintenance & Operations",
    amount: "$7,560",
    pct: 7,
    color: "#6a4c93",
    icon: BarChart3,
    recipients: "Platform, servers, staff, legal",
    detail: "Hosting, security, compliance, CRM, staff salaries, legal fees",
  },
];

const MONTHLY_COST_BREAKDOWN = [
  {
    item: "Web Hosting & CDN",
    cost: "$89/mo",
    details: "AWS CloudFront, S3, EC2",
  },
  {
    item: "SSL Certificate",
    cost: "$0/mo",
    details: "Free via Let's Encrypt / Cloudflare",
  },
  {
    item: "Payment Gateway Fees",
    cost: "~$1,200/mo",
    details: "2.9% + $0.30 per transaction (Stripe/PayPal)",
  },
  {
    item: "CRM & Donor Management",
    cost: "$199/mo",
    details: "Salesforce NPSP / HubSpot Nonprofit",
  },
  {
    item: "Email Service Provider",
    cost: "$99/mo",
    details: "SendGrid / Mailgun transactional emails",
  },
  {
    item: "Domain & DNS",
    cost: "$12.50/mo",
    details: "Annual domain registration + DNS management",
  },
  {
    item: "Security & Compliance",
    cost: "$150/mo",
    details: "PCI DSS scanning, SSL monitoring, backup",
  },
  {
    item: "Development & Maintenance",
    cost: "$500/mo",
    details: "Bug fixes, updates, new features, QA testing",
  },
  {
    item: "Staff & Legal",
    cost: "$800/mo",
    details: "Part-time admin, legal counsel, accounting",
  },
  {
    item: "Total Monthly Operations",
    cost: "$3,049/mo",
    details: "Represents ~7% of $45,000 monthly intake",
  },
];

/* ===== IMPACT CALCULATOR — CAMPAIGN-SPECIFIC ===== */
type CampaignImpactItem = { amount: number; items: string[]; icon: string };

const CAMPAIGNS: Record<
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

const ICON_MAP: Record<string, typeof BookOpen> = {
  book: BookOpen,
  health: Stethoscope,
  env: Sprout,
  emergency: AlertTriangle,
};

function ImpactCalculator() {
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

/* ===== PHYSICAL DONATION DEMO WIDGET ===== */
function PhysicalDonationWidget() {
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

export default function Home() {
  const [activePhase, setActivePhase] = useState("planning");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    // Persist compliance checklist across visits
    try {
      const stored = localStorage.getItem("grinone-compliance");
      if (stored) return new Set(JSON.parse(stored) as string[]);
    } catch {
      // localStorage unavailable or corrupted — start fresh
    }
    return new Set();
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "grinone-compliance",
        JSON.stringify(Array.from(checkedItems))
      );
    } catch {
      // localStorage unavailable — persistence disabled
    }
  }, [checkedItems]);
  const [donorFilterCampaign, setDonorFilterCampaign] = useState("All");
  const [donorFilterType, setDonorFilterType] = useState("All");
  // Donation form state
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationStep, setDonationStep] = useState<1 | 2>(1);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState("25");
  const [donationCampaign, setDonationCampaign] =
    useState("Education Programs");
  const [donationType, setDonationType] = useState<
    "one-time" | "recurring" | "monthly"
  >("one-time");
  const [paymentMethod, setPaymentMethod] = useState<
    | "card"
    | "paypal"
    | "crypto_btc"
    | "crypto_eth"
    | "crypto_usdt"
    | "bank_transfer"
  >("card");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorMessage, setDonorMessage] = useState("");
  const [donationTxnRef, setDonationTxnRef] = useState("");
  // Donor message wall state
  const [messageName, setMessageName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageCampaign, setMessageCampaign] = useState("");

  // tRPC hooks
  const [isDonationProcessing, setIsDonationProcessing] = useState(false);
  const [isMessageProcessing, setIsMessageProcessing] = useState(false);
  // One-click donate demo state
  const [demoCurrency, setDemoCurrency] = useState("USD");
  const [demoAmount, setDemoAmount] = useState(100);
  const [demoCard, setDemoCard] = useState(0);
  const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };
  const DEMO_CARDS = [
    "•••• 4242 — Visa",
    "•••• 5555 — Mastercard",
    "Apple Pay",
  ];
  // Demo message wall entries (client-side only)
  const [demoMessages, setDemoMessages] = useState<
    Array<{ name: string; message: string; campaign: string }>
  >([]);

  // Simulated donation submission (demo only - no real payment)
  const handleDonate = () => {
    // Validate donor name
    if (!donorName.trim() && !isAnonymous) {
      toast.error("Please enter your name");
      return;
    }
    if (donorName.length > 100) {
      toast.error("Name is too long (max 100 characters)");
      return;
    }
    // Validate email format if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (donorEmail && !emailRegex.test(donorEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (donorEmail.length > 254) {
      toast.error("Email is too long");
      return;
    }
    // Validate donation amount (minimum $1, maximum $1,000,000)
    const amount = parseFloat(donationAmount);
    if (!donationAmount || isNaN(amount) || amount < 1) {
      toast.error("Minimum donation is $1.00");
      return;
    }
    if (amount > 1000000) {
      toast.error(
        "Maximum donation amount is $1,000,000. Please contact us for larger gifts."
      );
      return;
    }
    // Validate donor message length
    if (donorMessage.length > 500) {
      toast.error("Message is too long (max 500 characters)");
      return;
    }
    setIsDonationProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      const txnRef = `GRN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setDonationTxnRef(txnRef);
      setDonationStep(2);
      setIsDonationProcessing(false);
      toast.success("Thank you for your donation! (Demo)");
    }, 1500);
  };

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
      setDemoMessages(prev => [
        {
          name: messageName.trim() || "Anonymous",
          message: messageText.trim(),
          campaign: messageCampaign,
        },
        ...prev,
      ]);
      setMessageText("");
      setMessageName("");
      setIsMessageProcessing(false);
      toast.success("Message posted! (Demo)");
    }, 500);
  };

  const phaseRefs = useRef<Record<string, HTMLElement | null>>({});

  const toggleCheck = useCallback((key: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal: close on Escape + lock body scroll while open
  useEffect(() => {
    if (!showDonationModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDonationModal(false);
        setDonationStep(1);
      }
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showDonationModal]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActivePhase(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    Object.values(phaseRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (id: string) => {
    phaseRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const paymentMethodLabels: Record<
    string,
    { label: string; icon: typeof CreditCard }
  > = {
    card: { label: "Credit / Debit Card", icon: CreditCard },
    paypal: { label: "PayPal", icon: CreditCard },
    crypto_btc: { label: "Bitcoin (BTC)", icon: Bitcoin },
    crypto_eth: { label: "Ethereum (ETH)", icon: Bitcoin },
    crypto_usdt: { label: "USDT (Tether)", icon: Bitcoin },
    bank_transfer: { label: "Bank Transfer", icon: CreditCard },
  };

  const complianceItems = [
    "SSL/TLS certificate installed and enforced on all pages",
    "PCI DSS compliance confirmed (SAQ A completed annually)",
    "Charitable solicitation registrations filed in all required jurisdictions",
    "Privacy policy published with GDPR/CCPA disclosures",
    "Cookie consent mechanism implemented",
    "Data encryption at rest and in transit verified",
    "Automated tax receipts configured (required for $250+)",
    "Recurring donation terms and conditions clearly displayed",
    "Refund and cancellation policy published",
    "Nonprofit registration number and tax-exempt status displayed",
    "3D Secure / Strong Customer Authentication enabled",
    "Fraud detection and velocity limits configured",
    "Database backups scheduled and tested",
    "Incident response plan documented",
    "Staff training on data handling and privacy completed",
  ];

  const techStack = [
    {
      component: "Frontend Framework",
      options: "React, Vue.js, WordPress",
      criteria: "Team expertise, SEO needs, customization level",
    },
    {
      component: "Backend Platform",
      options: "Node.js, Laravel, Django",
      criteria: "Scalability needs, existing infrastructure",
    },
    {
      component: "Payment Gateway",
      options: "Stripe, PayPal, Razorpay",
      criteria: "Transaction fees, supported currencies, PCI handling",
    },
    {
      component: "Database",
      options: "PostgreSQL, MySQL",
      criteria: "Data volume, query complexity, hosting environment",
    },
    {
      component: "Hosting",
      options: "AWS, DigitalOcean, Vercel",
      criteria: "Traffic volume, budget, geographic requirements",
    },
    {
      component: "Email Service",
      options: "SendGrid, Mailgun, AWS SES",
      criteria: "Deliverability, automation capabilities, cost",
    },
    {
      component: "Analytics",
      options: "Google Analytics, Plausible",
      criteria: "Privacy requirements, customization needs",
    },
    {
      component: "CRM Integration",
      options: "Salesforce NPSP, HubSpot",
      criteria: "Existing systems, budget, feature requirements",
    },
  ];

  const deliverables = [
    {
      phase: "Phase 01",
      deliverable:
        "Project charter, compliance audit, technology selection document",
      role: "Project Manager / Legal",
      color: "#2d6a4f",
    },
    {
      phase: "Phase 02",
      deliverable: "Wireframes, design mockups, mobile prototypes, style guide",
      role: "UX / UI Designer",
      color: "#0077b6",
    },
    {
      phase: "Phase 03",
      deliverable:
        "Frontend code, payment integration, CRM integration, API docs",
      role: "Developer / Integration Specialist",
      color: "#e63946",
    },
    {
      phase: "Phase 04",
      deliverable:
        "Security audit report, UAT sign-off, performance test results",
      role: "QA Engineer / Security Auditor",
      color: "#f77f00",
    },
    {
      phase: "Phase 05",
      deliverable:
        "Launch plan, marketing materials, analytics dashboard, reports",
      role: "Marketing Manager / Data Analyst",
      color: "#6a4c93",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a14] text-[#e0e0e0]">
      {/* Sticky Navigation — Command Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <ScrollProgressBar />
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GrinOneLogo size={28} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-sm text-white tracking-wide">
                Grin
              </span>
              <span className="font-heading font-bold text-sm text-[#e63946] tracking-wide">
                One
              </span>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {PHASES.map(phase => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => scrollToPhase(phase.id)}
                  className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded transition-all duration-200 group"
                  aria-label={`Jump to phase ${phase.number}: ${phase.title}`}
                  style={{
                    backgroundColor: isActive
                      ? phase.colorLight
                      : "transparent",
                    border: isActive
                      ? `1px solid ${phase.color}50`
                      : "1px solid transparent",
                  }}
                >
                  <Icon
                    size={11}
                    style={{ color: isActive ? phase.color : "#555" }}
                  />
                  <span
                    className="font-mono text-[10px] font-semibold"
                    style={{ color: isActive ? phase.color : "#555" }}
                  >
                    {phase.number}
                  </span>
                </button>
              );
            })}
            {/* Demo link */}
            <button
              onClick={() =>
                document
                  .getElementById("demo-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              aria-label="Jump to live demo section"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded transition-all duration-200 group border border-[#e63946]/20"
              style={{ backgroundColor: "rgba(230,57,70,0.05)" }}
            >
              <Heart size={11} className="text-[#e63946]" />
              <span className="font-mono text-[10px] font-semibold text-[#e63946]">
                DEMO
              </span>
            </button>
            {/* Donate CTA — always visible */}
            <button
              onClick={() => setShowDonationModal(true)}
              aria-label="Open donation form"
              className="ml-1.5 flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-mono text-[10px] font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
            >
              <Heart size={11} />
              DONATE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-[#0a0a14]/70 to-[#0a0a14]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2d6a4f]/20 to-transparent" />
          <div className="absolute top-32 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0077b6]/15 to-transparent" />
          <div className="absolute bottom-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e63946]/20 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  PHASES: 05
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e63946]" />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  STEPS: 15
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f77f00]" />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  TIMELINE: 8-16 WEEKS
                </span>
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5 leading-[1.15]">
              <span className="block text-[#e63946] mb-3">GrinOne</span>
              <span className="block text-white">Donation Platform</span>
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
              A comprehensive, phase-by-phase guide covering every step required
              to plan, design, develop, test, launch, and optimize a donation
              website — powered by GrinOne.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={() => setShowDonationModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-heading text-sm font-bold shadow-lg shadow-[#e63946]/20 hover:shadow-[#e63946]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              >
                <Heart size={15} />
                Donate Now
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("demo-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.1] bg-white/[0.03] text-gray-300 font-heading text-sm font-semibold hover:bg-white/[0.06] hover:text-white transition-all duration-200 active:scale-[0.97]"
              >
                <Zap size={15} className="text-[#f77f00]" />
                Try the Live Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {PHASES.map(phase => (
                <button
                  key={phase.id}
                  onClick={() => scrollToPhase(phase.id)}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-md border transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                  style={{
                    borderColor: `${phase.color}30`,
                    backgroundColor: `${phase.color}08`,
                  }}
                >
                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: phase.color }}
                  >
                    {phase.number}
                  </span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {phase.title}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-gray-600 group-hover:text-gray-400 transition-colors"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase Sections */}
      {PHASES.map(phase => {
        const content = PHASE_CONTENT[phase.id];
        const PhaseIcon = phase.icon;
        return (
          <section
            key={phase.id}
            id={phase.id}
            ref={el => {
              phaseRefs.current[phase.id] = el;
            }}
            className="relative py-14 md:py-18 scroll-mt-14"
            style={{ borderLeft: `3px solid ${phase.color}` }}
          >
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <AnimatedSection>
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${phase.color}18`,
                        border: `1px solid ${phase.color}35`,
                      }}
                    >
                      <PhaseIcon size={20} style={{ color: phase.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-widest"
                          style={{
                            backgroundColor: `${phase.color}15`,
                            color: phase.color,
                          }}
                        >
                          {phase.label}
                        </span>
                        <span className="font-mono text-[10px] text-gray-600 tracking-wider">
                          PHASE {phase.number}
                        </span>
                      </div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-white">
                        {phase.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-14 mb-3">
                    <Signal size={12} className="text-gray-600" />
                    <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                      {content.telemetry}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 ml-14">
                    {content.subtitle}
                  </p>
                </div>
                <div className="space-y-4 mb-8">
                  {content.steps.map((step, idx) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      className="relative pl-5"
                      style={{ borderLeft: `2px solid ${phase.color}30` }}
                    >
                      <div
                        className="absolute -left-[5px] top-2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      />
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-md p-4 hover:bg-white/[0.04] transition-colors duration-200">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${phase.color}10`,
                              color: phase.color,
                            }}
                          >
                            {step.number}
                          </span>
                          <h3 className="font-heading text-sm font-semibold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      {/* ===== NEW: DONATION FLOW ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DONATION FLOW
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              How a Donation Reaches Its Destination
            </h2>
            <p className="text-xs text-gray-500 mb-8">
              SYS.REF: END-TO-END JOURNEY FROM DONOR CLICK TO FUNDS DEPLOYED — 7
              CRITICAL STEPS
            </p>

            {/* Flow Diagram — Desktop: horizontal, Mobile: vertical */}
            <div className="hidden md:block overflow-x-auto pb-2">
              <div className="flex items-start gap-0 min-w-max mx-auto w-fit">
                {DONATION_FLOW_STEPS.map((item, i) => {
                  const StepIcon = item.icon;
                  return (
                    <div key={item.step} className="flex items-start">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex flex-col items-center text-center w-[130px]"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                          style={{
                            backgroundColor: `rgba(230,57,70,0.12)`,
                            border: `1px solid rgba(230,57,70,0.25)`,
                          }}
                        >
                          <StepIcon size={18} className="text-[#e63946]" />
                        </div>
                        <span className="font-mono text-[9px] text-gray-500 mb-1">
                          STEP {item.step}
                        </span>
                        <span className="font-heading text-[11px] font-semibold text-white mb-1">
                          {item.title}
                        </span>
                        <span className="text-[9px] text-gray-500 leading-tight">
                          {item.description}
                        </span>
                      </motion.div>
                      {i < DONATION_FLOW_STEPS.length - 1 && (
                        <div className="flex items-center pt-4 shrink-0">
                          <ArrowRight size={14} className="text-gray-700" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical flow */}
            <div className="md:hidden space-y-0">
              {DONATION_FLOW_STEPS.map((item, i) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative pl-6"
                    style={{
                      borderLeft:
                        i < DONATION_FLOW_STEPS.length - 1
                          ? `2px solid rgba(230,57,70,0.25)`
                          : `2px solid transparent`,
                    }}
                  >
                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#e63946]" />
                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-md p-3 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <StepIcon size={14} className="text-[#e63946]" />
                        <span className="font-mono text-[9px] text-gray-500">
                          STEP {item.step}
                        </span>
                      </div>
                      <span className="font-heading text-xs font-semibold text-white">
                        {item.title}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== NEW: DONATION TYPES ===== */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DONATION TYPES
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              All Donation Types Accepted
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: SUPPORT EVERY GIVING METHOD TO MAXIMIZE DONOR
              PARTICIPATION
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {DONATION_TYPES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
                      style={{
                        backgroundColor: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <h3 className="font-heading text-xs font-semibold text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ===== PHYSICAL / IN-KIND DONATIONS ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Package size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: PHYSICAL DONATIONS
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Donate Physical Items & Goods
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: NOT JUST MONEY — CLOTHES, TOYS, BOOKS, ELECTRONICS & MORE
            </p>

            {/* Physical donation process flow */}
            <div className="mb-8">
              <h3 className="font-heading text-sm font-semibold text-white mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PHYSICAL_DONATION_STEPS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[9px] font-bold text-[#f77f00] bg-[#f77f00]/10 px-1.5 py-0.5 rounded">
                          STEP {item.step}
                        </span>
                      </div>
                      <h4 className="font-heading text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Icon size={14} className="text-[#f77f00]" />
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Physical donation category cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PHYSICAL_DONATION_CATEGORIES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
                      style={{
                        backgroundColor: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <h3 className="font-heading text-xs font-semibold text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="border-t border-white/[0.05] pt-2 mt-2">
                      <p className="font-mono text-[8px] text-gray-600 uppercase tracking-wider mb-1">
                        We Accept:
                      </p>
                      <p className="text-[9px] text-gray-400 leading-relaxed">
                        {item.accepted}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ===== NEW: DONATION DETAILS DASHBOARD ===== */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <PieChart size={16} className="text-[#2d6a4f]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: FUND ALLOCATION
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Where Your Donations Go
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: FULL TRANSPARENCY — TRACKING EVERY DOLLAR FROM DONOR TO
              IMPACT
            </p>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
              {[
                {
                  label: "Total Raised",
                  value: "$107,460",
                  sub: "All-time contributions",
                  color: "#2d6a4f",
                },
                {
                  label: "Active Programs",
                  value: "32",
                  sub: "Across 5 categories",
                  color: "#0077b6",
                },
                {
                  label: "Beneficiaries",
                  value: "30,600",
                  sub: "People directly helped",
                  color: "#e63946",
                },
                {
                  label: "Admin Overhead",
                  value: "7%",
                  sub: "Below industry avg of 15%",
                  color: "#6a4c93",
                },
              ].map((stat, i) => (
                <CommandModule key={i} className="p-3 text-center">
                  <div className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="font-heading text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-gray-600 mt-0.5">
                    {stat.sub}
                  </div>
                </CommandModule>
              ))}
            </div>

            {/* Allocation breakdown */}
            <CommandModule className="p-4">
              <div className="space-y-4">
                {FUND_ALLOCATION.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon size={14} style={{ color: item.color }} />
                          <span className="text-xs font-medium text-white">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-500 hidden sm:block">
                            {item.recipients}
                          </span>
                          <span
                            className="font-mono text-xs font-semibold"
                            style={{ color: item.color }}
                          >
                            {item.amount}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">
                            {item.pct}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                      <p className="text-[9px] text-gray-600 mt-1">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== NEW: TRANSPARENCY / COST BREAKDOWN ===== */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: TRANSPARENCY
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Website Maintenance & Cost Breakdown
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: FULL DISCLOSURE OF OPERATIONAL COSTS — EVERY PENNY
              ACCOUNTED FOR
            </p>

            {/* Visual cost split */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#2d6a4f]" />
                  <span className="text-xs text-gray-400">93% to Programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#6a4c93]" />
                  <span className="text-xs text-gray-400">
                    7% for Operations
                  </span>
                </div>
              </div>
              <div className="w-full h-4 bg-white/[0.04] rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "93%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-l-full bg-[#2d6a4f]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "7%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-r-full bg-[#6a4c93]"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-mono text-[9px] text-[#2d6a4f]">
                  $99,900 / YEAR TO PROGRAMS
                </span>
                <span className="font-mono text-[9px] text-[#6a4c93]">
                  $7,560 / YEAR TO OPERATIONS
                </span>
              </div>
            </div>

            {/* Monthly cost table */}
            <CommandModule>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Expense
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Monthly Cost
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHLY_COST_BREAKDOWN.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i === MONTHLY_COST_BREAKDOWN.length - 1 ? "bg-white/[0.03] font-semibold" : ""}`}
                      >
                        <td className="px-4 py-2.5 text-gray-300">
                          {row.item}
                        </td>
                        <td
                          className="px-4 py-2.5 font-mono"
                          style={{
                            color:
                              i === MONTHLY_COST_BREAKDOWN.length - 1
                                ? "#f77f00"
                                : "#e0e0e0",
                          }}
                        >
                          {row.cost}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell">
                          {row.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CommandModule>

            {/* Transparency note */}
            <div className="mt-4 rounded-lg border border-[#2d6a4f]/20 bg-[#2d6a4f]/5 p-4">
              <div className="flex items-start gap-3">
                <Eye size={16} className="text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-xs font-semibold text-white mb-1">
                    Our Transparency Commitment
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    We believe in complete transparency. 93% of every dollar
                    donated goes directly to programs and causes. Only 7% covers
                    essential operations including hosting, security, payment
                    processing, and a small team that manages the platform. We
                    publish quarterly financial reports and annual audited
                    statements. Every donor receives a quarterly impact report
                    showing exactly where their contribution went.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Essential Features Checklist */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare size={16} className="text-[#6a4c93]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: FEATURE GAPS — MISSING ESSENTIALS
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Essential Donation Platform Features
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: COMPLETE CHECKLIST — FEATURES EVERY DONATION PLATFORM
              MUST INCLUDE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Trust & Compliance",
                  items: [
                    "EIN number displayed",
                    "Tax-deductible statement",
                    "SSL certificate badge",
                    "Privacy policy link",
                    "Form 990 public access",
                    "PCI DSS badge",
                    "GDPR cookie consent",
                  ],
                },
                {
                  title: "Donor Experience",
                  items: [
                    "One-click donate (saved cards)",
                    "Apple Pay / Google Pay",
                    "Text-to-give (SMS)",
                    "Progress thermometer",
                    "Countdown timer for campaigns",
                    "Multi-currency support",
                    "Guest checkout (no account needed)",
                  ],
                },
                {
                  title: "Social & Sharing",
                  items: [
                    "Social share after donation",
                    "Referral tracking links",
                    "Peer-to-peer campaign pages",
                    "Donor wall of honor",
                    "Honorary/tribute giving",
                    "Corporate matching lookup",
                    "LinkedIn donate button",
                  ],
                },
                {
                  title: "Engagement & Retention",
                  items: [
                    "Recurring donation management",
                    "Donor portal (view history)",
                    "Impact report delivery",
                    "Welcome email series",
                    "Lapsed donor re-engagement",
                    "Birthday/anniversary asks",
                    "Upgrade prompts for monthly donors",
                  ],
                },
                {
                  title: "Security & Fraud",
                  items: [
                    "AVS (address verification)",
                    "3D Secure authentication",
                    "Velocity checks",
                    "Risk scoring engine",
                    "Chargeback management",
                    "Duplicate donation detection",
                    "Fraud alert notifications",
                  ],
                },
                {
                  title: "Admin & Operations",
                  items: [
                    "Bulk receipt generation",
                    "Donor data export (CSV/Excel)",
                    "Custom report builder",
                    "Board-level dashboards",
                    "Event ticketing integration",
                    "Volunteer sign-up link",
                    "Legacy/planned giving portal",
                  ],
                },
              ].map((category, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4"
                >
                  <h4 className="text-xs font-semibold text-white mb-3 font-heading">
                    {category.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckSquare
                          size={11}
                          className="text-[#2d6a4f] mt-0.5 shrink-0"
                        />
                        <span className="text-[10px] text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Globe size={16} className="text-[#0077b6]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: PLATFORM ANALYSIS
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Platform & Technology Comparison
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: EVALUATE APPROACH — HOSTED VS API VS PLUGIN VS CUSTOM
            </p>
            <CommandModule>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Examples
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Advantages
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Limitations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        type: "Hosted Platforms",
                        examples: "CauseVox, Kindful, Donorbox",
                        pros: "Quick setup, built-in compliance, CRM integration",
                        cons: "Less customization, monthly fees",
                      },
                      {
                        type: "Payment Gateway (API)",
                        examples: "Stripe, PayPal, Razorpay",
                        pros: "Full control, lower fees at scale",
                        cons: "Requires dev resources, PCI responsibility",
                      },
                      {
                        type: "WordPress + Plugin",
                        examples: "GiveWP, Charitable",
                        pros: "Flexible, large plugin ecosystem",
                        cons: "Maintenance burden, plugin compatibility",
                      },
                      {
                        type: "Custom-Built",
                        examples: "React/Node.js, Laravel, Django",
                        pros: "Complete control, unique features",
                        cons: "Highest cost, longest timeline, full PCI",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-200">
                          {row.type}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 font-mono text-[10px]">
                          {row.examples}
                        </td>
                        <td className="px-4 py-2.5 text-green-400/80">
                          {row.pros}
                        </td>
                        <td className="px-4 py-2.5 text-red-400/70">
                          {row.cons}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: PRE-LAUNCH CHECKLIST
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Compliance & Security Checklist
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              STATUS: {checkedItems.size}/{complianceItems.length} VERIFIED —
              VERIFY ALL BEFORE DEPLOYMENT
            </p>
            <CommandModule className="p-1">
              <div className="space-y-0.5 p-2">
                {complianceItems.map((item, i) => {
                  const key = `compliance-${i}`;
                  const isChecked = checkedItems.has(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/[0.03] transition-all text-left w-full group"
                    >
                      {isChecked ? (
                        <CheckSquare
                          size={15}
                          className="text-green-500 shrink-0"
                        />
                      ) : (
                        <Square
                          size={15}
                          className="text-gray-600 shrink-0 group-hover:text-gray-400 transition-colors"
                        />
                      )}
                      <span
                        className={`text-xs transition-colors ${isChecked ? "text-gray-500 line-through" : "text-gray-300"}`}
                      >
                        {item}
                      </span>
                      {isChecked && (
                        <span className="font-mono text-[9px] text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          OK
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Database size={16} className="text-[#2d6a4f]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: INFRASTRUCTURE
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Recommended Technology Stack
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: SELECT COMPONENTS FOR EACH LAYER OF THE DONATION PLATFORM
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {techStack.map((item, i) => (
                <CommandModule key={i} className="p-4">
                  <div className="font-heading text-xs font-semibold text-white mb-1">
                    {item.component}
                  </div>
                  <div className="font-mono text-[10px] text-[#0077b6] mb-1.5">
                    {item.options}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Decision criteria: {item.criteria}
                  </div>
                </CommandModule>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-[#6a4c93]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: DELIVERABLES
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Key Deliverables by Phase
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: OUTPUT SPECIFICATIONS AND RESPONSIBLE PARTIES PER PHASE
            </p>
            <CommandModule>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Phase
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Key Deliverable
                      </th>
                      <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        Responsible Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliverables.map((d, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-2.5">
                          <span
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${d.color}15`,
                              color: d.color,
                            }}
                          >
                            {d.phase}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-300">
                          {d.deliverable}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500">{d.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Timer size={16} className="text-[#e63946]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: MISSION TIMELINE
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Estimated Timeline
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: TOTAL MISSION DURATION — 8 TO 16 WEEKS DEPENDENT ON
              COMPLEXITY
            </p>
            <CommandModule className="p-4">
              <div className="space-y-4">
                {[
                  {
                    phase: "Phase 01: Planning & Strategy",
                    duration: "2-3 weeks",
                    pct: 20,
                    color: "#2d6a4f",
                  },
                  {
                    phase: "Phase 02: Design & UX",
                    duration: "2-3 weeks",
                    pct: 20,
                    color: "#0077b6",
                  },
                  {
                    phase: "Phase 03: Development & Integration",
                    duration: "3-4 weeks",
                    pct: 30,
                    color: "#e63946",
                  },
                  {
                    phase: "Phase 04: Testing & QA",
                    duration: "2-3 weeks",
                    pct: 20,
                    color: "#f77f00",
                  },
                  {
                    phase: "Phase 05: Launch & Optimization",
                    duration: "1-3 weeks (ongoing)",
                    pct: 15,
                    color: "#6a4c93",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-300">
                        {item.phase}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">
                        {item.duration}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.12 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-600">
                  MISSION_STATUS: FULL_ROADMAP
                </span>
                <span className="font-mono text-[10px] text-gray-600">
                  COMPLEXITY: MEDIUM_TO_HIGH
                </span>
              </div>
            </CommandModule>
          </AnimatedSection>
        </div>
      </section>

      {/* Common Issues & Solutions */}
      <section className="py-14 md:py-18 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                MODULE: TROUBLESHOOTING
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              Common Issues & Solutions
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: KNOWN PROBLEMS — DIAGNOSE & RESOLVE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: AlertTriangle,
                  color: "#e63946",
                  issue: "Payment Gateway Integration Fails",
                  solution:
                    "Verify API keys are correctly configured. Test in sandbox mode before going live. Ensure webhook URLs are publicly accessible and return 200 status. Check that PCI DSS compliance requirements are met.",
                  detail:
                    "Common cause: Missing or incorrect secret keys, unverified webhook endpoints",
                },
                {
                  icon: ShieldAlert,
                  color: "#e63946",
                  issue: "PCI DSS Compliance Errors",
                  solution:
                    "Use Stripe/PayPal hosted checkout or embedded forms (SAQ A). Never store raw card numbers. Enable TLS 1.2+ on all endpoints. Conduct quarterly vulnerability scans.",
                  detail:
                    "Most common: Storing card data on own servers instead of using tokenization",
                },
                {
                  icon: GlobeOffIcon,
                  color: "#e63946",
                  issue: "Charitable Registration Missing",
                  solution:
                    "Register in all states where you solicit donations (40+ US states). Use services like Harbor Compliance. Renew registrations annually. Display registration numbers on the donation page.",
                  detail:
                    "Common cause: Assuming federal 501(c)(3) status covers all state requirements",
                },
                {
                  icon: MailX,
                  color: "#e63946",
                  issue: "Tax Receipts Not Generated",
                  solution:
                    "Configure automated receipt generation via your payment processor (Stripe/PayPal). Include: donor name, date, amount, organization EIN, statement that no goods/services were provided in exchange.",
                  detail: "Required for donations of $250+ per IRS guidelines",
                },
                {
                  icon: Clock,
                  color: "#f77f00",
                  issue: "Slow Page Load on Donation Page",
                  solution:
                    "Lazy-load images below the fold. Use CDN for static assets. Minimize JavaScript bundles. Pre-connect to payment gateway domains. Aim for under 3-second load time.",
                  detail:
                    "Impact: Every 1-second delay reduces conversion by 7%",
                },
                {
                  icon: Smartphone,
                  color: "#f77f00",
                  issue: "Mobile Form Errors",
                  solution:
                    "Use responsive input fields with proper input types (email, tel, number). Avoid horizontal scrolling. Test on real devices (iOS Safari, Android Chrome). Keep form under 4 visible fields on mobile.",
                  detail:
                    "Common cause: Fixed-width containers, missing viewport meta tag",
                },
                {
                  icon: UserX,
                  color: "#0077b6",
                  issue: "Low Donation Conversion Rate",
                  solution:
                    "Reduce form fields to minimum (name, email, amount, payment). Add suggested amount buttons. Show trust badges (SSL, PCI, nonprofit registration). Add social proof (recent donors, impact stats). A/B test CTA button text.",
                  detail:
                    "Benchmark: 1-3% of visitors donate; top performers achieve 5%+",
                },
                {
                  icon: DatabaseIcon,
                  color: "#0077b6",
                  issue: "Donor Data Not Syncing to CRM",
                  solution:
                    "Use Zapier or native integrations (Salesforce Nonprofit, HubSpot, DonorPerfect). Map fields consistently. Set up retry logic for failed syncs. Validate data before insertion.",
                  detail:
                    "Common cause: Missing field mapping, API rate limits, duplicate records",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Icon size={14} style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white mb-1">
                          {item.issue}
                        </h4>
                        <p className="text-[10px] text-gray-400 mb-1.5 leading-relaxed">
                          {item.solution}
                        </p>
                        <p className="font-mono text-[8px] text-gray-600">
                          ⚠ {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== DEMO SECTION SEPARATOR ===== */}
      <div
        id="demo-section"
        className="border-y border-[#e63946]/15 bg-gradient-to-r from-transparent via-[#e63946]/[0.04] to-transparent py-6 scroll-mt-14"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e63946]/30" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-[#e63946] uppercase">
              Live Demo Zone
            </span>
            <span className="px-2 py-0.5 rounded-full border border-[#e63946]/30 bg-[#e63946]/10 font-mono text-[8px] text-[#e63946]">
              DEMO
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e63946]/30" />
        </div>
      </div>

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
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[#2d6a4f] font-bold">
                      $847,200 raised
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      Goal: $1,000,000
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] transition-all duration-1000"
                      style={{ width: "84.7%" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-gray-500 font-mono">
                      12,458 donors
                    </span>
                    <span className="text-[9px] font-bold text-[#f77f00] font-mono">
                      84.7% complete
                    </span>
                  </div>
                </div>

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
                    onClick={() => setShowDonationModal(true)}
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

      {/* ===== IMPACT CALCULATOR ===== */}
      <section className="py-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <ImpactCalculator />
          </AnimatedSection>
        </div>
      </section>

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
            <p className="text-xs text-gray-500 mb-6">
              SYS.REF: DEMO FEED — SAMPLE DATA FOR ILLUSTRATION PURPOSES
            </p>

            {/* Top Donor Spotlight */}
            {(() => {
              const parseAmount = (a: string) =>
                parseInt(a.replace(/[$,]/g, ""), 10);
              const topDonor = RECENT_DONORS.reduce((max, d) =>
                parseAmount(d.amount) > parseAmount(max.amount) ? d : max
              );
              const recentTotal = RECENT_DONORS.reduce(
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
                <span className="text-white font-semibold">489 donors</span> who
                have already made an impact.
              </p>
              <button
                onClick={() => setShowDonationModal(true)}
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
                  onChange={e => setDonorFilterCampaign(e.target.value)}
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
                  }}
                  className="font-mono text-[9px] text-[#e63946] hover:text-white underline transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
            {(() => {
              const filteredDonors = RECENT_DONORS.filter(
                d =>
                  (donorFilterCampaign === "All" ||
                    d.campaign === donorFilterCampaign) &&
                  (donorFilterType === "All" || d.type === donorFilterType)
              );
              const filteredTotal = filteredDonors.reduce((sum, d) => {
                const num = parseInt(d.amount.replace(/[$,]/g, ""), 10);
                return sum + num;
              }, 0);
              return (
                <>
                  <CommandModule className="p-1">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                            <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                              Donor
                            </th>
                            <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                              Date
                            </th>
                            <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider hidden md:table-cell">
                              Campaign
                            </th>
                            <th className="text-left px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDonors.map((donor, i) => (
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
                      Showing {filteredDonors.length} of {RECENT_DONORS.length}{" "}
                      donations
                    </span>
                    <span className="font-mono text-[10px] text-white font-semibold">
                      Total:{" "}
                      <span className="text-green-400">
                        ${filteredTotal.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </>
              );
            })()}

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
      {/* ===== PHYSICAL DONATION DEMO ===== */}
      <section className="py-10 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-1">
              <Package size={14} className="text-[#f77f00]" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                DEMO: ITEM DONATION WIDGET
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#f77f00]/30 bg-[#f77f00]/10 font-mono text-[8px] text-[#f77f00]">
                DEMO
              </span>
            </div>
            <h2 className="font-heading text-sm font-bold text-white mb-1">
              Schedule a Physical Donation
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Interactive mock — try selecting items, condition, and collection
              method
            </p>
            <PhysicalDonationWidget />
          </AnimatedSection>
        </div>
      </section>
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

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full bg-[#e63946]/90 hover:bg-[#e63946] text-white flex items-center justify-center shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 active:scale-95 border border-[#e63946]/50"
        >
          <ChevronRight size={16} className="rotate-[-90deg]" />
        </button>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GrinOneLogo size={20} />
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-bold text-xs text-gray-400">
                  Grin
                </span>
                <span className="font-heading font-bold text-xs text-[#e63946]">
                  One
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 tracking-wider">
              <Activity size={12} />
              <span>BUILD — TEST — LAUNCH — OPTIMIZE — SCALE</span>
            </div>
            <div className="text-[10px] text-gray-600">
              © {new Date().getFullYear()}{" "}
              <span className="text-gray-400 font-semibold">GrinOne</span>{" "}
              &middot; Built for transparent, impactful giving
            </div>
          </div>
        </div>
      </footer>

      {/* ===== DONATION MODAL ===== */}
      {showDonationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => {
            setShowDonationModal(false);
            setDonationStep(1);
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
                setShowDonationModal(false);
                setDonationStep(1);
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
                    setShowDonationModal(false);
                    setDonationStep(1);
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
    </div>
  );
}
