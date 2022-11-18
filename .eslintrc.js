module.exports = {
  root: true,
  env: {
    node: true,
    // "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
