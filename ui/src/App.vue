<script lang="ts" setup>
import { Toaster } from "vue-sonner";
</script>

<template>
    <Toaster
        :duration="5000"
        close-button
        position="bottom-right"
        rich-colors
        theme="dark"
    />

    <RouterView />
</template>
