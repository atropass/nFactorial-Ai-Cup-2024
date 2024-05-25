import daisyui from "daisyui";

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  daisyui: {
    styled: true,
    themes: ["dark", "luxury"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  plugins: [require("daisyui")],
};
