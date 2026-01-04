import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Turn off rules that conflict with Prettier.
  eslintConfigPrettier,

  // Custom rules
  {
    rules: {
      // Allow setState in useEffect for hydration patterns with localStorage
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
