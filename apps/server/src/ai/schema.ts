import { z } from "zod";

export const FindingSchema = z.object({
  title: z.string(),

  category: z.enum([
    "bug",
    "security",
    "performance",
    "correctness",
    "maintainability",
  ]),

  severity: z.enum([
    "critical",
    "high",
    "medium",
    "low",
  ]),

  file: z.string(),

  startLine: z.number().optional(),

  endLine: z.number().optional(),

  description: z.string(),

  suggestion: z.string(),
});

export const ReviewResultSchema = z.object({
  summary: z.string(),

  findings: z.array(FindingSchema),
});