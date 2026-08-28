import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  Eye,
  Users,
} from "lucide-react";
import {
  CreditCard,
  Repeat,
  Gift,
  Building2,
  Coins,
  PieChart,
  Heart,
  HandHeart,
  Truck,
  Package,
  BookOpen,
  Stethoscope,
  Sprout,
  Home as HomeIcon,
  Star,
  Shirt,
  ToyBrick,
  Laptop,
  Sofa,
  Car,
  UtensilsCrossed,
  Pill,
  Globe,
  Database,
  Lock,
} from "lucide-react";

/* ===== DONATION TYPES DATA ===== */
export const DONATION_TYPES = [
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

export const PHYSICAL_DONATION_CATEGORIES = [
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

export const PHYSICAL_DONATION_STEPS = [
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

export const DONATION_FLOW_STEPS = [
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

/* ===== FUND ALLOCATION DATA ===== */
export const FUND_ALLOCATION = [
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

export const MONTHLY_COST_BREAKDOWN = [
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
