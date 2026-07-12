export interface ReviewFile {
  filename: string;
  patch: string;
}

export interface ReviewComment {
  file: string;
  line?: number;
  severity: "low" | "medium" | "high";

  title: string;
  description: string;
  suggestion: string;
}

export interface ReviewResult {
  summary: string;
  comments: ReviewComment[];
}