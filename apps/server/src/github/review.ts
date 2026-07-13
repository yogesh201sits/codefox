import type { ReviewResult } from "../ai/types";

export interface PostReviewOptions {
  owner: string;
  repo: string;
  prNumber: number;

  review: ReviewResult;
}

export async function postReview(
  options: PostReviewOptions
) {
  throw new Error("Not implemented");
}