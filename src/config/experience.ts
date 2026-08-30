export type ExperienceItem = {
  company: string;
  role: string;
  periodShort: string;
  periodLong: string;
  locationShort: string;
  locationLong: string;
  working?: boolean;
  details?: string[];
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Amar Packers",
    role: "Software Developer Intern (Full Stack)",
    periodShort: "May 26 – Jun 26",
    periodLong: "May 2026 – June 2026",
    locationShort: "Remote",
    locationLong: "Remote",
    details: [
      "Architected an Enterprise Resource Planning (ERP) web application using the MERN stack (React, Node.js, Express.js, MongoDB), digitizing core business operations and replacing 100% of manual ledgers.",
      "Engineered RESTful APIs with Role-Based Access Control (RBAC) and JSON Web Tokens (JWT), securely managing data access for 50+ regional and finance staff members.",
      "Built modular UI components in React and optimized backend database queries, reducing operational manual overhead by 90% and decreasing page load times by 40%.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "JWT", "RBAC"],
  },
  {
    company: "VisionX Studio",
    role: "Cloud & Data Analytics Intern",
    periodShort: "Feb 26 – Apr 26",
    periodLong: "February 2026 – April 2026",
    locationShort: "Remote",
    locationLong: "Remote",
    details: [
      "Developed serverless data processing workflows leveraging Amazon Web Services (AWS S3, AWS Lambda) and Python, effectively transforming over 500GB of multi-source enterprise data.",
      "Conducted Exploratory Data Analysis (EDA) and automated data cleaning protocols using Pandas and SQL, increasing cross-functional reporting efficiency by 35%.",
    ],
    tech: ["AWS", "Python", "AWS S3", "AWS Lambda", "Serverless", "Pandas", "SQL", "EDA"],
  },
];
