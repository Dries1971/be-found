import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Unit-test-only config (no Storybook browser tests).
 * Used in CI to avoid requiring Playwright browser install.
 * For full test suite (unit + Storybook), use: vitest.config.ts
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
