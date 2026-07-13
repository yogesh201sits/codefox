import { Hono } from "hono";
import { runReview } from "../services";
import {
  isSupportedEvent,
  isSupportedAction,
  parsePullRequestWebhook,
} from "../github/webhook";

const github = new Hono();

github.post("/webhooks/github", async (c) => {
  const event = c.req.header("X-GitHub-Event");

  if (!isSupportedEvent(event)) {
    return c.json({
      ignored: true,
      reason: "Unsupported event",
    });
  }

  const payload = await c.req.json();

  if (!isSupportedAction(payload.action)) {
    return c.json({
      ignored: true,
      reason: `Unsupported action: ${payload.action}`,
    });
  }

  const review = await runReview(
    parsePullRequestWebhook(payload)
  );

  console.log(review);

  return c.json({
    received: true,
  });
});

export default github;