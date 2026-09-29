export type Service = {
  key: string;
  title: string;
  img: string;
  alt: string;
  intro: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    key: "finance",
    title: "Finance Services",
    img: "/assets/photo-finance.jpg",
    alt: "Advisor on a call at his desk",
    intro:
      "Planning, compliance and advisory that strengthen financial performance and support confident, strategic decisions.",
    items: [
      "Financial Planning & Budgeting",
      "Tax Advisory & Compliance",
      "Audit & Assurance Services — Internal Audits",
      "Investment Advisory",
      "Corporate Finance Advisory",
      "Business Performance, Strategy Consulting & Capacity Building",
    ],
  },
  {
    key: "actuarial",
    title: "Actuarial Services",
    img: "/assets/photo-actuarial.jpg",
    alt: "Two analysts reviewing data on a laptop",
    intro:
      "Actuarial precision applied to forecast, quantify and safeguard the future of your organisation.",
    items: [
      "Data Collection & Cleaning",
      "Statistical & Risk Analysis Support",
      "Financial Modeling Assistance",
      "Reporting & Documentation",
      "Compliance & Regulatory Support",
      "Client Support & Presentations",
    ],
  },
  {
    key: "it",
    title: "IT Services",
    img: "/assets/photo-office.jpg",
    alt: "Modern office workstations",
    intro:
      "User interfaces and responsive websites — from wireframes to high-fidelity mocks and prototypes.",
    items: [
      "Design wireframes, user flows and interactive prototypes in Figma to explore and communicate ideas.",
      "Build responsive websites using WordPress, Elementor, HTML, CSS, JavaScript and other front-end technologies.",
      "Build and edit WordPress websites using Elementor Pro, JetEngine, JetSmartFilters, JetFormBuilder and WPML.",
      "Build and customise Shopify websites including shopfront layouts, content and user experience.",
    ],
  },
];

// TODO: replace the placeholder photos with industry-specific images,
// and review the descriptions.
export const INDUSTRIES = [
  {
    name: "Financial Services",
    img: "/assets/photo-finance.jpg",
    description:
      "Risk, regulatory reporting and actuarial support for banks, insurers, pension funds and microfinance institutions.",
  },
  {
    name: "Technology, Media & Telecoms",
    img: "/assets/photo-office.jpg",
    description:
      "Financial planning, systems implementation and growth strategy for fast-moving tech and telecoms businesses.",
  },
  {
    name: "Real Estate, Building & Infrastructure",
    img: "/assets/photo-contact.jpg",
    description:
      "Project finance, feasibility studies and valuations that keep developments and infrastructure on a sound footing.",
  },
  {
    name: "Energy & Resources",
    img: "/assets/photo-actuarial.jpg",
    description:
      "Modelling, cost control and risk management for mining, energy and agricultural operations.",
  },
  {
    name: "Government & Public Sector",
    img: "/assets/photo-team.jpg",
    description:
      "Public finance management, digital transformation and pension scheme advisory for public institutions.",
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");
