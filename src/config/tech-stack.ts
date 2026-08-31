export type TechItem = {
  name: string;
  icon?: string;
};

export type TechCategory = {
  title: string;
  items: TechItem[];
};

export const techStackCategories: TechCategory[] = [
  {
    title: "Frontend Development",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "UI/UX", icon: "figma" },
    ],
  },
  {
    title: "Backend Development",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express" },
      { name: "Python", icon: "python" },
      { name: "Django", icon: "django" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "RESTful API Design" },
      { name: "Microservices" },
      { name: "System Design" },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS (EC2, S3, Lambda, API Gateway, SNS, SageMaker)", icon: "amazonwebservices" },
      { name: "Docker", icon: "docker" },
      { name: "Serverless Computing" },
      { name: "CI/CD" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    title: "Databases & Data",
    items: [
      { name: "MongoDB (NoSQL)", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "SQL" },
      { name: "Mongoose ORM" },
      { name: "Data" },
    ],
  },
];
