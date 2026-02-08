<script lang="ts" setup>
import NotFound from "@/components/NotFound.vue";

definePage({
    meta: {
        layout: "blank",
        requiresAuth: true,
    },
});
</script>

<template>
    <NotFound />
</template>
