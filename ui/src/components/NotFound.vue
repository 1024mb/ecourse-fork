<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const router = useRouter();
const { t } = useI18n();
</script>

<template>
    <main class="flex h-screen w-screen items-center justify-center">
        <div
            class="flex flex-col items-center justify-between gap-5 overflow-clip p-5 text-center"
        >
            <h3
                class="
                    mb-20 rounded-md bg-red-400/10 p-2 text-6xl leading-none text-red-400 outline-[1.5px]
                    outline-red-400/20
                "
            >
                {{ t("pageNotFound") }}
            </h3>
            <button
                class="
                    flex items-center justify-center gap-2 rounded-md bg-main px-4 py-2 transition
                    hover:bg-main/80
                    @max-2xs:w-full @max-2xs:px-0
                "
                @click="router.push('/')"
            >
                <Icon class="shrink-0" icon="ph:arrow-left" />
                {{ t("myCourses") }}
            </button>
        </div>
    </main>
</template>
