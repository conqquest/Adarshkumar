import { heroConfig } from "@/config/hero";

export const aboutConfig = {
  headline: ["From curious experiments", "to cloud & full-stack development."],
  intro:
    "Hello! I'm Adarsh Kumar, an Information Technology student with a passion for cloud computing, AI, backend development, and system design. I enjoy building real-world software that solves practical problems and continuously learning new technologies.",
  quote:
    "I believe the best builders learn in public, ship early, and refine until the product feels obvious to use.",
  traits: ["Curious", "Builder", "Focused", "Persistent"] as const,
  traitStyles: {
    Curious:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/80 dark:bg-sky-950/40 dark:text-sky-300",
    Builder:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300",
    Focused:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300",
    Persistent:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/80 dark:bg-violet-950/40 dark:text-violet-300",
  },
  meta: [
    { label: "Location", value: heroConfig.location },
    { label: "Status", value: "Open to opportunities" },
    { label: "Focus", value: "Full-stack · Cloud · DevOps" },
  ],
  story: {
    title: "My Story",
    paragraphs: [
      "I'm just a small kid that hails from [Bundelkhand.](https://www.google.com/maps/place/Bundelkhand/@24.795515,79.410455,8z/data=!3m1!4b1!4m6!3m5!1s0x3978738a56576cd3:0x83a98eed49abb30c!8m2!3d24.8772957!4d79.0192997!16zL20vMDNjMTBy?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D) I enjoy [developing](https://devadarshkumar.pages.dev/projects) applications and working as a cloud engineer. Currently I'm working on [ERP](https://github.com/amar-packers-erp). I've been coding for about 2 years and have built a few projects. I love learning new technologies, solving real-world problems, and sharing what I learn with others.",
      "My life's work is to make technology easy to understand and interesting to learn about. Outside of coding, I'm a huge music fan. I also love editing videos, playing chess in my free time, and exploring new ideas that help me grow as a developer.",
    ],
  },
  principles: {
    title: "How I work",
    items: [
      {
        title: "Stay curious",
        description:
          "AI and cloud move fast. I learn by building, reading, and talking to people a few steps ahead of me.",
      },
      {
        title: "Ship, then refine",
        description:
          "A working prototype beats a perfect plan. I prefer real feedback over endless polishing.",
      },
      {
        title: "Sweat the details",
        description:
          "Loading states, edge cases, and clear UX matter as much as the model or API behind them.",
      },
      {
        title: "Build for humans",
        description:
          "Technology is a means to an end. If it doesn't solve a real problem, it doesn't count.",
      },
    ],
  },
  beyond: {
    title: "Beyond the code",
    paragraphs: [
      "Outside of work, you'll find me exploring new tools, studying cloud architectures, or chasing the next **hackathon** idea. I like **learning in public** and sharing what actually worked — and what didn't.",
      "I'm drawn to builders who combine **technical depth** with **clarity**. That's the kind of engineer I want to become.",
    ],
  },
  connectLinks: [
    {
      name: "Email",
      href: "mailto:dev.adarshkumar07@gmail.com",
      icon: "mail" as const,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/adarshkumardev/",
      icon: "linkedin" as const,
    },
    {
      name: "GitHub",
      href: "https://github.com/conqquest",
      icon: "github" as const,
    },
    {
      name: "Twitter",
      href: "https://x.com/adarshtwt7",
      icon: "twitter" as const,
    },
  ],
};
