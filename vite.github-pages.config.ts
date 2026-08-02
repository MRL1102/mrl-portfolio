import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "github-pages",
  base: "/mrl-portfolio/",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../github-pages-dist",
    emptyOutDir: true,
    target: "es2022",
  },
});
