import { github }  from "./client";
import type { ReviewResult } from "../ai/types";

interface PostSummaryCommentOptions {
  owner: string;
  repo: string;
  prNumber: number;
  review: ReviewResult;
}

function formatReview(review: ReviewResult) {
  let body = `## 🤖 CodeFox Review

${review.summary}
`;

  if (review.findings.length > 0) {
    body += `

### Findings

`;

    review.findings.forEach((finding, index) => {
      body += `${index + 1}. **${finding.title}**
- Severity: ${finding.severity}
- Category: ${finding.category}
- File: \`${finding.file}\`

${finding.description}

**Suggestion:** ${finding.suggestion}

`;
    });
  } else {
    body += `

✅ No significant issues found.`;
  }

  return body;
}

export async function postSummaryComment({
  owner,
  repo,
  prNumber,
  review,
}: PostSummaryCommentOptions) {
  const body = formatReview(review);

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body,
  });
}