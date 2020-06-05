# Sustainable Development Report 2020: Data Visualization

## Bundle Analysis

Run `npm run analyze` to analyze the server and client bundles.

Webpack has been configured **not** to bundle `/public/data/` in the client.
See `next.config.js`.

References:
- https://arunoda.me/blog/ssr-and-server-only-modules
- https://github.com/vercel/next.js/tree/canary/examples/analyze-bundles
- https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
