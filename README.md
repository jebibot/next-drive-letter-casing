# next build fails on Windows when drive-letter casing differs

Minimal reproduction for a Next.js bug report. It was created with
`npx create-next-app -e reproduction-template`. The only additions are
[`repro.mjs`](repro.mjs) and the `repro` script in `package.json`.

On Windows:

```bash
npm install
npm run build   # passes
npm run repro   # fails: TypeError: Cannot read properties of null (reading 'useContext')
```

`repro.mjs` runs `next build` with the project directory spelled `C:\...` and
Next's entry point spelled `c:\...\node_modules\next\dist\bin\next`. Both point
to the same files; only the case of the drive letter differs.
`npm run repro -- --webpack` fails the same way.

The [Reproduce workflow](../../actions/workflows/repro.yml) runs both builds on
`windows-latest`. Its last step fails while the bug exists.
