export type Lens = "research" | "engineering";

export type ProjectStatus =
  | "live"
  | "demo-video"
  | "screenshots"
  | "paper"
  | "case-study";

export interface ProjectMedia {
  type: "video" | "image" | "diagram";
  src: string;
  caption?: string;
  fit?: "cover" | "contain";
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  descriptions: {
    research: string;
    engineering: string;
  };
  lenses: Lens[];
  tags: string[];
  status: ProjectStatus[];
  links: {
    github?: string;
    liveDemo?: string;
    huggingFace?: string;
    paper?: string;
  };
  thumbnail?: ProjectMedia;
  media: ProjectMedia[];
  details: {
    research: string[];
    engineering: string[];
  };
  results: { label: string; value: string }[];
  featured: boolean;
  order: number;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Publication {
  citation: string;
  venue: string;
  status: "Accepted" | "Under Review";
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export interface Profile {
  name: string;
  monogram: string;
  photo: string;
  taglines: {
    research: string;
    engineering: string;
  };
  bio: string[];
  email: string;
  socials: {
    github: string;
    huggingFace: string;
    kaggle: string;
    linkedin: string;
  };
  cvs: {
    aiEngineer: string;
    mlEngineer: string;
    research: string;
  };
  education: EducationEntry[];
  publications: Publication[];
  service: string[];
}
