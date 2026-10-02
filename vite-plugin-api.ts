import { loadEnv, type Plugin, type ViteDevServer } from "vite";

/**
 * Serves the /api functions during `npm run dev`, so the chat endpoint behaves
 * the same locally as it does on a serverless host. The Gemini key is read
 * from the dev server's own environment and never reaches the browser.
 */
export const apiDevServer = (): Plugin => ({
  name: "chemverse-api-dev",
  apply: "serve",
  config(_config, { mode }) {
    // Vite only exposes VITE_* to the client and never copies anything into
    // process.env. The server-side handler reads process.env, so bridge the
    // server-only keys across here — and only those, so nothing else leaks.
    const env = loadEnv(mode, process.cwd(), "");
    for (const [key, value] of Object.entries(env)) {
      if (key.startsWith("GEMINI_") && value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  },
  configureServer(server: ViteDevServer) {
    server.middlewares.use("/api/chat", async (req, res) => {
      try {
        const mod = await server.ssrLoadModule("/api/chat.ts");
        const handler = mod.default as (r: Request) => Promise<Response>;

        const chunks: Buffer[] = [];
        for await (const c of req) chunks.push(c as Buffer);
        const body = Buffer.concat(chunks).toString("utf8");

        const response = await handler(
          new Request("http://localhost/api/chat", {
            method: req.method ?? "POST",
            headers: { "content-type": "application/json" },
            body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
          }),
        );

        res.statusCode = response.status;
        response.headers.forEach((v, k) => res.setHeader(k, v));
        res.end(await response.text());
      } catch (err) {
        server.config.logger.error(`[api/chat] ${String(err)}`);
        res.statusCode = 500;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ error: "Local API handler failed." }));
      }
    });
  },
});
