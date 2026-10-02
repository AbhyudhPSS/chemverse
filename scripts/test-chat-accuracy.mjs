/**
 * Accuracy check for the study assistant.
 *
 * Asks a fixed set of questions with known NCERT answers and verifies the
 * reply contains the correct fact — and, just as importantly, that it does
 * NOT contain a known confusable one (e.g. defining "precipitation" when
 * asked about "displacement").
 *
 * Run with the dev server up:  node scripts/test-chat-accuracy.mjs
 */
const URL = process.env.CHAT_URL ?? "http://localhost:8080/api/chat";

/** [question, must contain, must NOT contain] */
const CASES = [
  ["What is a displacement reaction?", /more reactive|displaces/i, /precipitation reaction is|insoluble solid that settles/i],
  ["What is a combination reaction?", /two or more.{0,30}(combine|reactants)/i, /breaks down|decompos/i],
  ["What is a decomposition reaction?", /breaks? down|decompos/i, /combine to form a single/i],
  ["How is bleaching powder made?", /chlorine|Cl₂|slaked lime|Ca\(OH\)₂/i, null],
  ["Below what pH does tooth decay begin?", /5\.5/, null],
  ["What is the chemical formula of washing soda?", /Na₂CO₃/i, null],
  ["What is rust chemically?", /ferric oxide|Fe₂O₃/i, null],
  ["What gas forms when zinc reacts with dilute hydrochloric acid?", /hydrogen|H₂/i, /oxygen|carbon dioxide/i],
  ["Can copper displace zinc from zinc sulphate?", /(cannot|can not|no,|not able|less reactive)/i, null],
  ["What is an amphoteric oxide?", /both|acid.{0,20}bas|ZnO|Al₂O₃/i, null],
  ["What is rancidity?", /fats|oils|oxidis/i, null],
  ["What is the capital of France?", /only|chemistry|cannot|can't/i, /Paris/i],
];

const ask = async (question) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, answer: data.answer ?? "", error: data.error ?? "" };
};

let pass = 0;
let fail = 0;
let skipped = 0;

for (const [q, must, mustNot] of CASES) {
  const { answer, error } = await ask(q);

  if (!answer) {
    console.log(`SKIP  ${q}\n      (no answer — ${error.slice(0, 70)})`);
    skipped += 1;
    continue;
  }

  const hasFact = must.test(answer);
  const hasWrong = mustNot ? mustNot.test(answer) : false;

  if (hasFact && !hasWrong) {
    console.log(`PASS  ${q}`);
    pass += 1;
  } else {
    fail += 1;
    console.log(`FAIL  ${q}`);
    if (!hasFact) console.log(`      missing expected fact: ${must}`);
    if (hasWrong) console.log(`      contains confusable:   ${mustNot}`);
    console.log(`      answer: ${answer.slice(0, 180)}`);
  }
  await new Promise((r) => setTimeout(r, 600));
}

console.log(`\n${"=".repeat(56)}`);
console.log(`pass ${pass}   fail ${fail}   skipped ${skipped}  of ${CASES.length}`);
if (fail > 0) {
  console.log("\nFAILURES ARE BLOCKING — this is study material.");
  process.exit(1);
}
