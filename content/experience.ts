import { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    role: "Machine Learning Engineer",
    org: "HusQuay Solutions",
    location: "Remote, via Crew Innovations, Faisalabad",
    period: "Dec 2024 - Present",
    bullets: [
      "Built and shipped computer vision and ML features for a production property-tech SaaS platform serving US customers.",
      "Diagnosed the main accuracy bottleneck in an image-understanding pipeline and redesigned it into a multi-stage detection, segmentation and vision-language model pipeline, improving fine-grained classification with zero hallucinated outputs in early validation.",
      "Replaced a planned GPU retraining cycle with an API-driven inference approach, cutting iteration time and compute cost.",
      "Owned the ML pipeline end to end, from raw image upload to automated, customer-ready output in a live production system.",
      "Shipped via FastAPI and Docker with MLflow model versioning and GitHub Actions CI/CD, working closely with product and engineering teams.",
    ],
  },
  {
    role: "Full Stack Engineer",
    org: "Freelance (Self-employed)",
    location: "Faisalabad, Pakistan · Remote",
    period: "June 2024 - Present",
    bullets: [
      "Built and deployed multiple full-stack websites end to end (design, frontend, CMS integration, deployment) for local and international businesses, including content-heavy platforms with searchable catalogues and admin-managed content.",
      "Delivered data analysis projects for businesses: scraped and cleaned market data, mapped competitors and demand by area, and turned the results into recommendations on underserved markets.",
      "Took each project through structured client feedback rounds, from first prototype to final handover.",
    ],
  },
  {
    role: "Data Analyst Intern",
    org: "TAKMIL",
    location: "Louisville, Kentucky, USA (Remote)",
    period: "2024",
    bullets: [
      "Cleaned and analyzed large-scale datasets via Python (Pandas, NumPy, SQL) and built Power BI dashboards.",
      "Proposed optimizations that improved workflow efficiency by 30%.",
    ],
  },
];
