"use client";

import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { techStackCategories } from "@/config/tech-stack";

export function TechStackSection() {
  return (
    <Container>
      <SectionHeading title="Tech Stack" uppercase />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStackCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6 space-y-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/50 px-2.5 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-card"
                >
                  {tech.icon && (
                    <Image
                      src={`https://cdn.simpleicons.org/${tech.icon}`}
                      alt=""
                      width={14}
                      height={14}
                      className="size-3.5 shrink-0 dark:brightness-100"
                      unoptimized
                    />
                  )}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
