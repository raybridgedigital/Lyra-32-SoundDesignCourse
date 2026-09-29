import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Static build for GitHub Pages: https://raybridgedigital.github.io/Lyra-32-SoundDesignCourse/ */
const BASE = "/Lyra-32-SoundDesignCourse/";

export default defineConfig({
  base: BASE,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          outputPath: "/index.html",
          crawlLinks: false,
        },
      },
    }),
    viteReact(),
  ],
});
