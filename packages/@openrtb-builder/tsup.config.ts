import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  clean: true,
  minify: true,
  dts: true,
  entry: ["src/index.ts", "src/v26/index.ts"],
});
