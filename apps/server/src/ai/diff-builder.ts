import type { ReviewFile } from "./types";

export function buildReviewDiff(files: ReviewFile[]): string {
  return files
    .map(
      (file) => `
        File: ${file.filename}

        ${file.patch}
        `
    )
    .join("\n----------------------------------------\n\n");
}