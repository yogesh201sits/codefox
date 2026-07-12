import { Hono } from "hono";
import github from "./routes/github";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "CodeFox",
    status: "running",
  });
});

app.route("/", github);

export default {
  port: 3000,
  fetch: app.fetch,
};