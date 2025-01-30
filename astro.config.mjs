// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import node from "@astrojs/node";

import AstroPWA from "@vite-pwa/astro";

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
    AstroPWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "astro-pwa",
            },
          },
        ],
      },
      manifest: {
        name: "ECCGakuApp改",
        short_name: "GakuApp改",
        description: "ECCコンピュータ専門学校学生アプリ",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        display: "standalone",
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
