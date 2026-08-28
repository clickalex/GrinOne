import { Target, Monitor, Code2, Shield, Rocket } from "lucide-react";

// Phase color map
export const PHASES = [
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

export const PHASE_CONTENT: Record<
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
