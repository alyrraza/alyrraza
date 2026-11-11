import { Profile } from "@/types";

export const profile: Profile = {
  name: "Ali Raza",
  monogram: "AR",
  photo: "/profile/ali-raza.jpg",
  taglines: {
    research:
      "Researching multimodal deep learning for trustworthy medical AI.",
    engineering:
      "Shipping production ML systems across vision, voice, and agentic AI.",
  },
  bio: [
    "I'm a final-year BSc Computer Science student at FAST-NUCES Faisalabad (graduating 2026) and a freelance engineer since 2023, building production ML systems and full-stack web products for local and international clients, across computer vision, medical AI, NLP, voice, and agentic workflows, end to end from data and training through deployment and monitoring.",
    "My work spans two registers: research rigor, multimodal error detection in AI-generated radiology reports, GAN-based disease progression modeling, a co-authored hybrid transformer and CNN abstract accepted at ACR 2026, and a training-free lung CT registration method accepted at Learn2Reg 2026 (MICCAI) with an invited oral presentation, and production engineering: FastAPI services, Kubernetes deployments, MLOps pipelines, and RAG and voice agents shipped for real users. I care about systems that are useful, measurable, and honest about where they fail.",
  ],
  email: "mirzaalirazafsd@gmail.com",
  socials: {
    github: "https://github.com/alyrraza/",
    huggingFace: "https://huggingface.co/alyrraza",
    kaggle: "https://www.kaggle.com/f223399mirzaaliraza",
    linkedin: "https://www.linkedin.com/in/ali-raza-0a1282281/",
  },
  cvs: {
    aiEngineer: "/cvs/ai-engineer.pdf",
    mlEngineer: "/cvs/ml-engineer.pdf",
    research: "/cvs/research.pdf",
  },
  education: [
    {
      degree: "BSc Computer Science",
      school: "FAST-NUCES, Faisalabad",
      period: "2022 - 2026",
      detail: "Thesis: RadGuard, Multimodal Error Detection in AI-Generated Radiology Reports.",
    },
  ],
  publications: [
    {
      citation:
        "Khan MM, Raza A, Ahmad F, Mansoor A. “Generalizable detection of cardiac implantable devices using a hybrid transformer and convolutional neural network framework.”",
      venue: "ACR 2026 Annual Meeting, American College of Radiology, Washington DC, May 2026 (abstract and poster)",
      status: "Accepted",
      link: "https://e732fa66e3fe6db28bf3-86df353d44a6c65fafef6090f322fde2.ssl.cf1.rackcdn.com//3392642-1773940722.pdf",
    },
    {
      citation:
        "Raza A. “Inter-Lobe Boundary Channels and Localised Folding Repair for Expiration to Inspiration Lung CT Registration.”",
      venue: "Learn2Reg 2026 Challenge, MICCAI 2026, Strasbourg. Invited oral presentation and poster.",
      status: "Accepted",
      link: "https://openreview.net/forum?id=nFNQaSDcO6",
    },
  ],
  service: [
    "Co-Head, Hackathon, ACM Society, Daira 2025",
    "Member, ACM Society Management Team, Daira 2024",
  ],
};
