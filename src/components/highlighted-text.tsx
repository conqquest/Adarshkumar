import React from "react";

const highlightClass = "font-semibold text-violet-600 dark:text-violet-400";
const linkClass = "underline text-violet-600 dark:text-violet-400 hover:opacity-80 transition-opacity";

export function HighlightedText({ text }: { text: string }) {
  // Split by bold (**text**) or markdown links ([text](url))
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={index} className={highlightClass}>
              {part.slice(2, -2)}
            </span>
          );
        }

        if (part.startsWith("[") && part.endsWith(")")) {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            const [, textVal, urlVal] = match;
            const isExternal = urlVal.startsWith("http") || urlVal.startsWith("mailto:");
            return (
              <a
                key={index}
                href={urlVal}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={linkClass}
              >
                {textVal}
              </a>
            );
          }
        }

        return part;
      })}
    </>
  );
}
