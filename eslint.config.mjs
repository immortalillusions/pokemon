import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "warn", // Warn for unused variables
      "@typescript-eslint/no-unused-vars": "warn", // Warn for unused variables in TypeScript
      "@typescript-eslint/no-empty-object-type": "warn", // Warn for empty object types
      "react-hooks/exhaustive-deps": "warn", // Warn for missing dependencies in useEffect
    },
  },
];



export default eslintConfig;
