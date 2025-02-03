// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  server: {
    host: "0.0.0.0", // Listen on all interfaces instead of just localhost
    port: 4321,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    ,
    react(),
  ],

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
  devToolbar: {
    enabled: false,
  },
});
