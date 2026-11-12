#!/usr/bin/env node

// rea-ui-skill-entry.mjs
import { fileURLToPath as fileURLToPath2 } from "node:url";

// packages/mcp/src/command.ts
import { parseArgs } from "node:util";

// packages/mcp/src/catalog.ts
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

// packages/mcp/src/models.ts
var sections = ["components", "screens", "blocks", "illustrations", "motion"];

// packages/mcp/src/catalog.ts
var CatalogError = class extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "CatalogError";
  }
  code;
};
async function readWithin(root, relative) {
  const base = await fs.realpath(root);
  const candidate = path.resolve(base, relative);
  if (path.isAbsolute(relative) || !candidate.startsWith(base + path.sep)) {
    throw new CatalogError("INVALID_DATA_PATH", "Library data must stay inside its package.");
  }
  const actual = await fs.realpath(candidate);
  if (!actual.startsWith(base + path.sep)) {
    throw new CatalogError("INVALID_DATA_PATH", "Library data cannot follow links outside its package.");
  }
  return fs.readFile(actual, "utf8");
}
var normalize = (value) => value.normalize("NFKC").toLowerCase().replace(/[-_\s]+/g, " ").trim();
var ReaCatalog = class _ReaCatalog {
  constructor(data, paths) {
    this.data = data;
    this.paths = paths;
    this.byId = new Map(data.entries.map((entry) => [entry.id, entry]));
  }
  data;
  paths;
  byId;
  static async open(overrides = {}) {
    const paths = {
      libraryRoot: overrides.libraryRoot ?? path.dirname(fileURLToPath(import.meta.resolve("@local/affectui/package.json"))),
      dataRoot: overrides.dataRoot ?? fileURLToPath(new URL("../data/", import.meta.url)),
      tokensPath: overrides.tokensPath ?? fileURLToPath(import.meta.resolve("@rea-ui/tokens/json"))
    };
    const data = JSON.parse(await readWithin(paths.dataRoot, "catalog.json"));
    return new _ReaCatalog(data, paths);
  }
  entry(id) {
    const exact = this.byId.get(id);
    if (exact) return exact;
    const matches = this.data.entries.filter((entry) => entry.slug === id);
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) throw new CatalogError("AMBIGUOUS_ID", `Use a full section/slug ID: ${matches.map((entry) => entry.id).join(", ")}`);
    throw new CatalogError("NOT_FOUND", `Unknown component: ${id}. Search the catalog first.`);
  }
  selection(id, variant) {
    const entry = this.entry(id);
    const selected = entry.variants.find((item) => item.variant === variant);
    if (!selected) throw new CatalogError("UNAVAILABLE_VARIANT", `${entry.id} has these variants: ${entry.variants.map((item) => item.variant).join(", ")}`);
    return { entry, selected };
  }
  summary(entry) {
    return {
      id: entry.id,
      name: entry.name,
      section: entry.section,
      category: entry.category,
      variants: entry.variants.map((item) => item.variant),
      provenance: entry.provenance,
      url: `${this.data.siteUrl}#${entry.section === "components" ? `playground=${entry.slug}` : `section=${entry.section}&item=${entry.slug}`}`
    };
  }
  list() {
    return { version: this.data.version, total: this.data.entries.length, entries: this.data.entries.map((entry) => this.summary(entry)) };
  }
  search(options = {}) {
    const { query = "", section, limit = 20, offset = 0 } = options;
    if (section && !sections.some((value) => value === section)) throw new CatalogError("INVALID_ARGUMENT", "Unknown catalog section.");
    if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(offset) || offset < 0) {
      throw new CatalogError("INVALID_ARGUMENT", "limit must be 1\u2013100 and offset must be a nonnegative integer.");
    }
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const results = this.data.entries.filter((entry) => {
      const text = normalize(`${entry.id} ${entry.name} ${entry.category}`);
      return (!section || entry.section === section) && terms.every((term) => text.includes(term));
    }).sort((left, right) => {
      const score = (entry) => Number(normalize(entry.slug) === normalize(query)) * 100 + Number(normalize(entry.name).startsWith(normalize(query))) * 10;
      return score(right) - score(left) || left.id.localeCompare(right.id, "en");
    });
    return {
      total: results.length,
      offset,
      limit,
      nextOffset: offset + limit < results.length ? offset + limit : null,
      entries: results.slice(offset, offset + limit).map((entry) => this.summary(entry))
    };
  }
  describe(id) {
    const entry = this.entry(id);
    return {
      ...this.summary(entry),
      requirements: { react: "^19.0.0", cssImports: true },
      notice: "rea-ui://notice",
      variants: entry.variants.map((item) => ({
        variant: item.variant,
        exportName: item.exportName,
        packageImport: item.packageImport,
        dependencies: item.dependencies,
        assets: item.assets,
        apiAvailable: Boolean(item.apiPath),
        files: [
          {
            name: item.tsxFileName,
            language: "tsx",
            bytes: item.tsxBytes,
            sha256: item.tsxHash,
            uri: `rea-ui://source/${entry.id}/${item.variant}/tsx`
          },
          {
            name: item.cssFileName,
            language: "css",
            bytes: item.cssBytes,
            sha256: item.cssHash,
            uri: `rea-ui://source/${entry.id}/${item.variant}/css`
          }
        ],
        previewUrl: `${this.data.siteUrl}preview.html?id=${entry.id}&variant=${item.variant}`
      }))
    };
  }
  async api(id, variant = "default", includeInherited = false) {
    const { entry, selected } = this.selection(id, variant);
    if (!selected.apiPath) return {
      id: entry.id,
      variant: selected.variant,
      available: false,
      props: [],
      message: "This resource has no generated Props document. Inspect its TSX export instead of assuming a component API."
    };
    const data = JSON.parse(await readWithin(this.paths.dataRoot, selected.apiPath));
    return {
      id: entry.id,
      name: data.name,
      variant: selected.variant,
      available: true,
      includesInherited: includeInherited,
      props: data.props.filter((prop) => includeInherited || !prop.inherited)
    };
  }
  async source(id, variant = "default", file = "both") {
    const { entry, selected } = this.selection(id, variant);
    if (!["both", "tsx", "css"].includes(file)) throw new CatalogError("INVALID_ARGUMENT", "file must be tsx, css or both.");
    const definitions = [
      { language: "tsx", name: selected.tsxFileName, relative: selected.tsxPath, hash: selected.tsxHash },
      { language: "css", name: selected.cssFileName, relative: selected.cssPath, hash: selected.cssHash }
    ];
    const files = await Promise.all(definitions.filter((item) => file === "both" || file === item.language).map(async (item) => {
      const content = await readWithin(this.paths.libraryRoot, item.relative);
      const sha256 = createHash("sha256").update(content).digest("hex");
      if (sha256 !== item.hash) throw new CatalogError("STALE_DATA", "Copyable source changed. Regenerate documentation and rebuild the MCP package.");
      return { name: item.name, language: item.language, bytes: Buffer.byteLength(content), sha256, content };
    }));
    return {
      id: entry.id,
      variant: selected.variant,
      exportName: selected.exportName,
      dependencies: selected.dependencies,
      assets: selected.assets,
      instructions: "Save both sibling files together. The TSX imports its CSS. Keep the client directive, types and provenance notices.",
      files
    };
  }
  usage(id, variant = "default", mode = "local") {
    const { entry, selected } = this.selection(id, variant);
    if (mode !== "local" && mode !== "package") throw new CatalogError("INVALID_ARGUMENT", "mode must be local or package.");
    return {
      id: entry.id,
      variant: selected.variant,
      mode,
      language: "tsx",
      code: selected.usage[mode],
      files: mode === "local" ? [selected.tsxFileName, selected.cssFileName] : [],
      instructions: mode === "local" ? "Put the downloaded TSX/CSS pair in ./components beside this example." : "Install the private @local/affectui package. Its component styles are included."
    };
  }
  async tokens(group) {
    const data = JSON.parse(await fs.readFile(this.paths.tokensPath, "utf8"));
    if (group && !Object.hasOwn(data, group)) throw new CatalogError("INVALID_ARGUMENT", `Token groups: ${Object.keys(data).join(", ")}`);
    return {
      groups: Object.keys(data),
      values: group ? { [group]: data[group] } : data,
      cssImport: "@rea-ui/tokens/css",
      scope: ".rea-theme"
    };
  }
  async notice() {
    const [notice, license] = await Promise.all([readWithin(this.paths.dataRoot, "NOTICE.md"), readWithin(this.paths.dataRoot, "affectui-MIT.txt")]);
    return `${notice}

## Preserved MIT notice for official free components

${license}`;
  }
};

// packages/mcp/src/copy.ts
import fs2 from "node:fs/promises";
import path2 from "node:path";
async function copyComponent(catalog, id, variant, directory) {
  const source = await catalog.source(id, variant);
  const root = path2.resolve(directory);
  const destinations = source.files.map((file) => {
    if (path2.basename(file.name) !== file.name) throw new CatalogError("INVALID_DATA_PATH", "Source filenames must be plain sibling filenames.");
    return { ...file, destination: path2.join(root, file.name) };
  });
  for (const file of destinations) {
    try {
      await fs2.lstat(file.destination);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    throw new CatalogError("FILE_EXISTS", `Refusing to overwrite ${file.destination}. Choose a new output directory or merge the files explicitly.`);
  }
  await fs2.mkdir(root, { recursive: true });
  const written = [];
  try {
    for (const file of destinations) {
      await fs2.writeFile(file.destination, file.content, { flag: "wx" });
      written.push(file.destination);
    }
  } catch (error) {
    await Promise.all(written.map((file) => fs2.unlink(file)));
    throw error;
  }
  return {
    id: source.id,
    variant: source.variant,
    files: written,
    dependencies: source.dependencies,
    assets: source.assets,
    usage: catalog.usage(source.id, source.variant)
  };
}

// packages/mcp/src/command.ts
var help = `rea-ui-catalog <command> [id/query] [options]

  search [query]          --section components|screens|blocks|illustrations|motion --limit 20 --offset 0
  describe <id>          Available variants, files, sizes, dependencies and preview URLs
  api <id>               --variant default|clean --include-inherited
  source <id>            --variant default|clean --file both|tsx|css [--raw]
  usage <id>             --variant default|clean --mode local|package [--raw]
  tokens                 --group color|space|radius|font|fontSize|lineHeight|motion|layer
  copy <id> --out <dir>   Copy the full TSX/CSS pair; existing files are never overwritten

IDs use section/slug, e.g. components/button. A unique slug also works.
JSON is the default output. --raw prints one selected source file or a usage example.
`;
async function runCatalogCli(args, paths) {
  try {
    const { values, positionals } = parseArgs({
      args,
      allowPositionals: true,
      options: {
        section: { type: "string" },
        limit: { type: "string" },
        offset: { type: "string" },
        variant: { type: "string" },
        file: { type: "string" },
        mode: { type: "string" },
        group: { type: "string" },
        out: { type: "string" },
        raw: { type: "boolean" },
        "include-inherited": { type: "boolean" },
        help: { type: "boolean", short: "h" }
      }
    });
    const [command, id] = positionals;
    if (!command || values.help) process.stdout.write(help);
    else {
      if (values.raw && command !== "source" && command !== "usage")
        throw new CatalogError(
          "INVALID_ARGUMENT",
          "--raw is supported for source and usage only."
        );
      if (command !== "search" && positionals.length > 2)
        throw new CatalogError(
          "INVALID_ARGUMENT",
          "Unexpected extra positional arguments."
        );
      const catalog = await ReaCatalog.open(paths);
      const variant = values.variant ?? "default";
      const requireId = () => {
        if (!id)
          throw new CatalogError(
            "INVALID_ARGUMENT",
            "A component ID is required."
          );
        return id;
      };
      let result;
      if (command === "search")
        result = catalog.search({
          query: positionals.slice(1).join(" "),
          section: values.section,
          limit: values.limit === void 0 ? 20 : Number(values.limit),
          offset: values.offset === void 0 ? 0 : Number(values.offset)
        });
      else if (command === "describe") result = catalog.describe(requireId());
      else if (command === "api")
        result = await catalog.api(
          requireId(),
          variant,
          values["include-inherited"]
        );
      else if (command === "source") {
        const data = await catalog.source(
          requireId(),
          variant,
          values.file ?? "both"
        );
        if (values.raw) {
          if (data.files.length !== 1)
            throw new CatalogError(
              "INVALID_ARGUMENT",
              "--raw requires --file tsx or --file css."
            );
          process.stdout.write(data.files[0].content);
        }
        result = data;
      } else if (command === "usage") {
        const data = catalog.usage(
          requireId(),
          variant,
          values.mode ?? "local"
        );
        if (values.raw) process.stdout.write(data.code);
        result = data;
      } else if (command === "tokens")
        result = await catalog.tokens(values.group);
      else if (command === "copy") {
        if (!values.out)
          throw new CatalogError(
            "INVALID_ARGUMENT",
            "copy requires --out <directory>."
          );
        result = await copyComponent(catalog, requireId(), variant, values.out);
      } else
        throw new CatalogError(
          "INVALID_ARGUMENT",
          `Unknown command: ${command}`
        );
      if (!values.raw)
        process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        error: {
          code: error instanceof CatalogError ? error.code : "CATALOG_ERROR",
          message: error instanceof Error ? error.message : String(error)
        }
      })
    );
    process.exitCode = 1;
  }
}

// rea-ui-skill-entry.mjs
await runCatalogCli(process.argv.slice(2), {
  libraryRoot: fileURLToPath2(new URL("../assets/library/", import.meta.url)),
  dataRoot: fileURLToPath2(new URL("../assets/catalog/", import.meta.url)),
  tokensPath: fileURLToPath2(new URL("../assets/tokens.json", import.meta.url))
});
