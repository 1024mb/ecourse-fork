<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const customizeData = useCustomizeJson();

const uiStore = useUIStore();
const coursesStore = useCoursesStore();
const resourcesStore = useResourcesStore();
const authStore = useAuthStore();

const router = useRouter();
const { t } = useI18n();

const isCoursesVisible = ref(true);
const windowWidth = ref(0);

const updateWidth = () => {
    windowWidth.value = window.innerWidth;
};

function logout() {
    pb.authStore.clear();
    router.push("/login");
}

function goToHome() {
    router.push("/");
}

watch(windowWidth, () => {
    if (router.currentRoute.value.path !== "/" && windowWidth.value <= 1024) {
        uiStore.isSidebarVisible = false;
    }
});

onMounted(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
});
</script>

<template>
    <Transition name="slide-x">
        <aside
            v-show="uiStore.isSidebarVisible"
            class="flex size-full max-w-80 flex-none flex-col gap-5 border-r-[1.5px] border-r-white/5 bg-white/5 p-5"
        >
            <div class="flex items-center justify-between">
                <img
                    :alt="`${customizeData.name} Logo`"
                    :src="customizeData.logo"
                    :style="`width: ${customizeData.logoSize} px`"
                    aria-hidden="true"
                    class="
                        cursor-pointer transition
                        hover:opacity-80
                    "
                    @click="goToHome"
                >
                <button
                    class="
                        group hidden cursor-pointer items-center justify-center rounded-full bg-transparent p-2
                        transition
                        hover:bg-white/10
                        lg:flex
                    "
                    @click="() => (uiStore.isSidebarVisible = !uiStore.isSidebarVisible)"
                >
                    <Icon
                        class="
                            shrink-0 text-lg text-white/50 transition
                            group-hover:text-white
                        "
                        icon="ph:arrow-line-left"
                    />
                </button>
            </div>

            <div
                v-if="uiStore.isLoading"
                class="
                    hidden w-full max-w-56 animate-pulse rounded-full bg-white/10 p-1
                    sm:block
                "
            />
            <h2
                v-else-if="coursesStore.courses.length > 0"
                class="
                    hidden items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-white/50
                    sm:flex
                "
            >
                <Icon
                    class="shrink-0"
                    icon="ph:graduation-cap"
                />
                {{ t("coursesAssigned", coursesStore.courses.length) }}
            </h2>

            <button
                class="
                    flex w-full cursor-pointer items-center gap-2 rounded-md border-[1.5px] border-white/10
                    bg-transparent p-2 text-white/50 transition outline-none
                    hover:border-transparent hover:bg-white/10
                "
                @click="() => uiStore.isSearchVisible = !uiStore.isSearchVisible"
            >
                <Icon class="shrink-0 text-base" icon="ph:magnifying-glass" />
                {{ t("search") }}
            </button>

            <div
                class="no-scrollbar flex grow flex-col gap-5 overflow-y-scroll"
            >
                <div
                    v-if="uiStore.isLoading && isCoursesVisible && windowWidth >= 1024"
                    class="w-full space-y-3"
                >
                    <div
                        class="
                            w-1/3 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-1/2 lg:max-w-28
                        "
                    />
                    <div
                        class="
                            w-1/2 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-full lg:max-w-44
                        "
                    />
                    <div
                        class="
                            w-1/3 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-1/2 lg:max-w-28
                        "
                    />
                    <div
                        class="
                            w-1/2 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-full lg:max-w-44
                        "
                    />
                </div>
                <div
                    v-else-if="isCoursesVisible && coursesStore.courses.length > 0"
                    class="
                        flex flex-col gap-2
                        lg:hidden
                    "
                >
                    <h3
                        class="flex items-center gap-2 text-xs tracking-[2px] text-white/50"
                    >
                        <Icon class="shrink-0 text-base" icon="ph:graduation-cap" />
                        {{ t("COURSES") }}
                    </h3>
                    <div
                        v-for="course in coursesStore.courses"
                        :key="course.id"
                    >
                        <button
                            aria-hidden="true"
                            class="
                                line-clamp-1 w-full truncate rounded-md bg-transparent p-2 text-start text-white/50
                                transition
                                hover:bg-white/10 hover:text-white
                            "
                            @click="() => scrollToCourse(course.id)"
                        >
                            {{ course.title }}
                        </button>
                    </div>
                </div>

                <div
                    v-if="uiStore.isLoading"
                    class="w-full space-y-3"
                >
                    <div
                        class="
                            w-1/3 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-1/2 lg:max-w-28
                        "
                    />
                    <div
                        class="
                            w-1/2 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-full lg:max-w-44
                        "
                    />
                    <div
                        class="
                            w-1/3 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-1/2 lg:max-w-28
                        "
                    />
                    <div
                        class="
                            w-1/2 animate-pulse rounded-full bg-white/10 p-1
                            lg:w-full lg:max-w-44
                        "
                    />
                </div>
                <div
                    v-else-if="resourcesStore.resources.length > 0"
                >
                    <div class="flex flex-col gap-2">
                        <h3 class="flex items-center gap-2 text-xs tracking-[2px] text-white/50">
                            <Icon class="shrink-0 text-base" icon="ph:link" />
                            {{ t("RESOURCES") }}
                        </h3>
                        <div
                            v-for="resource in resourcesStore.resources"
                            :key="resource.id"
                        >
                            <a
                                :href="resource.link"
                                class="
                                    line-clamp-1 w-full truncate rounded-md bg-transparent p-2 text-start text-white/50
                                    transition
                                    hover:bg-white/10 hover:text-white
                                "
                                target="_blank"
                            >
                                {{ resource.name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="uiStore.isLoading" class="flex w-full items-center gap-3">
                <div class="animate-pulse rounded-full bg-white/10 p-4" />
                <div class="flex-1 space-y-3">
                    <div
                        class="
                            w-1/2 animate-pulse rounded-full bg-white/10 p-1
                            lg:max-w-28
                        "
                    />
                    <div
                        class="
                            w-full animate-pulse rounded-full bg-white/10 p-1
                            lg:max-w-44
                        "
                    />
                </div>
            </div>
            <div
                v-else-if="authStore.currentUser != null"
                class="flex items-center justify-between gap-5"
            >
                <div class="flex items-center gap-2">
                    <img
                        :src="`https://api.dicebear.com/7.x/initials/svg?seed=${authStore.currentUser.username}&backgroundColor=${customizeData.colorMain}`"
                        alt="Profile avatar"
                        class="size-8 rounded-full"
                    >
                    <div>
                        <h3 class="line-clamp-1 truncate text-wrap break-all">
                            {{ authStore.currentUser.username }}
                        </h3>
                        <h4 class="line-clamp-1 truncate text-wrap break-all text-white/50">
                            {{ authStore.currentUser.email }}
                        </h4>
                    </div>
                </div>
                <button
                    class="
                        flex items-center justify-center rounded-md bg-transparent p-2 text-red-400 outline
                        outline-red-400/20 transition
                        hover:bg-red-400/20
                    "
                    @click="logout"
                >
                    <Icon class="shrink-0 text-base" icon="ph:sign-out" />
                </button>
            </div>
        </aside>
    </Transition>
</template>
