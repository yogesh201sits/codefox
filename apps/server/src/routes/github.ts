import { Hono } from "hono";
import { runReview } from "../services";
import {
  verifyWebhookSignature,
  isSupportedAction,
  isSupportedEvent,
  parsePullRequestWebhook,
} from "../github/webhook";

const github = new Hono();

github.post("/webhooks/github", async (c) => {
  const body = await c.req.text();

  const signature = c.req.header(
    "X-Hub-Signature-256"
  );

  const valid = verifyWebhookSignature(
    body,
    signature,
    process.env.GITHUB_WEBHOOK_SECRET!
  );

  if (!valid) {
    return c.json(
      {
        error: "Invalid webhook signature",
      },
      401
    );
  }

  const payload = JSON.parse(body);

  const event = c.req.header("X-GitHub-Event");

  if (!isSupportedEvent(event)) {
    return c.json({
      ignored: true,
      reason: "Unsupported event",
    });
  }

  if (!isSupportedAction(payload.action)) {
    return c.json({
      ignored: true,
      reason: `Unsupported action: ${payload.action}`,
    });
  }

  await runReview(
    parsePullRequestWebhook(payload)
  );

  return c.json({
    received: true,
  });
});

export default github;