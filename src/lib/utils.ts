import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { CustomPrompt } from "@interface/structure";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = process.env.NODE_ENV === "development";

export const hasKeywords = (value?: string): boolean =>
  !!value && !!value.trim();

export const onPromptAdd = ({
  customPrompts,
  prompt
}: {
  prompt: CustomPrompt;
  customPrompts: CustomPrompt[];
}) => {
  let isMerged = false;

  // Sort the customPrompts array based on the start and end values of the ranges
  const sortedPrompts = [...customPrompts, prompt].sort((a, b) => {
    if (a.location.start === b.location.start)
      return a.location.end - b.location.end;
    return a.location.start - b.location.start;
  });

  // Check for overlapping or adjacent ranges
  for (let i = 1; i < sortedPrompts.length; i++) {
    const prevPrompt = sortedPrompts[i - 1];
    const currentPrompt = sortedPrompts[i];

    // Check if the ranges overlap or are adjacent
    if (
      prevPrompt.location.start <= currentPrompt.location.end &&
      prevPrompt.location.end >= currentPrompt.location.start
    ) {
      isMerged = true;
      break;
    }
  }

  return isMerged;
};
