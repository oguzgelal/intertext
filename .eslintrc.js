module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  ignorePatterns: [
    "packages/intertext-backend-demo/**/*"
  ],
  env: {
    es6: true,
    node: true,
  }
}
