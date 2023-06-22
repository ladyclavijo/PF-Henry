import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
});
