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