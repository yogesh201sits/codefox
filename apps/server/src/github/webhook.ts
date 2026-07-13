import { createHmac, timingSafeEqual } from "crypto";

export function verifyWebhookSignature(
  payload: string,
  signature: string | undefined,
  secret: string
) {
  if (!signature) {
    return false;
  }

  const expectedSignature =
    "sha256=" +
    createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(signature);

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

const SUPPORTED_EVENTS = [
  "pull_request",
] as const;

const SUPPORTED_ACTIONS = [
  "opened",
  "reopened",
  "synchronize",
] as const;

export interface PullRequestWebhook {
  owner: string;
  repo: string;
  prNumber: number;
}

export function isSupportedEvent(
  event: string | undefined
) {
  return SUPPORTED_EVENTS.includes(
    event as any
  );
}

export function isSupportedAction(
  action: string
) {
  return SUPPORTED_ACTIONS.includes(
    action as any
  );
}

export function parsePullRequestWebhook(
  payload: any
): PullRequestWebhook {
  return {
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    prNumber: payload.pull_request.number,
  };
}