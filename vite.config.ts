import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages servește proiectul din /<repo>/, nu din rădăcina domeniului.
  // Căile relative păstrează asset-urile accesibile indiferent de subfolder.
  base: "./",
  // Path alias — @/ → src/. Fara aceasta configuratie, bundlerul nu stie sa
  // rezolve @/ chiar daca TypeScript accepta calea. Ambele configuratii trebuie
  // sa fie in sync: tsconfig.app.json pentru IDE, vite.config.ts pentru bundler.
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src")
    }
  }
});
