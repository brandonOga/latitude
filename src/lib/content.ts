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
      "Work with clients and project teams to understand requirements and solve design and technical problems.",
      "Participate in projects from planning through UX design, development, testing and continuous improvement.",
    ],
  },
];

export const INDUSTRIES = [
  "Financial Services",
  "Technology, Media & Telecoms",
  "Real Estate, Building & Infrastructure",
  "Energy & Resources",
  "Government & Public Sector",
];

export const pad = (n: number) => String(n).padStart(2, "0");
