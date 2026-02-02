<script lang="ts" setup>
import SearchModal from "@/components/SearchModal.vue";
import SidebarPanel from "@/components/SidebarPanel.vue";
import { updateProgressStatus } from "@/lib/utils";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const progressStore = useProgressStore();
const lessonsStore = useLessonsStore();
const lessonsByCourseStore = useLessonsByCourseStore();
const uiStore = useUIStore();
const coursesStore = useCoursesStore();

const router = useRouter();
const { t } = useI18n();

const isOpen = ref<Record<string, boolean>>({});
const loading = ref<Record<string, boolean>>({});
const openCourseId = ref<string>("");
const enableReactivity = ref(true);

if (authStore.currentUser == null) {
    console.log("User not found");
    useRouter().push("/login");
}

function toggleCourse(courseId: string) {
    isOpen.value[courseId] = !isOpen.value[courseId];
    openCourseId.value = courseId;
}

async function goToFirstLessonOfCourse(courseId: string) {
    const progressRecord = progressStore.progress.find(
        (progressRecord) => progressRecord.course === courseId,
    );

    if (progressRecord == null) {
        return;
    }

    if (progressRecord.status === "Not Started") {
        const updatedProgressRecord = await updateProgressStatus(progressRecord.id, "In Progress");

        if (updatedProgressRecord != null) {
            await nextTick();

            progressStore.progress = progressStore.progress.map((progressRecord) => {
                if (progressRecord.course === courseId) {
                    return {
                        ...progressRecord,
                        status: "In Progress",
                    };
                }
                return progressRecord;
            });
        }
    }

    const currentLesson = lessonsByCourseStore.lessonsByCourse[courseId];

    if (currentLesson != null) {
        return router.push(`/courses/${ courseId }/lessons/${ currentLesson.id }`);
    } else {
        const firstLesson = lessonsStore.lessons.find((lesson) => lesson.course === courseId);

        if (firstLesson != null) {
            lessonsByCourseStore.lessonsByCourse[courseId] = firstLesson;

            return router.push(`/courses/${ courseId }/lessons/${ firstLesson.id }`);
        }
    }
}

async function resetProgress(courseId: string) {
    const progressRecord = progressStore.progress.find((progressRecord) => progressRecord.course === courseId);

    if (progressRecord == null) {
        return;
    }

    if (progressRecord.status === "Completed" || progressRecord.status === "In Progress") {
        loading.value[courseId] = true;

        const updatedProgressRecord = await updateProgressStatus(progressRecord.id, "Not Started");

        if (updatedProgressRecord == null) {
            loading.value[courseId] = false;
        } else {
            await nextTick();

            progressStore.progress = progressStore.progress.map((progressRecord) => {
                if (progressRecord.course === courseId) {
                    return {
                        ...progressRecord,
                        status: "Not Started",
                    };
                } else {
                    return progressRecord;
                }
            });

            openCourseId.value = "";
            enableReactivity.value = false;
            loading.value[courseId] = false;
            isOpen.value[courseId] = false;

            delete lessonsByCourseStore.lessonsByCourse[courseId];
        }
    }
}

watch(enableReactivity, (newValue) => {
    if (newValue) {
        progressStore.progress.forEach((progressRecord) => {
            if (progressRecord.status === "In Progress") {
                isOpen.value[progressRecord.course] = true;
            }
        });
    }
});

watch(openCourseId, () => {
    if (openCourseId.value !== "") {
        if (isOpen.value[openCourseId.value]) {
            const courseElement = document.getElementById(openCourseId.value);
            if (courseElement != null) {
                courseElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
});

onMounted(async () => {
    if (authStore.currentUser != null) {
        try {
            uiStore.isLoading = true;
            await useFetchRecords();
        } finally {
            uiStore.isLoading = false;
        }
    } else {
        return router.push("/login");
    }
});
</script>

<template>
    <div
        class="
            flex h-dvh justify-between
            max-lg:overflow-x-hidden
        "
    >
        <SidebarPanel />

        <div class="flex flex-1 flex-col gap-5 overflow-y-auto bg-dark p-5">
            <div
                class="
                    flex w-full items-center justify-between gap-5
                    max-sm:flex-col max-sm:items-start
                "
            >
                <div class="flex items-center gap-3">
                    <button
                        class="
                            group flex cursor-pointer items-center justify-center rounded-full bg-transparent p-2
                            text-xl transition
                            hover:bg-white/10
                        "
                        @click="() => (uiStore.isSidebarVisible = !uiStore.isSidebarVisible)"
                    >
                        <Icon
                            class="
                                shrink-0 text-white/50 transition
                                group-hover:text-white
                            "
                            icon="ph:list"
                        />
                    </button>
                    <h1 class="flex items-center gap-2 text-base">
                        <Icon class="shrink-0" icon="ph:graduation-cap" />
                        {{ t("myCourses") }}
                    </h1>
                </div>
                <div
                    v-if="uiStore.isLoading"
                    class="
                        w-full max-w-56 animate-pulse rounded-full bg-white/10 p-1
                        max-sm:hidden
                    "
                />
                <h2
                    v-else-if="coursesStore.courses.length > 0"
                    class="
                        text-white/50
                        max-sm:hidden
                    "
                >
                    {{ t("coursesAssigned", coursesStore.courses.length) }}
                </h2>
            </div>

            <div
                v-if="uiStore.isLoading"
                class="flex w-full flex-1 animate-pulse items-center justify-center rounded-md bg-white/10 p-5"
            >
                <Icon
                    class="shrink-0 text-6xl text-white/10"
                    icon="svg-spinners:bars-scale-fade"
                />
            </div>
            <div
                v-else-if="coursesStore.courses.length === 0"
                class="flex w-full flex-1 items-center justify-center"
            >
                <div
                    class="
                        flex w-125 flex-col items-center gap-5 text-center
                        max-sm:w-full
                    "
                >
                    <Icon
                        class="shrink-0 text-6xl text-main"
                        icon="ph:book-open-text-fill"
                    />
                    <div class="space-y-3">
                        <h1 class="text-[30px] leading-snug text-balance">
                            {{ t("noCourseAssigned") }}
                        </h1>
                        <p class="text-base text-white/50">
                            {{ t("courseAssignedCheck") }}
                        </p>
                    </div>
                </div>
            </div>
            <div
                v-for="course in coursesStore.courses"
                v-else
                :key="course.id"
            >
                <div
                    :id="course.id"
                    :class="isOpen[course.id]
                        ? `
                            w-full rounded-md outline-[1.5px] outline-white/20 transition-all
                            hover:outline-white/20
                        `
                        : `
                            w-full rounded-md outline-[1.5px] outline-white/10 transition-all
                            hover:outline-white/20
                        `"
                >
                    <div
                        :class="isOpen[course.id]
                            ? 'w-full cursor-pointer space-y-5 rounded-t-md rounded-b-none bg-white/5 p-5'
                            : `w-full cursor-pointer space-y-5 rounded-md bg-white/5 p-5`"
                        aria-hidden="true"
                        @click="() => toggleCourse(course.id)"
                    >
                        <div
                            v-for="progressRecord in progressStore.progress"
                            :key="progressRecord.id"
                        >
                            <div
                                v-if="course.id === progressRecord.course"
                                class="
                                    flex w-full items-center justify-between gap-5
                                    max-sm:flex-col
                                "
                            >
                                <div
                                    class="
                                        flex items-center gap-3
                                        max-sm:w-full
                                        @max-xs:flex-col @max-xs:items-start
                                    "
                                >
                                    <h3
                                        :class="progressRecord.status === 'Completed'
                                            ? `rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-400/70`
                                            : progressRecord.status === 'In Progress'
                                                ? `rounded-full bg-amber-400/10 px-3 py-1 text-amber-400/70`
                                                : 'rounded-full bg-white/10 px-3 py-1 text-white/70'"
                                    >
                                        {{
                                            progressRecord.status === "Completed"
                                                ? t("completed")
                                                : progressRecord.status === "In Progress"
                                                    ? t("inProgress")
                                                    : t("notStarted")
                                        }}
                                    </h3>
                                    <h3 class="flex items-center gap-2 text-white/50">
                                        <Icon class="shrink-0 text-lg" icon="ph:book-open" />
                                        {{
                                            t("lessonsInThisCourse", {
                                                numberOfLessons: lessonsStore.lessons.filter((lesson) => lesson.course ===
                                                    course.id).length,
                                            })
                                        }}
                                    </h3>
                                </div>
                                <div
                                    class="
                                        flex items-center gap-3
                                        max-sm:w-full
                                    "
                                >
                                    <button
                                        v-if="progressRecord.status === 'Completed' || progressRecord.status === 'In Progress'"
                                        :class="loading[course.id]
                                            ? `
                                                pointer-events-none line-clamp-1 flex cursor-pointer items-center
                                                justify-center gap-2 truncate rounded-md px-4 py-2 text-red-400
                                                opacity-50 outline-[1.5px] outline-red-400/20 transition
                                                hover:bg-red-400/20
                                            `
                                            : `
                                                line-clamp-1 flex cursor-pointer items-center justify-center gap-2
                                                truncate rounded-md px-4 py-2 text-red-400 outline-[1.5px]
                                                outline-red-400/20 transition
                                                hover:bg-red-400/20
                                            `"
                                        @click.stop="() => resetProgress(course.id)"
                                    >
                                        {{ t("resetProgress") }}
                                        <Icon
                                            v-if="loading[course.id]"
                                            class="shrink-0 animate-spin text-base"
                                            icon="fluent:spinner-ios-16-regular"
                                        />
                                    </button>
                                    <button
                                        class="
                                            line-clamp-1 cursor-pointer truncate rounded-md bg-white/10 p-10 px-4 py-2
                                            outline-[1.5px] outline-white/20 transition
                                            hover:bg-white/20
                                            max-sm:w-full max-sm:flex-1 max-sm:px-0
                                        "
                                        @click.stop="() => goToFirstLessonOfCourse(course.id)"
                                    >
                                        {{
                                            progressRecord.status === "Completed"
                                                ? t("openCourse")
                                                : progressRecord.status === "In Progress"
                                                    ? t("continueCourse")
                                                    : t("startCourse")
                                        }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="w-full space-y-2">
                            <h1 class="text-base/relaxed">
                                {{ course.title }}
                            </h1>
                            <h3
                                v-if="course.description != null"
                                class="leading-relaxed text-white/50"
                            >
                                {{ course.description }}
                            </h3>
                        </div>
                    </div>
                    <div
                        v-for="lesson in lessonsStore.lessons"
                        :key="lesson.id"
                    >
                        <div
                            v-if="course.id === lesson.course && isOpen[course.id]"
                            class="
                                flex w-full items-center justify-between gap-5 border-t-[1.5px] border-t-white/10 p-5
                            "
                        >
                            <div class="flex items-center gap-3">
                                <Icon
                                    v-if="lesson.video !== ''"
                                    class="shrink-0 text-3xl text-main"
                                    icon="ph:video"
                                />
                                <Icon
                                    v-else-if="lesson.content !== ''"
                                    class="shrink-0 text-3xl text-main"
                                    icon="ph:text-align-left"
                                />
                                <h3
                                    class="line-clamp-1 truncate text-base text-wrap break-all"
                                >
                                    {{ lesson.title }}
                                </h3>
                            </div>

                            <button
                                class="
                                    flex cursor-pointer items-center gap-2 p-2 text-white/50 transition
                                    hover:text-white
                                "
                                @click="router.push(`/courses/${course.id}/lessons/${lesson.id}`)"
                            >
                                <Icon class="shrink-0 text-lg" icon="ph:eye" />
                                {{ t("view") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <Transition name="scale-fade">
            <SearchModal v-if="uiStore.isSearchVisible" />
        </Transition>
    </Teleport>
</template>
