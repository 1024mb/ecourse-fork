<script lang="ts" setup>
import { useAlertStore } from "@/stores/useAlertStore";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const alertStore = useAlertStore();

const alertClass = computed(() => {
    if (alertStore.type === "success") {
        return "fixed bottom-5 right-5 z-10 overflow-hidden rounded-md bg-dark p-3 shadow-2xl shadow-dark outline outline-2 outline-emerald-400/10 sm:left-5";
    } else {
        return "fixed bottom-5 right-5 z-10 overflow-hidden rounded-md bg-dark p-3 shadow-2xl shadow-dark outline outline-2 outline-red-400/10 sm:left-5";
    }
});
</script>

<template>
    <Transition name="fly">
        <div
            v-if="alertStore.show"
            :class="alertClass"
        >
            <div class="flex w-full items-center justify-between gap-3">
                <h1 class="flex gap-2 text-balance">
                    <Icon
                        v-if="alertStore.type === 'success'"
                        class="shrink-0 text-xl text-emerald-400"
                        icon="ph:check-circle"
                    />

                    <Icon
                        v-else
                        class="shrink-0 text-xl text-red-400"
                        icon="ph:warning-circle"
                    />

                    {{ alertStore.message }}
                </h1>
                <button
                    class="
                        rounded-full bg-transparent p-2 transition
                        hover:bg-white/5
                    "
                    @click="alertStore.closeAlert()"
                >
                    <Icon
                        class="shrink-0"
                        icon="ph:x"
                    />
                </button>
            </div>
            <div
                v-if="alertStore.type === 'success'"
                class="progress absolute bottom-0 left-0 h-[2px] bg-emerald-400/50"
            />
            <div
                v-else
                class="progress absolute bottom-0 left-0 h-[2px] bg-red-400/50"
            />
        </div>
    </Transition>
</template>

<style scoped>
.progress {
    animation: progress 5s linear;
}

@keyframes progress {
    0% {
        width: 100%;
    }
    100% {
        width: 0;
    }
}
</style>
