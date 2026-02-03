import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
                                eslint.configs.recommended,
                                tseslint.configs.recommended,

                                {
                                    files: ["pb_hooks/**/*.ts"],
                                    languageOptions: {
                                        parserOptions: {
                                            project: "./tsconfig.json",
                                        },
                                    },
                                    rules: {
                                        // Quotes
                                        "quotes": [
                                            "error",
                                            "double",
                                            {avoidEscape: true},
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
                                                FunctionDeclaration: {parameters: 1, body: 1},
                                                FunctionExpression: {parameters: 1, body: 1},
                                                CallExpression: {arguments: "off"},
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
                                            {"multiline": true, "minItems": 2},
                                        ],
                                        "object-property-newline": [
                                            "error",
                                            {"allowMultiplePropertiesPerLine": true},
                                        ],
                                        "multiline-ternary": [
                                            "error",
                                            "always-multiline",
                                        ],

                                        // Braces placement
                                        "brace-style": [
                                            "error",
                                            "1tbs",
                                            {"allowSingleLine": true},
                                        ],
                                        "curly": [
                                            "error",
                                            "all",
                                        ],

                                        // Chained calls alignment
                                        "newline-per-chained-call": [
                                            "error",
                                            {ignoreChainWithDepth: 2},
                                        ],
                                    },
                                },
                            ]);
