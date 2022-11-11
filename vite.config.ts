import {resolve} from "path";
import {defineConfig} from "vite";

export default defineConfig({
  // config options
  assetsInclude: ["**/*.webp"],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        carrito: resolve(__dirname, "pages/carrito.html"),
      },
    },
  },
});
