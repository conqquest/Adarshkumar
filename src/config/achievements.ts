export type Achievement = {
  slug: string;
  title: string;
  organization: string;
  year: string;
  periodShort: string;
  periodLong: string;
  details?: string[];
  /** Cover image for cards and detail header */
  image?: string;
  /** Pinterest-style photo gallery on the detail page */
  gallery?: string[];
  featured?: boolean;
};

export const achievements: Achievement[] = [
  {
    slug: "sih-2025",
    title: "1st Position Winner",
    organization: "Smart India Hackathon (SIH)",
    year: "2025",
    periodShort: "Dec 25",
    periodLong: "December 2025",
    details: [
      "Secured 1st Position out of 150 teams at the national-level Smart India Hackathon (SIH) Grand Finale.",
      "Engineered and presented a working prototype solving critical industry problem statement under tight deadlines.",
      "Actively competed in 10+ other technical hackathons, building various web and cloud prototypes.",
    ],
    image: "/assets/achievements/sih-2025/01.png",
    gallery: [
      "/assets/achievements/sih-2025/01.png",
    ],
    featured: true,
  },
  {
    slug: "aws-certifications",
    title: "AWS Certified Developer & Data Engineer",
    organization: "Amazon Web Services (AWS)",
    year: "2026",
    periodShort: "AWS 26",
    periodLong: "AWS Certifications",
    details: [
      "AWS Certified Developer (Associate) — credential verifying developer expertise in cloud application development and deployment.",
      "AWS Certified Data Engineer (Associate) — credential verifying skills in data engineering pipelines and serverless workflows.",
      "AWS Certified AI Practitioner — credential verifying foundational AI/ML cloud concepts and usage on AWS.",
    ],
    image: "/assets/achievements/sih-2024/01.png",
    gallery: [
      "/assets/achievements/sih-2024/01.png",
    ],
    featured: true,
  },
];

export function getAchievement(slug: string) {
  return achievements.find((item) => item.slug === slug);
}
