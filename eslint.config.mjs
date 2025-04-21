import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";

const sortClassGroups = [
  // Index signature typically comes first
  "index-signature",

  // Static members (across all access levels)
  ["static-property", "static-accessor-property"],
  "static-block",
  "static-get-method",
  "static-set-method",
  "static-method",

  // Properties (all access levels)
  ["property", "accessor-property"],
  ["protected-property", "protected-accessor-property"],
  ["private-property", "private-accessor-property"],

  // Constructor
  "constructor",

  // Public methods and accessors
  "get-method",
  "set-method",
  "method",

  // Protected methods and accessors
  "protected-get-method",
  "protected-set-method",
  "protected-method",

  // Private methods and accessors
  "private-get-method",
  "private-set-method",
  "private-method",

  // Unknown (keeping at the end)
  "unknown",
];

export default [
  // Base configuration for all files
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  // TypeScript-specific configuration
  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json", // Path to your tsconfig
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      perfectionist,
    },

    // prettier-ignore
    rules: {
      "perfectionist/sort-array-includes": ["warn"],
      "perfectionist/sort-classes": ["warn", { groups: sortClassGroups }],
      "perfectionist/sort-decorators": ["warn"],
      "perfectionist/sort-enums": ["warn", { partitionByComment: true }],
      "perfectionist/sort-exports": ["warn", { groupKind: "values-first" }],
      "perfectionist/sort-heritage-clauses": ["warn"],
      "perfectionist/sort-imports": ["warn"],
      "perfectionist/sort-interfaces": ["warn"],
      "perfectionist/sort-intersection-types": ["warn"],
      // "perfectionist/sort-jsx-props": ["warn"],
      "perfectionist/sort-maps": ["warn", { partitionByComment: true }],
      "perfectionist/sort-modules": ["warn"],
      "perfectionist/sort-named-exports": ["warn", { groupKind: "values-first" }],
      "perfectionist/sort-named-imports": ["warn", { groupKind: "values-first" }],
      // "perfectionist/sort-object-types": ["warn"],
      "perfectionist/sort-objects": ["warn", { partitionByComment: true }],
      "perfectionist/sort-sets": ["warn", { partitionByComment: true }],
      "perfectionist/sort-switch-case": ["warn"],
      // "perfectionist/sort-union-types": ["warn"],
      "perfectionist/sort-variable-declarations": ["warn"],
    },
  },
];
