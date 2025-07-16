const js = require("@eslint/js");
const globals = require("globals");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.mocha, // ✅ Add Mocha globals like describe, it, before, after
      },
    },
    rules: {
      ...js.configs.recommended.rules, // ✅ Apply recommended rules correctly here
    },
  },
];
