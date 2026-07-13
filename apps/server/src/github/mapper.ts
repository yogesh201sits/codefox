import type { Finding } from "../ai/types";

export interface GitHubReviewComment {
  path: string;
  body: string;
  line: number;
  side: "RIGHT";
}

export function mapFindingToComment(
  finding: Finding
): GitHubReviewComment {
  return {
    path: finding.file,

    line: finding.startLine ?? 1,

    side: "RIGHT",

    body: `### ${finding.title}

**Severity:** ${finding.severity}

${finding.description}

**Suggestion**

${finding.suggestion}`,
  };
}