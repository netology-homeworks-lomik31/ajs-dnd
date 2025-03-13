import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    pluginJs.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            indent: ["error", 4],
        },
    },
    {
        ignores: ["dist/*"],
    },
    {
        files: ["**/*.test.js"],
        ...jest.configs["flat/recommended"],
        rules: {
            ...jest.configs["flat/recommended"].rules,
            "jest/prefer-expect-assertions": "off",
        },
    },
];
