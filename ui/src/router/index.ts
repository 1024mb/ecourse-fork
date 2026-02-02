import { loadAndSetLocale } from "@/middlewares/loadAndSetLocale";
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(
async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
): Promise<void> => {
    await loadAndSetLocale();
    next();
},
);

export default router;
