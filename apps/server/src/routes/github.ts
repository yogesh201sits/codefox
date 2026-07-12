import { Hono } from "hono";
import { runReview } from "../services";

const github = new Hono();

github.post("/webhooks/github", async (c) => {
  const event = c.req.header("X-GitHub-Event");

  if (event !== "pull_request") {
    return c.json({
      ignored: true,
      reason: "Not a pull_request event",
    });
  }

  const payload = await c.req.json();

  const action = payload.action;

  const supportedActions = [
    "opened",
    "synchronize",
    "reopened",
  ];

  if (!supportedActions.includes(action)) {
    return c.json({
      ignored: true,
      reason: `Unsupported action: ${action}`,
    });
  }

  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const prNumber = payload.pull_request.number;

  const review = await runReview({
    owner,
    repo,
    prNumber,
  });

  console.log(review);

  return c.json({
    received: true,
  });
  
});

export default github;