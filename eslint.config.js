const globals = require("globals");
const pluginVue = require("eslint-plugin-vue");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");

module.exports = {
  globals: globals.browser,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended"
  ],
  plugins: ["@typescript-eslint", "vue"],
};
