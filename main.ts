import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The single word this entry puts forward: the label a grandmother
// reaches for when the family tries to explain the new AI gadget
// on her kitchen counter.
const CHOSEN_WORD = "contraption";

const OUTPUT_PATH = "/output/entry.txt";

function checkWord(candidate: string): void {
  if (candidate.length < 1 || candidate.length > 24) {
    throw new Error("word must be between 1 and 24 characters long");
  }
  if (/\s/.test(candidate)) {
    throw new Error("word must be a single word with no whitespace");
  }
  if (candidate.trim().length === 0) {
    throw new Error("word must not be blank");
  }
}

function main(): void {
  checkWord(CHOSEN_WORD);

  // Encode once so the bytes on disk can be compared exactly,
  // with no trailing newline or extra padding sneaking in.
  const expectedBytes = Buffer.from(CHOSEN_WORD, "utf8");

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, expectedBytes);

  const actualBytes = readFileSync(OUTPUT_PATH);
  if (!actualBytes.equals(expectedBytes)) {
    throw new Error("verification failed: file bytes differ from the word");
  }

  console.log(CHOSEN_WORD);
}

main();
