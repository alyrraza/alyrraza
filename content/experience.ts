import { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    role: "ML Engineer",
    org: "HusQuay Solutions",
    location: "Remote, US-based Client",
    period: "2025 - Present",
    bullets: [
      "Designed end-to-end ML pipelines, preprocessing, training, evaluation, and scalable production deployment via FastAPI and Docker with real-time model performance monitoring.",
      "Built and deployed a YOLOv8 computer vision system: an inference-optimized REST API, containerized with Docker, GPU deployment on Vast.ai, integrated with a React frontend on Vercel.",
      "Trained computer vision and classification models for a production AI SaaS platform automating property tax depreciation studies for US clients.",
      "Integrated open-source detection/segmentation models with third-party VLM/LLM APIs into a unified inference pipeline, replacing planned GPU retraining with an API-driven approach.",
      "Owned ML pipeline architecture end-to-end, from raw image input to report-ready output, shipping features directly into a live production system.",
      "Fine-tuned LLMs (LoRA/QLoRA) via HuggingFace PEFT; built RAG pipelines with LangChain, FAISS, and Pinecone for document intelligence systems.",
      "Maintained MLflow experiment tracking and model versioning; automated deployments via CI/CD pipelines using GitHub Actions.",
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
