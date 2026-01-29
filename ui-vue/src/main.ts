import App from "@/App.vue";
import { setupI18n } from "@/i18n";
import "@/app.css";
import router from "@/router";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "plyr/dist/plyr.css";
import { createApp } from "vue";

const i18n = await setupI18n();

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const head = createHead();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(head);

app.mount("#app");
