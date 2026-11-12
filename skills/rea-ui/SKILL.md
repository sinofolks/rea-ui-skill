---
name: rea-ui
description: Find and integrate rea/ui React components and resource previews with real Props, complete TSX/CSS files, and checked usage examples. Use when the user requests rea/ui or wants to reuse this component library in a React project.
---

# rea/ui

Use the maintained rea/ui catalog rather than reconstructing code from screenshots or the upstream site. Visual previews are at https://sinofolks.github.io/rea-ui-site/.

## Access the library

Prefer the `rea-ui` MCP tools when connected:

- `search_components`: find entries across components, screens, blocks, illustrations and motion.
- `describe_component`: check available variants, source sizes, dependencies, asset URLs and preview links.
- `get_component_api`: read real TypeScript Props. Native inherited props are optional; resource previews may have no generated API.
- `get_component_usage`: get a checked local-file or private-package example.
- `get_component_source`: read complete TSX/CSS for the selected entry and variant.
- `get_design_tokens`: inspect actual theme token values when needed.

If MCP is unavailable, run the helper using this skill's actual absolute directory, from any project:

```sh
node <skill-dir>/scripts/rea-ui.mjs search "AI Answer"
node <skill-dir>/scripts/rea-ui.mjs describe components/ai-answer
node <skill-dir>/scripts/rea-ui.mjs api components/ai-answer
node <skill-dir>/scripts/rea-ui.mjs usage components/ai-answer --raw
node <skill-dir>/scripts/rea-ui.mjs copy components/ai-answer --out ./src/components/rea-ui
```

The published skill includes the catalog, Props, tokens and complete source pairs in `assets/`. Its helper runs offline with Node.js 20.6 or newer; no npm dependencies, MCP connection or private checkout are needed. In the maintainer checkout, the development helper uses the built `@rea-ui/mcp` CLI instead. `REA_UI_ROOT` can select another checkout for development.

## Integrate an entry

Search by English component name, slug or category, then use the returned `section/slug` ID. Select only a listed `default` or `clean` variant. Read the actual Props and Usage before supplying application data or callbacks; empty example collections are intentional initial states.

For copyable usage, keep the complete TSX and CSS files together and preserve their filenames and relative CSS import. The Usage example assumes a `components/` directory; adjust that import to the target project's actual folder. Preserve the client directive, named exports, types and dynamic inline styles. For large screens, use the helper's `copy` command so full source does not need to enter the conversation. It refuses to overwrite existing files; merge existing project code deliberately.

Use package-mode Usage if the target project already installs the private `@local/affectui` package. Package entry points include their component styles. Copyable usage requires React 19 and a build tool that supports CSS imports. Check the returned asset URLs for resources that use remote images.

`@rea-ui/tokens/css` is scoped to `.rea-theme`; inspect tokens before applying a theme. Resource previews do not automatically have the same configurable Props as components.

Preserve provenance notices. The official free-component MIT notice does not license every reconstructed component or resource. Read `assets/catalog/NOTICE.md` (or the MCP resource `rea-ui://notice`) when provenance or redistribution is relevant.
