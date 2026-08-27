import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  test: {
    environment: "happy-dom",
    include: ["client/src/**/*.test.{ts,tsx}", "server/**/*.test.ts"],
    css: false,
  },
});
