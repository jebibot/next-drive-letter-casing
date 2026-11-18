// Runs `next build` with the project dir spelled `C:\...` but Next's own entry
// point spelled `c:\...`: the same files, differing only in drive-letter case.
// Extra arguments are passed through, e.g. `node repro.mjs --webpack`.
import { spawnSync } from "node:child_process";
import path from "node:path";

if (process.platform !== "win32") {
  console.error("This reproduction needs Windows, since it depends on drive letters.");
  process.exit(1);
}

const root = process.cwd();
const projectDir = root[0].toUpperCase() + root.slice(1);
const nextBin = path.join(root[0].toLowerCase() + root.slice(1), "node_modules", "next", "dist", "bin", "next");

console.log(`project dir (cwd): ${projectDir}`);
console.log(`next entry point:  ${nextBin}\n`);

const { status } = spawnSync(process.execPath, [nextBin, "build", ...process.argv.slice(2)], {
  cwd: projectDir,
  stdio: "inherit",
});
process.exit(status ?? 1);
