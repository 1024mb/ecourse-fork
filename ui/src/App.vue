<script lang="ts" setup>
import BlankLayout from "@/layouts/BlankLayout.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { Toaster } from "vue-sonner";

const route = useRoute();

const { t } = useI18n();

const layouts: Record<string, unknown> = {
    sidebar: SidebarLayout,
    blank: BlankLayout,
};

const currentLayout = computed(() => {
    const layoutName = (route.meta.layout as string) || "sidebar";
    return layouts[layoutName] ?? layouts.sidebar;
});
</script>

<template>
    <Suspense>
        <component :is="currentLayout" :is-courses-visible="route.meta.isCoursesVisible">
            <Toaster
                :duration="5000"
                close-button
                position="bottom-right"
                rich-colors
                theme="dark"
            />

            <RouterView :key="route.fullPath" />
        </component>

        <template #fallback>
            <div class="flex h-screen w-screen flex-col items-center justify-center">
                {{ t("msg.loadingFallback") }}
            </div>
        </template>
    </Suspense>
</template>
