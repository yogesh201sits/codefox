import { buildReviewDiff } from "../ai/diff-builder";
import { reviewPullRequest } from "../ai/engine";
import { getPullRequestFiles } from "../github";

interface RunReviewOptions {
  owner: string;
  repo: string;
  prNumber: number;
}

export async function runReview({
  owner,
  repo,
  prNumber,
}: RunReviewOptions) {
  const files = await getPullRequestFiles(
    owner,
    repo,
    prNumber
  );

  const reviewFiles = files
    .filter((file) => file.patch)
    .map((file) => ({
      filename: file.filename,
      patch: file.patch!,
    }));

  const diff = buildReviewDiff(reviewFiles);

  return reviewPullRequest(diff);
  
}