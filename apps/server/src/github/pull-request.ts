import { github } from "./client";

export async function getPullRequest(
  owner: string,
  repo: string,
  pullNumber: number
) {
  const { data } = await github.rest.pulls.get({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return data;
}

export async function getPullRequestFiles(
  owner: string,
  repo: string,
  pullNumber: number
) {
  const { data } = await github.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return data;
}