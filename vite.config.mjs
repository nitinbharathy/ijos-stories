import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function inlineStylesheet() {
  return {
    name: "inline-small-stylesheet",
    enforce: "post",
    generateBundle(_options, bundle) {
      const html = bundle["index.html"];
      if (!html || html.type !== "asset") return;

      for (const [filename, asset] of Object.entries(bundle)) {
        if (asset.type !== "asset" || !filename.endsWith(".css")) continue;
        const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const stylesheet = new RegExp(`<link rel="stylesheet"[^>]+href="[^"]*${escapedFilename}"[^>]*>`);
        html.source = String(html.source).replace(stylesheet, `<style>${asset.source}</style>`);
        delete bundle[filename];
      }
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), inlineStylesheet()],
});
