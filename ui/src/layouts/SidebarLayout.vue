<script lang="ts" setup>
import SearchModal from "@/components/SearchModal.vue";
import SidebarPanel from "@/components/SidebarPanel.vue";

const uiStore = useUIStore();

const { isCoursesVisible = true } = defineProps<{
    isCoursesVisible?: boolean,
}>();
</script>

<template>
    <div
        class="
            flex h-dvh justify-between
            max-lg:overflow-x-hidden
        "
    >
        <SidebarPanel :is-courses-visible="isCoursesVisible ?? true" />
        <slot />

        <Teleport to="body">
            <Transition name="scale-fade">
                <SearchModal v-if="uiStore.isSearchVisible" />
            </Transition>
        </Teleport>
    </div>
</template>
