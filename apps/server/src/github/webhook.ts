import { createHmac, timingSafeEqual } from "crypto";

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
) {
  const hash =
    "sha256=" +
    createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

  return timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(signature)
  );
}