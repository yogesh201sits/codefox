import type {ReviewFile,ReviewResult,} from "./types";

export async function reviewPullRequest(
  files: ReviewFile[]
): Promise<ReviewResult> {

  console.log(
    `Reviewing ${files.length} files`
  );

  return {
    summary: "",
    comments: [],
  };
}