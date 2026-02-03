import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";

import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import { VueRouterAutoImports } from "vue-router/unplugin";
import VueRouter from "vue-router/vite";

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
            dts: "src/route-map.d.ts",
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
