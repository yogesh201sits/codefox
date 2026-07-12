import { llm } from "./client";
import { reviewPrompt } from "./prompts";
import { ReviewResultSchema } from "./schema";

export async function reviewPullRequest(diff: string) {
  const structuredLlm = llm.withStructuredOutput(
    ReviewResultSchema
  );

  const messages = await reviewPrompt.formatMessages({
    diff,
  });

  return structuredLlm.invoke(messages);
  
}