import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// GitHub Pages project site: base MUST equal "/<RepoName>/".
const BASE = "/CS_LLMFoundations/";

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE,
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "icons/apple-touch-icon.png"],
      manifest: {
        name: "LLM Foundations",
        short_name: "LLM Found.",
        description:
          "How transformers work, how LLMs are trained, aligned and taught to reason, and how to measure it — between Introduction to AI/ML and Agentic AI Foundations.",
        theme_color: "#1e2240",
        background_color: "#1e2240",
        display: "standalone",
        orientation: "any",
        scope: BASE,
        start_url: BASE,
        icons: [
          { src: "icons/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"],
        // Lab notebooks live in /labs at the repo root, outside the build, and
        // open in Colab from GitHub. Excluded here too in case one is ever
        // copied into public/: they must never enter the precache.
        globIgnores: ["**/*.ipynb", "**/labs/**"],
        // Fleet ceiling is 5MB for the whole precache; no single file near it.
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
      },
    }),
  ],
});
