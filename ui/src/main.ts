import App from "@/App.vue";
import { setupI18n } from "@/i18n";
import router from "@/router";
import Aura from "@primeuix/themes/aura";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "plyr/dist/plyr.css";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import "vue-sonner/style.css";
import "@/app.css";

const i18n = await setupI18n();

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const head = createHead();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(head);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkMode: "bg-dark",
        },
    },
});

app.mount("#app");
