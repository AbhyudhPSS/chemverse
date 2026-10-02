/**
 * Probes every Gemini model this API key can use and reports which actually
 * work, how fast they are, and how well they answer a real chemistry question.
 *
 *   node scripts/test-gemini-models.mjs
 *
 * Reads GEMINI_API_KEY from .env. The key is never printed.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const readKey = () => {
  const env = readFileSync(resolve(root, ".env"), "utf8");
  const line = env.split("\n").find((l) => l.startsWith("GEMINI_API_KEY="));
  return line?.slice("GEMINI_API_KEY=".length).trim().replace(/^["']|["']$/g, "") ?? "";
};

const KEY = readKey();
if (!KEY) {
  console.error("No GEMINI_API_KEY in .env");
  process.exit(1);
}

const BASE = "https://generativelanguage.googleapis.com/v1beta";
const QUESTION =
  "In one sentence: why can zinc displace copper from copper sulphate solution, but copper cannot displace zinc?";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const listModels = async () => {
  const res = await fetch(`${BASE}/models?pageSize=200`, { headers: { "x-goog-api-key": KEY } });
  if (!res.ok) throw new Error(`ListModels failed: ${res.status}`);
  const data = await res.json();
  return (data.models ?? [])
    .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => ({
      name: m.name.replace(/^models\//, ""),
      display: m.displayName ?? "",
      inputLimit: m.inputTokenLimit ?? 0,
    }))
    // Text chat models only — skip image/audio/tts/embedding/robotics variants.
    .filter((m) => !/embedding|aqa|imagen|veo|tts|image|audio|native-audio|robotics/i.test(m.name));
};

const probe = async (model) => {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`${BASE}/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": KEY, "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: QUESTION }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 120 },
      }),
      signal: controller.signal,
    });
    const ms = Date.now() - started;
    const body = await res.json().catch(() => ({}));

    if (res.ok) {
      const text =
        body?.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
      return { model, ok: true, status: 200, ms, answer: text };
    }
    return {
      model,
      ok: false,
      status: res.status,
      ms,
      reason: body?.error?.status ?? "",
      detail: (body?.error?.message ?? "").slice(0, 90),
    };
  } catch (err) {
    return { model, ok: false, status: 0, ms: Date.now() - started, reason: err.name === "AbortError" ? "TIMEOUT" : "NETWORK" };
  } finally {
    clearTimeout(timer);
  }
};

const models = await listModels();
console.log(`Testing ${models.length} text models on your key…\n`);

const results = [];
for (const m of models) {
  const r = await probe(m.name);
  results.push({ ...r, inputLimit: m.inputLimit });
  const tag = r.ok ? "WORKS " : "fail  ";
  const note = r.ok ? `${r.ms}ms` : `${r.status} ${r.reason ?? ""}`.trim();
  console.log(`${tag} ${m.name.padEnd(36)} ${note}`);
  await sleep(250);
}

const working = results.filter((r) => r.ok).sort((a, b) => a.ms - b.ms);

console.log(`\n${"=".repeat(70)}`);
console.log(`WORKING: ${working.length} of ${results.length}`);
console.log("=".repeat(70));
for (const w of working) {
  console.log(`\n${w.model}  (${w.ms}ms, ${(w.inputLimit / 1000).toFixed(0)}k ctx)`);
  console.log(`  ${w.answer.replace(/\s+/g, " ").slice(0, 200)}`);
}

const byReason = {};
for (const r of results.filter((x) => !x.ok)) {
  const k = `${r.status} ${r.reason ?? ""}`.trim();
  byReason[k] = (byReason[k] ?? 0) + 1;
}
console.log(`\nFailures: ${JSON.stringify(byReason)}`);
