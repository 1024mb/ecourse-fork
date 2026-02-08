<script lang="ts" setup>
definePage({
    meta: {
        layout: "blank",
        requiresNoAuth: true,
    },
});

const router = useRouter();

router.push("/");
</script>

<template>
    <div
        class="flex h-screen w-screen grow place-content-center place-items-center text-center"
    >
        <h1 class="text-3xl font-bold">
            {{ $t("nothingToSeeHere") }}
        </h1>
    </div>
</template>
