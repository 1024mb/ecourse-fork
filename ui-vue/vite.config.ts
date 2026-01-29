import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";

import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            imports: [
                "vue",
                "pinia",
                "vue-i18n",
                "@vueuse/head",
                VueRouterAutoImports,
            ],

            dirsScanOptions: {
                filePatterns: ["*.ts"],
                fileFilter: file => file.endsWith(".ts"),
                types: true,
            },

            dirs: [
                "./src/hooks",
                "./src/composables",
                "./src/composables/**",
                "./src/lib",
                "./src/lib/**",
                "./src/stores",
                "./src/stores/**",
                "./src/types",
                "./src/types/**",
            ],

            vueTemplate: true,
            vueDirectives: undefined,

            viteOptimizeDeps: true,
            injectAtEnd: true,

            eslintrc: {
                enabled: true, // <-- this
            },
        }),
        VueRouter({
            /* options */
        }),
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "_": fileURLToPath(new URL(".", import.meta.url)),
        },
    },
});
