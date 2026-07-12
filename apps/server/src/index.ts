import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "CodeFox",
    status: "running",
  });
});


app.post("/webhooks/github", async (c) => {
  const payload = await c.req.json();

  console.log("GitHub Event Received");
  console.log(payload);

  return c.json({
    received: true,
    payload
  });
});


export default {
  port: 3000,
  fetch: app.fetch,
};