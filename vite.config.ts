import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  ssr: {
    noExternal: ["@remix-run/node/globals"], // Ensuring Remix globals are bundled correctly
    external: ["aws-sdk", "mock-aws-s3", "nock", "@mapbox/node-pre-gyp"], // Marking specific packages as external
  },
  optimizeDeps: {
    exclude: ["aws-sdk", "mock-aws-s3", "nock", "@mapbox/node-pre-gyp"], // Prevent Vite from pre-bundling these dependencies
  },
  build: {
    rollupOptions: {
      external: ['aws-sdk', 'mock-aws-s3', 'nock', '@mapbox/node-pre-gyp'], // Mark them as external to the build process
    },
  },
  resolve: {
    alias: {
      // If there's a direct or indirect import of HTML files causing issues, consider aliasing it to an empty file or resolving the import differently
      // This is a more forceful approach and may need adjustments based on your project's structure
    },
  },
});
