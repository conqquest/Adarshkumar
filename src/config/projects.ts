export type Project = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  href: string;
  website?: string;
  featured?: boolean;
  /** Optional cover image for project cards */
  cover?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "cyclocast",
    title: "CycloCast – AI Cyclone Intelligence Platform",
    date: "09.2026",
    description:
      "Built an AI-powered tropical cyclone tracking platform for IMD/MoES (SIH 2026) that fuses multi-source satellite imagery with deep learning to deliver real-time storm detection, IMD classification, 72-hour path forecasts with uncertainty cones, and historical replay — processing Meteosat IR telemetry and GraphCast atmospheric data.",
    tech: ["React", "TypeScript", "Python", "PyTorch", "FastAPI", "PostgreSQL", "Leaflet", "Docker"],
    href: "https://github.com/conqquest/CycloCast",
    website: "https://cyclocast-web.onrender.com/dashboard",
    featured: true,
    cover: "/assets/projects/cyclocast.png",
    gradient: "from-cyan-500/25 via-teal-500/15 to-emerald-500/25",
  },
  {
    slug: "full-stack-enterprise-erp-system",
    title: "Full-Stack Enterprise ERP System",
    date: "08.2026",
    description:
      "Engineered a production-ready Full Stack ERP application to automate manufacturing lifecycles, processing over 1,000 inventory items and securing production tracking operations.",
    tech: ["React", "Node.js", "TypeScript", "MongoDB", "CI/CD", "Cloudflare Pages", "Render"],
    href: "https://github.com/conqquest/Enterprise-ERP",
    featured: true,
    cover: "/assets/projects/erp.png",
    gradient: "from-blue-500/25 via-indigo-500/15 to-violet-500/25",
  },
  {
    slug: "terrastorm",
    title: "TerraStorm – Cloud-Native AI Platform",
    date: "03.2026",
    description:
      "Architected a Cloud AI platform utilizing an event-driven AWS serverless architecture to automate land-use change detection across 10,000+ square kilometers of satellite imagery.",
    tech: ["Python", "AWS Serverless", "Django", "Machine Learning", "S3", "Lambda", "SageMaker", "SNS"],
    href: "https://github.com/conqquest/TerraStorm",
    featured: true,
    gradient: "from-emerald-500/25 via-green-500/15 to-lime-500/25",
  },
  {
    slug: "brains",
    title: "Brains – Highly Available Cloud Architecture",
    date: "09.2026",
    description:
      "Designed and deployed a production-grade, highly available web architecture on AWS with multi-AZ auto-scaling (2–4 EC2 instances), Application Load Balancer, Dockerized microservices, Terraform IaC (20+ resources), and CI/CD automation — built as a case study with experimental verification of failover, scaling, and rollback.",
    tech: ["AWS", "Terraform", "Docker", "React", "Node.js", "TypeScript", "MongoDB", "GitHub Actions"],
    href: "https://github.com/conqquest/Brains-CMS",
    featured: true,
    cover: "/assets/projects/brains.png",
    gradient: "from-amber-500/25 via-orange-500/15 to-red-500/25",
  },
];
