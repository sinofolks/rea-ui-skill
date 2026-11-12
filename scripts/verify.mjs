import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: { directory: { type: "string" }, skill: { type: "string" } } });
const root = values.directory ? path.resolve(values.directory) : fileURLToPath(new URL("../", import.meta.url));
const sourceSkill = values.skill ? path.resolve(values.skill) : path.join(root, "skills/rea-ui");
const metadata = JSON.parse(await fs.readFile(path.join(root, "release.json"), "utf8"));
const directory = await fs.mkdtemp(path.join(os.tmpdir(), "rea-ui-public-skill-"));
const digest = (content) => createHash("sha256").update(content).digest("hex");

try {
  // Move the entire installed skill away from its repository: private packages and workspace links cannot satisfy missing dependencies.
  const skill = path.join(directory, "installed/rea-ui");
  await fs.cp(sourceSkill, skill, { recursive: true, dereference: true });
  const project = path.join(directory, "project");
  await fs.mkdir(project);
  const environment = { ...process.env };
  delete environment.REA_UI_ROOT;
  delete environment.NODE_PATH;
  const helper = path.join(skill, "scripts/rea-ui.mjs");
  function run(args, failure = false) {
    const result = spawnSync(process.execPath, [helper, ...args], { cwd: project, env: environment, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
    assert.ifError(result.error);
    assert.equal(result.status, failure ? 1 : 0, result.stderr);
    return failure ? JSON.parse(result.stderr).error : result.stdout;
  }
  const json = (args) => JSON.parse(run(args));
  const catalog = JSON.parse(await fs.readFile(path.join(skill, "assets/catalog/catalog.json"), "utf8"));
  assert.equal(catalog.entries.length, metadata.entries);
  assert.equal(new Set(catalog.entries.map((entry) => entry.id)).size, metadata.entries);
  let pairCount = 0;
  for (const entry of catalog.entries) for (const variant of entry.variants) {
    pairCount++;
    for (const [relative, hash, bytes] of [[variant.tsxPath, variant.tsxHash, variant.tsxBytes], [variant.cssPath, variant.cssHash, variant.cssBytes]]) {
      const file = await fs.readFile(path.join(skill, "assets/library", relative));
      assert.equal(digest(file), hash, `${entry.id}: ${relative}`);
      assert.equal(file.length, bytes);
    }
    if (variant.apiPath) {
      const api = JSON.parse(await fs.readFile(path.join(skill, "assets/catalog", variant.apiPath), "utf8"));
      assert(Array.isArray(api.props));
    }
  }
  assert.equal(pairCount, metadata.variants);
  const found = json(["search", "AI Answer"]);
  assert.equal(found.entries[0].id, "components/ai-answer");
  for (const section of ["components", "screens", "blocks", "illustrations", "motion"]) assert(json(["search", "--section", section]).total > 0);
  assert(json(["api", "button"]).props.some((prop) => prop.name === "loading"));
  assert.equal(json(["api", "screens/analytics"]).available, false);
  assert(run(["usage", "button", "--variant", "clean", "--raw"]).includes("./components/Button.clean"));
  assert(json(["tokens", "--group", "color"]).values.color.canvas);

  for (const [id, variant] of [["components/button", "clean"], ["screens/analytics", "default"]]) {
    const destination = path.join(project, id);
    const copied = json(["copy", id, "--variant", variant, "--out", destination]);
    assert.equal(copied.files.length, 2);
    const selected = catalog.entries.find((entry) => entry.id === id).variants.find((item) => item.variant === variant);
    const filenames = [selected.tsxFileName, selected.cssFileName];
    const hashes = [selected.tsxHash, selected.cssHash];
    for (let index = 0; index < filenames.length; index++) assert.equal(digest(await fs.readFile(path.join(destination, filenames[index]))), hashes[index]);
    assert.equal(run(["copy", id, "--variant", variant, "--out", destination], true).code, "FILE_EXISTS");
    for (let index = 0; index < filenames.length; index++) assert.equal(digest(await fs.readFile(path.join(destination, filenames[index]))), hashes[index]);
  }
  const expected = catalog.entries.find((entry) => entry.id === "components/button").variants[0];
  assert.equal(digest(run(["source", "button", "--file", "css", "--raw"])), expected.cssHash);
  assert.equal(run(["source", "../../package.json"], true).code, "NOT_FOUND");
  const invalidTarget = path.join(project, "should-not-exist");
  assert.equal(run(["copy", "button", "--out", invalidTarget, "--raw"], true).code, "INVALID_ARGUMENT");
  await assert.rejects(fs.access(invalidTarget));
  console.log(`Portable skill verified: ${metadata.entries} entries, ${pairCount} exact TSX/CSS pairs; search, API, tokens, isolated copy and file preservation passed.`);
} finally {
  await fs.rm(directory, { recursive: true, force: true });
}
