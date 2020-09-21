module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:functional/recommended",
    "prettier/standard",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "functional",
    "prettier",
  ],
  rules: {
    "functional/functional-parameters": "off",
    "functional/no-return-void": "off",
    "functional/no-mixed-type": "off",
    "functional/prefer-readonly-type": "off",
  },
};
