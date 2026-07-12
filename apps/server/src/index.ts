import { Hono } from "hono";
import { getPullRequestFiles } from "./github";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "CodeFox",
    status: "running",
  });
});


app.post("/webhooks/github", async (c) => {
  const event = c.req.header("X-GitHub-Event");

  if (event !== "pull_request") {
    return c.json({
      ignored: true,
      reason: "Not a pull_request event",
    });
  }

  const payload = await c.req.json();

  const action = payload.action;

  const supportedActions = ["opened", "synchronize", "reopened"];

  if (!supportedActions.includes(action)) {
    return c.json({
      ignored: true,
      reason: `Unsupported action: ${action}`,
    });
  }

  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const prNumber = payload.pull_request.number;

  const files = await getPullRequestFiles(
    owner,
    repo,
    prNumber
  );

  console.log(files);

  console.log({
    action,
    owner,
    repo,
    prNumber,
  });

  return c.json({
    received: true,
  });
});

export default {
  port: 3000,
  fetch: app.fetch,
};