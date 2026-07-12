import { llm } from "./client";
import { ReviewResultSchema } from "./schema";
import { REVIEW_PROMPT } from "./prompts";

const reviewer = llm.withStructuredOutput(
  ReviewResultSchema
);

export async function reviewPullRequest(diff: string) {
  return await reviewer.invoke([
    {
      role: "system",
      content: REVIEW_PROMPT,
    },
    {
      role: "user",
      content: diff,
    },
  ]);
}