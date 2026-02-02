<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const uiStore = useUIStore();
const { lessons } = useLessonsStore();
const { courses } = useCoursesStore();

const { t } = useI18n();

const searchTerm = ref("");

const filteredLessons = computed<Lesson[]>(() => {
    return lessons.filter((lesson) => {
        const lessonTitleMatch = lesson.title
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase());

        const course = courses.find((course) => course.id === lesson.course);

        const courseTitleMatch
            = course && course.title.toLowerCase().includes(searchTerm.value.toLowerCase());

        const courseDescriptionMatch
            = course
              && course.description.toLowerCase().includes(searchTerm.value.toLowerCase());

        return lessonTitleMatch || courseTitleMatch || courseDescriptionMatch;
    });
});

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
        uiStore.isSearchVisible = false;
    }
};

watch(
    () => uiStore.isSearchVisible,
    (newValue) => {
        if (!newValue) {
            searchTerm.value = "";
        }
    },
);

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
    <div
        v-if="uiStore.isSearchVisible"
        :class="filteredLessons.length > 5 ? `
            show-center m-auto no-scrollbar h-115.25 w-175 overflow-y-scroll rounded-md bg-dark outline outline-white/10
        ` : `
            show-center m-auto no-scrollbar w-175 overflow-y-scroll rounded-md bg-dark outline-[1.5px] outline-white/10
        `"
        aria-hidden="true"
        @click.stop
    >
        <div
            class="
                sticky inset-x-0 top-0 flex w-full items-center justify-between gap-2 border-b-[1.5px] border-b-white/10
                bg-dark px-4
            "
        >
            <Icon
                class="shrink-0 text-xl text-white/50"
                icon="ph:magnifying-glass"
            />
            <input
                :placeholder="t('findLesson')"
                :value="searchTerm"
                class="
                    flex-1 bg-transparent py-4
                    placeholder:text-white/50
                    focus:outline-none
                "
                type="text"
            >
            <button @click="() => (uiStore.isSearchVisible = false)">
                <Icon
                    class="
                        shrink-0 rotate-45 text-xl text-white/50 transition
                        hover:text-white
                    "
                    icon="ph:plus"
                />
            </button>
        </div>

        <div class="w-full p-4">
            <p
                v-if="filteredLessons.length === 0"
                class="p-2 text-white/50"
            >
                {{ t("msg.noLessonsFound") }}
            </p>
            <p
                v-else
                class="p-2 text-white/50"
            >
                {{ t("msg.showing") }} <span class="text-main">{{ filteredLessons.length }}</span>
                {{ t("msg.lessonsFiltered", filteredLessons.length) }}
            </p>

            <div
                v-for="course in courses"
                :key="course.id"
            >
                <div
                    v-for="lesson in filteredLessons"
                    :key="lesson.id"
                >
                    <div
                        v-if="course.id === lesson.course"
                        class="
                            flex w-full cursor-pointer items-center justify-between gap-5 rounded-md bg-transparent p-3
                            transition
                            hover:bg-white/5
                        "
                        @click="$router.push(`/${lesson.title.toLowerCase()}}`)"
                    >
                        <div class="space-y-1">
                            <h3 class="line-clamp-1 text-start">
                                {{ lesson.title }}
                            </h3>
                            <h4
                                class="line-clamp-1 text-start text-white/50"
                            >
                                {{ course.title }}
                            </h4>
                        </div>
                        <h3 class="text-main">
                            {{ t("button.view") }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
