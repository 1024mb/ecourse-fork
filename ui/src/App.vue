<script lang="ts" setup>
import BlankLayout from "@/layouts/BlankLayout.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { Toaster } from "vue-sonner";

const route = useRoute();

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
</template>
