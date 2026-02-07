<script lang="ts" setup>
import { fetchCourseLessons } from "@/lib/fetchCourseLessons";
import { fetchCourseProgress } from "@/lib/fetchCourseProgress";
import { fetchCourses } from "@/lib/fetchCourses";
import { resetLessonProgressForCourse } from "@/lib/resetLessonProgressForCourse";

import { setLessonAsInProgress } from "@/lib/setLessonProgressAs";
import type { CourseProgressStored } from "@/types/collections";
import { Icon } from "@iconify/vue";
import type { ListResult } from "pocketbase";
import { type PageState, Paginator } from "primevue";

const authStore = useAuthStore();
const progressTypeStore = useProgressTypeStore();
const uiStore = useUIStore();
const coursesStore = useCoursesStore();

uiStore.isLoading = true;

const coursesList = ref<ListResult<Course> | undefined>(undefined);
const lessonsList = ref<Lesson[]>([]);
const progressList = ref<CourseProgressStored[]>([]);

const paginationFirstItem = ref(0);

const router = useRouter();
const { t } = useI18n();

useHead({
    title: t("appName"),
});

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
    const courseProgress = progressList.value.find(
        (progressRecord) => progressRecord.course === courseId,
    );

    if (courseProgress == null) {
        return;
    }

    if (courseProgress.status === "not_started") {
        // set the status to in_progress for the course
        const result = await updateCourseProgressStatus({
            courseProgressId: courseProgress.id,
            newStatusName: "in_progress",
        });

        if (!result) {
            return;
        }
    }

    const lastNonCompletedLessonId = await fetchFirstNonCompletedLesson({ courseId });

    if (lastNonCompletedLessonId != null) {
        await setLessonAsInProgress({ lessonId: lastNonCompletedLessonId });

        return router.push(`/courses/${ courseId }/lessons/${ lastNonCompletedLessonId }`);
    } else {
        const firstLesson = lessonsList.value.find((lesson) => lesson.course === courseId);

        if (firstLesson != null) {
            await setLessonAsInProgress({ lessonId: firstLesson.id });

            return router.push(`/courses/${ courseId }/lessons/${ firstLesson.id }`);
        }
    }
}

async function resetProgress(courseId: string) {
    const courseProgress = progressList.value.find((progressRecord) => progressRecord.course === courseId);

    if (courseProgress == null) {
        return;
    }

    if (courseProgress.status === "completed" || courseProgress.status === "in_progress") {
        loading.value[courseId] = true;

        const result = await updateCourseProgressStatus({
            courseProgressId: courseProgress.id,
            newStatusName: "not_started",
        });

        if (!result) {
            loading.value[courseId] = false;
            return;
        }
        await nextTick();

        openCourseId.value = "";
        enableReactivity.value = false;
        loading.value[courseId] = false;
        isOpen.value[courseId] = false;

        await resetLessonProgressForCourse({ courseId });
        await retrieveProgressList();
    }
}

async function onPageChange(event: PageState) {
    uiStore.currentCoursePage = event.page + 1;
    await loadData({ page: event.page + 1 });
}

async function retrieveProgressList() {
    if (coursesList.value == null) {
        throw new Error("coursesList.value is null");
    }

    await ensureProgressTypes();

    progressList.value = await fetchCourseProgress({
        progressTypeRecords: progressTypeStore.progressTypes,
        filter: {
            course: [
                {
                    id: coursesList.value.items.map((course) => course.id),
                },
            ],
        },
    });
}

async function loadData({ page = 1 }: {
    page?: number
} = {}) {
    if (authStore.currentUser != null) {
        try {
            uiStore.isLoading = true;

            coursesList.value = await fetchCourses({ page });

            paginationFirstItem.value = coursesList.value.perPage * (page - 1);

            lessonsList.value = await fetchCourseLessons({
                filter: {
                    course: [
                        {
                            id: coursesList.value.items.map((course) => course.id),
                        },
                    ],
                },
            });

            await retrieveProgressList();
        } finally {
            uiStore.isLoading = false;
        }
    } else {
        return router.push("/login");
    }
}

watch(enableReactivity, (newValue) => {
    if (newValue) {
        progressList.value.forEach((progressRecord) => {
            if (progressRecord.status === "in_progress") {
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

watch(coursesList, (newValue) => {
    if (newValue == null) {
        coursesStore.clear();
        return;
    }

    coursesStore.set(newValue.items);
});

onMounted(async () => {
    await loadData({ page: uiStore.currentCoursePage ?? 1 });
});
</script>

<template>
    <div class="flex flex-1 flex-col justify-between">
        <div class="mx-5 mt-5 flex flex-1 flex-col gap-5 overflow-y-auto bg-dark pb-5">
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
                    v-if="uiStore.isLoading || coursesList == null"
                    class="
                        w-full max-w-56 animate-pulse rounded-full bg-white/10 p-1
                        max-sm:hidden
                    "
                />
                <h2
                    v-else-if="coursesList.items.length > 0"
                    class="
                        text-white/50
                        max-sm:hidden
                    "
                >
                    {{ t("coursesAssigned", coursesList.items.length) }}
                </h2>
            </div>

            <div
                v-if="uiStore.isLoading || coursesList == null"
                class="flex w-full flex-1 animate-pulse items-center justify-center rounded-md bg-white/10 p-5"
            >
                <Icon
                    class="shrink-0 text-6xl text-white/10"
                    icon="svg-spinners:bars-scale-fade"
                />
            </div>
            <div
                v-else-if="coursesList.items.length === 0"
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
                v-for="course in coursesList.items"
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
                        :aria-hidden="!isOpen[course.id]"
                        :class="isOpen[course.id]
                            ? 'w-full cursor-pointer space-y-5 rounded-t-md rounded-b-none bg-white/5 p-5'
                            : `w-full cursor-pointer space-y-5 rounded-md bg-white/5 p-5`"
                        @click="() => toggleCourse(course.id)"
                    >
                        <div
                            v-for="progressRecord in progressList"
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
                                        :class="progressRecord.status === 'completed'
                                            ? `rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-400/70`
                                            : progressRecord.status === 'in_progress'
                                                ? `rounded-full bg-amber-400/10 px-3 py-1 text-amber-400/70`
                                                : 'rounded-full bg-white/10 px-3 py-1 text-white/70'"
                                    >
                                        {{
                                            progressRecord.status === "completed"
                                                ? t("completed")
                                                : progressRecord.status === "in_progress"
                                                    ? t("inProgress")
                                                    : t("notStarted")
                                        }}
                                    </h3>
                                    <h3 class="flex items-center gap-2 text-white/50">
                                        <Icon class="shrink-0 text-lg" icon="ph:book-open" />
                                        {{
                                            t("lessonsInThisCourse", {
                                                count: lessonsList.filter((lesson) => lesson.course ===
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
                                        v-if="progressRecord.status === 'completed' || progressRecord.status === 'in_progress'"
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
                                            progressRecord.status === "completed"
                                                ? t("openCourse")
                                                : progressRecord.status === "in_progress"
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
                        v-for="lesson in lessonsList"
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

        <div
            class="flex w-full items-center justify-center"
        >
            <Paginator
                v-model:first="paginationFirstItem"
                :current-page-report-template="t('msg.pagination')"
                :rows="coursesList?.perPage ?? 0"
                :total-records="coursesList?.totalItems ?? 0"
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                @page="onPageChange"
            />
        </div>
    </div>
</template>
