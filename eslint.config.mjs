import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  // Ignore directories that are not relevant to the project
  {
    ignores: ["node_modules", "dist", "build", "public", "out"]
  },

  // Extend the Next.js core web vitals and typescript rules
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  // TypeScript specific rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off"
    }
  },

  // Prettier specific configuration
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig;
