// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import node from "@astrojs/node";

import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    ,
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ECCGakuApp改",
        short_name: "GakuApp改",
        description: "ECCコンピュータ専門学校学生アプリ",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
  devToolbar: {
    enabled: false,
  },
});
