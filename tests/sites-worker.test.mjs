import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/client/robots.txt", import.meta.url));
  await access(new URL("../dist/client/sitemap.xml", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("emits crawler rules and an absolute sitemap URL", async () => {
  const robots = await readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");

  assert.match(robots, /User-agent: Googlebot\nAllow: \//);
  assert.match(robots, /User-agent: Bingbot\nAllow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
  assert.match(robots, /Sitemap: https?:\/\/[^\s]+\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https?:\/\/[^<]+<\/loc>/);
  assert.match(sitemap, /<loc>https?:\/\/[^<]+\/wedding-day<\/loc>/);
  assert.match(sitemap, /<loc>https?:\/\/[^<]+\/pre-wedding<\/loc>/);
  assert.match(sitemap, /<loc>https?:\/\/[^<]+\/proposal<\/loc>/);
  assert.match(sitemap, /<loc>https?:\/\/[^<]+\/stories<\/loc>/);
  assert.match(sitemap, /<loc>https?:\/\/[^<]+\/stories\/sikh-wedding-portrait-story-singapore<\/loc>/);
});

test("includes valid ProfessionalService structured data", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const match = html.match(/<script id="business-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);

  assert.ok(match, "business structured-data script is missing");

  const business = JSON.parse(match[1]);

  assert.equal(business["@context"], "https://schema.org");
  assert.equal(business["@type"], "ProfessionalService");
  assert.equal(business.name, "ijós Moments");
  assert.equal(business.areaServed.name, "Singapore");
  assert.equal(business.founder.name, "Madhu");
});
