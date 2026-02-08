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

    const authStore = useAuthStore();

    if (_to.meta.requiresAuth && authStore.currentUser == null) {
        return next("/login");
    }

    if (_to.meta.requiresNoAuth && authStore.currentUser != null) {
        console.log("Redirect to home");
        return next("/");
    }

    next();
},
);

export default router;
