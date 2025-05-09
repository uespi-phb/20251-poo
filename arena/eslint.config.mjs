import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginMarkdown from "eslint-plugin-markdown";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginN from "eslint-plugin-n";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["build/**", "coverage/**", "node_modules/**"],
  },
  {
    files: ["src/**/*.ts", "test/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      jest: eslintPluginJest,
      import: eslintPluginImport,
      markdown: eslintPluginMarkdown,
      promise: eslintPluginPromise,
      eslintn: eslintPluginN,
      "@typescript-eslint": eslintPluginTypeScript,
    },
    rules: {
      // Regras do Prettier integradas ao ESLint
      "prettier/prettier": [
        "error",
        {
          semi: false,
          tabWidth: 2,
          printWidth: 120,
          singleQuote: true,
          bracketSpacing: true,
          trailingComma: "all",
          arrowParens: "always",
        },
      ],

      // Regras gerais de boas práticas
      // 'no-console': 'warn',
      "no-debugger": "error",

      // Regras para TypeScript
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // Regras para Imports
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],

      // Regras do Jest
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",

      // Regras para Promises
      "promise/always-return": "warn",
      "promise/no-return-wrap": "error",
      "promise/catch-or-return": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
];
