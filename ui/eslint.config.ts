import vueI18n from "@intlify/eslint-plugin-vue-i18n";
import pluginVitest from "@vitest/eslint-plugin";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import pluginPlaywright from "eslint-plugin-playwright";
import pluginVue from "eslint-plugin-vue";
import { globalIgnores } from "eslint/config";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
{
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts,mts,tsx}"],
},

globalIgnores([
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    "auto-imports.d.ts",
    "typed-router.d.ts",
    "src/route-map.d.ts",
]),

...pluginVue.configs["flat/recommended"],
vueTsConfigs.recommended,

{
    ...pluginPlaywright.configs["flat/recommended"],
    files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
},

{
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
},

// @ts-expect-error the type is wrong
...vueI18n.configs.recommended,
{
    rules: {
        "@intlify/vue-i18n/no-dynamic-keys": "error",
        "@intlify/vue-i18n/no-unused-keys": [
            "error",
            {
                extensions: [
                    ".js",
                    ".vue",
                    ".ts",
                ],
            },
        ],
    },
    settings: {
        "vue-i18n": {
            localeDir: {
                pattern: "./src/locales/*.{json,json5,yaml,yml}", // extension is glob formatting!
                localeKey: "file", // or 'path' or 'key'
            },

            // Specify the version of `vue-i18n` you are using.
            // If not specified, the message will be parsed twice.
            messageSyntaxVersion: "^11.0.0",
        },
    },
},

{
    name: "app/tailwind",
    plugins: {
        "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
        ...eslintPluginBetterTailwindcss.configs.recommended.rules,
    },
    settings: {
        "better-tailwindcss": {
            entryPoint: "src/app.css",
        },
    },
},

// {
//     name: "app/indentation",
//     rules: {
//         // JS / TS
//         "indent": [
//             "error", 4, {
//                 "SwitchCase": 1,
//                 "ignoredNodes": [
//                     "TemplateLiteral *",
//                 ],
//             },
//         ],
//
//         "vue/html-indent": [
//             "error", 4, {
//                 "attribute": 1,
//                 "baseIndent": 1,
//                 "closeBracket": 0,
//                 "alignAttributesVertically": true,
//                 "ignores": [],
//             },
//         ],
//     },
// },
{
    name: "project/code-style",
    files: ["**/*.{ts,tsx,vue}"],
    rules: {
        // Quotes
        "quotes": [
            "error",
            "double",
            { avoidEscape: true },
        ],
        "jsx-quotes": [
            "error",
            "prefer-double",
        ],

        // Semicolons & trailing commas
        "semi": [
            "error",
            "always",
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],

        // Indentation
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                MemberExpression: 1,
                FunctionDeclaration: { parameters: 1, body: 1 },
                FunctionExpression: { parameters: 1, body: 1 },
                CallExpression: { arguments: "off" },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                ignoreComments: false,
            },
        ],

        // Object, import & template spacing
        "object-curly-spacing": [
            "error",
            "always",
        ],
        "array-bracket-spacing": [
            "error",
            "never",
        ],
        "template-curly-spacing": [
            "error",
            "always",
        ],

        // Align multi-line stuff
        "operator-linebreak": [
            "error",
            "before",
        ],
        "function-call-argument-newline": [
            "error",
            "consistent",
        ],
        "function-paren-newline": [
            "error",
            "multiline-arguments",
        ],
        "array-element-newline": [
            "error",
            { "multiline": true, "minItems": 2 },
        ],
        "object-property-newline": [
            "error",
            { "allowMultiplePropertiesPerLine": true },
        ],
        "multiline-ternary": [
            "error",
            "always-multiline",
        ],

        // Braces placement
        "brace-style": [
            "error",
            "1tbs",
            { "allowSingleLine": true },
        ],
        "curly": [
            "error",
            "all",
        ],

        // Vue-specific
        "vue/html-indent": [
            "error",
            4,
            {
                "attribute": 1,
                "baseIndent": 1,
                "closeBracket": 0,
                "alignAttributesVertically": true,
                "ignores": [],
            },
        ],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: { max: 4 },
                multiline: { max: 1 },
            },
        ],
        "vue/singleline-html-element-content-newline": "error",
        "vue/multiline-html-element-content-newline": "error",
        "vue/html-quotes": [
            "error",
            "double",
        ],
        "vue/html-closing-bracket-spacing": [
            "error",
            { startTag: "never", endTag: "never", selfClosingTag: "always" },
        ],

        // Chained calls alignment
        "newline-per-chained-call": [
            "error",
            { ignoreChainWithDepth: 2 },
        ],

        "vue/multi-word-component-names": [
            "error",
            {
                "ignores": [
                    "index",
                    "[...param]",
                ],
            },
        ],
    },
},
{
    name: "better-tailwindcss",
    rules: {
        "better-tailwindcss/enforce-consistent-line-wrapping": [
            "error",
            {
                "printWidth": 120,
                "indent": 4,
            },
        ],
        "better-tailwindcss/no-unknown-classes": [
            "error",
            {
                ignore: [
                    "progress",
                ],
            },
        ],
    },
},
);
