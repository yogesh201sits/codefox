import { github } from "./client";

export async function getPullRequestFiles(
  owner: string,
  repo: string,
  pullNumber: number
) {
  const response = await github.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return response.data;
}