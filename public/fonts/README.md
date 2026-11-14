# Website font

The entire website uses **Quicksand Variable**, self-hosted from the
`@fontsource-variable/quicksand` npm package under the SIL Open Font License.

`src/styles/display-fonts.css` loads the Latin WOFF2 file with `font-display: swap`
and the supported weight range 300–700. Vite bundles it as a local production
asset, so no Google Fonts network request is needed at runtime.

Both `--font-sans` and `--font-display` select Quicksand. Existing display sizes,
weight hierarchy, theme colors, and component layout remain independently styled.
