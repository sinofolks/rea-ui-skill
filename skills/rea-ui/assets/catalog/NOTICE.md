# Provenance and licensing

This public skill distributes the TSX/CSS pairs available from the rea/ui showcase. It combines implementations derived from affectUI's official free-source repository with implementations reconstructed from publicly loaded browser previews. It is not an official affectUI release.

Each catalog entry records its provenance. Twenty-three free components derive from the official TSX implementations. The corresponding MIT notice, Copyright 2026 Florian Höller (adfects), is preserved in [affectui-MIT.txt](affectui-MIT.txt). Resource entries distinguish official free implementations from reconstructed previews in the same way.

The remaining 67 component implementations and the resource entries marked reconstructed were recovered from public browser code. Their upstream ownership and licensing status remain unchanged. The free-source MIT notice does not grant a license for the entire recovered library. This distribution contains no Pro access keys or authenticated Pro source downloads.

Public TypeScript contracts combine preserved free-source declarations and interfaces reconstructed from public APIs and runtime behavior. Semantically refactored components use explicit internal types; remaining reconstructed resource previews retain a private dynamic-type boundary. They include demo data and are not represented as original Pro TypeScript source or as having configurable component Props where none are documented.

Local modifications include accessibility semantics, labels, keyboard-reachable scrolling, light-theme text/contrast corrections, and separate copyable TSX/CSS delivery. These modifications preserve the original provenance and notices. Remote image references retain their existing ownership; this skill does not bundle those external images.

The separate helper/skill MIT license covers the catalog helper and skill instructions only. It does not relicense any of the bundled upstream-derived component or resource assets.
