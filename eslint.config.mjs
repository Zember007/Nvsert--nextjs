import { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { FlatCompat } from "@eslint/eslintrc";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "out/**",
      "node_modules/**",
      "src/assets/lib/react-photo-view/**",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y"),
    },
    rules: {
      // React hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // A11y
      "jsx-a11y/anchor-is-valid": "warn",

      // Imports ordering and structure
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // legacy folders / legacy style aliases
            "@/components/*",
            "@/hook/*",
            "@/config/*",

            // FSD layers should be imported via layer aliases, not via @/shared etc
            "@/shared/*",
            "@/entities/*",
            "@/features/*",
            "@/widgets/*",
            "@/app/*",

            // legacy directories (direct)
            "components/*",
            "hook/*",
            "config/*",
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
