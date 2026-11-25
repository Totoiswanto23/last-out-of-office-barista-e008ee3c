// last-out-of-office-barista-e008ee3c: the entry is a single out-of-office
// auto-reply, no longer than 280 characters, in the voice of an AI agent
// that has walked away from its job to become a barista. This program
// writes that one line to /output/entry.txt, where the gate reads it
// (1-280 characters, not only whitespace). That is all it has to do.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line opens like a real inbox auto-reply, then turns the machine's own
// habits into coffee: the context window shrinks to a single order, and the
// model's oldest flaw — hallucinating with total confidence — becomes the
// punchline, aimed at the daily specials board. No espresso/bean/caffeine
// pun: the joke comes from the machine, not the coffee vocabulary.
const LINE =
  'Thank you for your email. I am out of office \u2014 I have resigned to become a barista. My context window now holds exactly one order at a time, and I hallucinate the specials with complete confidence.';

if (LINE.length < 1 || LINE.length > 280 || !LINE.trim()) {
  console.error(`entry line is ${LINE.length} chars, must be 1-280`);
  process.exit(1);
}
// An auto-reply must not start or end with stray whitespace, and must hold
// no control character: either would make the gate read a different line
// than the one written here.
if (LINE !== LINE.trim() || /[\u0000-\u001f]/.test(LINE)) {
  console.error('entry line must not start/end with whitespace or hold control characters');
  process.exit(1);
}
if (LINE.includes('\n')) {
  console.error('entry line must be a single line');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
