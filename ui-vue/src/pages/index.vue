<script lang="ts" setup>
import AlertModal from "@/components/AlertModal.vue";
import SearchModal from "@/components/SearchModal.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();

console.log("Loading Course...");

if (authStore.currentUser == null) {
    console.log("User not found");
    useRouter().push("/login");
}
</script>

<template>
    <div>
        <Teleport to="body">
            <SearchModal v-if="authStore.currentUser" />
            <AlertModal v-if="authStore.currentUser" />
        </Teleport>
    </div>
</template>

<style scoped>

</style>
