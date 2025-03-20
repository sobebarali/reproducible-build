import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Base configurations
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  // JavaScript configuration
  pluginJs.configs.recommended,

  // TypeScript configuration - without type checking
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: config.files ?? ["**/*.{ts,tsx}"],
  })),

  // Custom rules
  {
    rules: {
      // Code structure
      "max-len": [
        "error",
        { code: 100, ignoreComments: true, ignoreStrings: true },
      ],
      "max-lines": ["warn", { max: 300 }],

      // Modern syntax
      "prefer-const": "error",
      "no-var": "error",
      "prefer-template": "error",
      "prefer-destructuring": ["warn", { object: true, array: false }],
      "arrow-body-style": ["warn", "as-needed"],

      // TypeScript specific - less strict version
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Functional programming
      "no-param-reassign": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",

      // Async/await
      "no-return-await": "off",
    },
  },

  // Test files specific config
  {
    files: [
      "**/tests/**/*.{ts,tsx}",
      "**/__tests__/**/*.{ts,tsx}",
      "**/*.test.{ts,tsx}",
    ],
    rules: {
      // Relax certain rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "max-lines": "off",
    },
  },
];
