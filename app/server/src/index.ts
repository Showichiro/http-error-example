import { serve } from "@hono/node-server";
import { Hono } from "hono";
import timers from "node:timers/promises";

const app = new Hono();

app
  .get("/internalServerError", (c) => {
    return c.json("internalServerError", 500);
  })
  .get("/badRequest", (c) => {
    return c.json("badRequest", 400);
  })
  .get("/sleep", async (c) => {
    await timers.setTimeout(10000);
    return c.json("timeout");
  });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
