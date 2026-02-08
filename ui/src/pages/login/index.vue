<script lang="ts" setup>
import { Icon } from "@iconify/vue";

definePage({
    meta: {
        layout: "blank",
        requiresNoAuth: true,
    },
});

const { t } = useI18n();

const title = computed(() => {
    return `${ t("pageTitle.login") } - ${ t("appName") }`;
});

useHead({
    title: title,
});

const customizedData = useCustomizeJson();
const logo = customizedData.logo;
const appName = computed(() => {
    return customizedData.name ?? t("appName");
});

const isMounted = ref(false);
const username = ref("");
const password = ref("");

const isLoading = ref(false);

const router = useRouter();

const isUsernameValid = computed(() => {
    return username.value.length >= 3 && !/\s/.test(username.value);
});
const isPasswordValid = computed(() => {
    return password.value.length >= 8;
});

const isFormSubmitted = ref(false);
const loginError = ref(false);

onMounted(() => {
    isMounted.value = true;
});

async function login() {
    isFormSubmitted.value = true;

    if (isUsernameValid.value && isPasswordValid.value) {
        isLoading.value = true;
        try {
            await pb.collection("users").authWithPassword(username.value, password.value);
            return router.push("/");
        } catch (err) {
            console.log(err);
            loginError.value = true;
        } finally {
            isLoading.value = false;
        }
    }
}
</script>

<template>
    <div class="flex h-dvh flex-col items-center justify-between px-5 py-10">
        <img
            :alt="appName"
            :src="logo"
            aria-hidden="true"
            class="
                max-w-[60vw] cursor-pointer transition
                hover:opacity-80
            "
            @click="() => router.push('/')"
        >

        <Transition name="scale-up">
            <div
                v-if="isMounted"
                class="
                    flex w-full flex-col items-center gap-5 text-center
                    sm:w-full
                "
            >
                <div class="w-full space-y-1">
                    <h2 class="text-xl text-balance">
                        {{ t("msg.login.welcomeTo") }} {{ appName }}
                    </h2>
                    <h3 class="text-base text-balance text-white/50">
                        {{ t("msg.login.pleaseLogin") }}
                    </h3>
                </div>

                <Transition name="slide-in">
                    <h3
                        v-if="loginError"
                        class="text-balance text-red-400"
                    >
                        {{ t("errorMsg.login.loginFailed") }}
                    </h3>
                </Transition>

                <form
                    class="flex min-w-[15vw] flex-col gap-4 text-center"
                    @submit.prevent="login"
                >
                    <input
                        v-model="username"
                        :class="(!isUsernameValid && isFormSubmitted) ? `
                            rounded-md bg-red-400/5 p-2 text-red-400 outline-[1.5px] outline-red-400/10 transition-all
                            placeholder:text-red-400/50
                            focus:outline-red-400/20
                        ` : `
                            rounded-md bg-white/5 p-2 outline-[1.5px] outline-white/10 transition-all
                            placeholder:text-white/50
                            focus:outline-white/20
                        `"
                        :placeholder="t('form.fields.username')"
                        autocomplete="username"
                        type="text"
                    >

                    <Transition name="slide-in">
                        <h3
                            v-if="!isUsernameValid && isFormSubmitted"
                            class="text-balance text-red-400"
                        >
                            {{ t("form.fields.usernameNotValid") }}
                        </h3>
                    </Transition>

                    <input
                        v-model="password"
                        :class="(!isPasswordValid && isFormSubmitted) ? `
                            rounded-md bg-red-400/5 p-2 text-red-400 outline-[1.5px] outline-red-400/10 transition-all
                            placeholder:text-red-400/50
                            focus:outline-red-400/20
                        ` : `
                            rounded-md bg-white/5 p-2 outline-[1.5px] outline-white/10 transition-all
                            placeholder:text-white/50
                            focus:outline-white/20
                        `"
                        :placeholder="t('form.fields.password')"
                        autocomplete="current-password"
                        type="password"
                    >

                    <Transition name="slide-in">
                        <h3
                            v-if="!isPasswordValid && isFormSubmitted"
                            class="text-balance text-red-400"
                        >
                            {{ t("form.fields.passwordNotValid") }}
                        </h3>
                    </Transition>

                    <button
                        :class="isLoading ? `
                            pointer-events-none flex cursor-pointer items-center justify-center gap-2 rounded-md bg-main
                            p-2 opacity-50
                        ` : `
                            flex cursor-pointer items-center justify-center gap-2 rounded-md bg-main p-2 transition
                            hover:bg-main/80
                        `"
                        type="submit"
                    >
                        <template v-if="isLoading">
                            {{ t("msg.loggingIn") }}
                            <Icon
                                class="shrink-0 animate-spin text-base"
                                icon="fluent:spinner-ios-16-regular"
                            />
                        </template>
                        <template v-else>
                            {{ t("button.login") }}
                            <Icon class="shrink-0 text-base" icon="ph:arrow-right" />
                        </template>
                    </button>
                </form>

                <button>
                    {{ t("button.alreadyLoggedIn") }}
                    <span
                        class="
                            cursor-pointer text-white underline transition
                            hover:text-white/80
                        "
                    >
                        {{ t("myCourses") }}
                    </span>
                </button>
            </div>
        </Transition>

        <p class="text-center text-balance text-white/50">
            {{
                t("copyright", {
                    fullYear: new Date().getFullYear(),
                    appName: appName,
                })
            }}
        </p>
    </div>
</template>
