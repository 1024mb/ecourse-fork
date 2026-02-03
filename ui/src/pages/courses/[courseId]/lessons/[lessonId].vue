<script lang="ts" setup>
import NotFound from "@/components/NotFound.vue";
import { Icon } from "@iconify/vue";
import Plyr from "plyr";
import { toast } from "vue-sonner";

definePage({
    meta: {
        layout: "sidebar",
        isCoursesVisible: false,
    },
});

const route = useRoute("/courses/[courseId]/lessons/[lessonId]");
const router = useRouter();

const authStore = useAuthStore();
const uiStore = useUIStore();
const coursesStore = useCoursesStore();
const lessonsStore = useLessonsStore();
const progressStore = useProgressStore();
const lessonsByCourseStore = useLessonsByCourseStore();
const lessonFaqsStore = useLessonFaqsStore();
const lessonsResourcesStore = useLessonResourcesStore();

const { t } = useI18n();


const { courseId, lessonId } = route.params;

const { name } = useCustomizeJson();

const loading = ref<Record<string, boolean>>({});
let lessonVideo: Plyr | null = null;
const currentCourseStatus = computed(() => {
    const currentProgress = progressStore.progress.find((progress) => progress.course = courseId);
    if (currentProgress == null) {
        return "";
    }

    return currentProgress.status;
});

const currentLessonTitle = computed(() => {
    const currentLesson = getCurrentLesson();

    if (currentLesson == null) {
        return t("unknown");
    }

    return currentLesson.title;
});

const documentTitle = computed(() => {
    return `${ currentLessonTitle.value } - ${ name ?? t("appName") }`;
});

useHead({
    title: documentTitle,
});

function getCourseLessons(courseId: string): Lesson[] {
    return lessonsStore.lessons.filter((lesson) => lesson.course === courseId);
}

function findCurrentLessonIndex(courseLessons: Lesson[]): number {
    return courseLessons.findIndex(lesson => lesson.id === lessonId);
}

function getCurrentLesson(): Lesson | undefined {
    const currentLesson = lessonsStore.lessons.find((lesson) => lesson.id === lessonId);

    if (currentLesson == null) {
        toast.error(t("errorMsg.failedToGetCurrentLesson"));
    }

    return currentLesson;
}

function goToNextLesson() {
    const currentLesson = getCurrentLesson();

    if (currentLesson == null) {
        return;
    }

    const courseLessons = getCourseLessons(currentLesson.course);
    const currentLessonIndex = findCurrentLessonIndex(courseLessons);
    if (
        currentLessonIndex >= 0
        && currentLessonIndex < courseLessons.length - 1
    ) {
        const nextLesson = courseLessons[currentLessonIndex + 1];

        if (nextLesson == null) {
            toast.error(t("errorMsg.failedFindNextLesson"));
            return;
        }

        router.push(
            `/courses/${ courseId }/lessons/${ nextLesson.id }`,
        );

        lessonsByCourseStore.lessonsByCourse[nextLesson.course] = nextLesson;
    }
}

function goToPreviousLesson() {
    const currentLesson = getCurrentLesson();

    if (currentLesson == null) {
        return;
    }

    const courseLessons = getCourseLessons(currentLesson.course);
    const currentLessonIndex = findCurrentLessonIndex(courseLessons);

    if (currentLessonIndex > 0) {
        const previousLesson = courseLessons[currentLessonIndex - 1];

        if (previousLesson == null) {
            toast.error(t("errorMsg.failedFindPreviousLesson"));
            return;
        }

        router.push(
            `/courses/${ courseId }/lessons/${ previousLesson.id }`,
        );

        lessonsByCourseStore.lessonsByCourse[previousLesson.course] = previousLesson;
    }
}

async function completeCourse(lessonId: string) {
    const currentCourse = coursesStore.courses.find((course) => course.id === courseId);

    if (currentCourse == null) {
        toast.error(t("errorMsg.failedFindCourse"));
        return;
    }

    const progressRecord = progressStore.progress.find(
        (progressRecord) => progressRecord.course === courseId,
    );

    if (progressRecord == null) {
        // TODO: is this an error or expected if no progress? I haven't seen where we set "Not Started".
        toast.error(t("errorMsg.failedFindProgress"));
        return;
    }

    if (progressRecord.status === "In Progress") {
        loading.value[lessonId] = true;

        const updatedProgressRecord = await updateProgressStatus(
            progressRecord.id,
            "Completed",
        );

        if (updatedProgressRecord == null) {
            loading.value[lessonId] = false;
        } else {
            toast.success(t("msg.SetCourseAsComplete", {
                courseTitle: currentCourse.title.length > 30
                    ? currentCourse.title.slice(0, 30) + "..."
                    : currentCourse.title,
            }));

            return router.push("/");
        }
    }
}

onUpdated(() => {
    lessonVideo = new Plyr("#lessonVideo", {
        invertTime: false,
        toggleInvert: false,
        captions: {
            active: true,
            update: true,
        },
    });
});

onMounted(async () => {
    if (authStore.currentUser != null) {
        uiStore.isLoading = true;
        await useFetchRecords();
        uiStore.isLoading = false;
    } else {
        return router.push("/login");
    }
});

onUnmounted(() => {
    if (lessonVideo != null) {
        lessonVideo.destroy();
    }
});
</script>

<template>
    <div
        v-if="uiStore.isLoading"
        class="flex w-full flex-col gap-5 p-5"
    >
        <div class="flex items-center gap-3">
            <button
                class="
                    group flex cursor-pointer items-center justify-center rounded-full bg-transparent p-2 text-xl
                    transition
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
            <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1" />
        </div>
        <div
            class="flex w-full grow animate-pulse items-center justify-center rounded-md bg-white/10 p-5"
        >
            <Icon
                class="shrink-0 text-6xl text-white/10"
                icon="svg-spinners:bars-scale-fade"
            />
        </div>
    </div>
    <div
        v-else-if="lessonsStore.lessons.length === 0 || lessonsStore.lessons.every((lesson) => lesson.id !== lessonId)"
    >
        <NotFound />
    </div>
    <template
        v-for="lesson in lessonsStore.lessons"
        v-else
        :key="lesson.id"
    >
        <section
            v-if="lesson.id === lessonId"
            :class="lessonFaqsStore.lessonFaqs.filter((faq) => faq.lesson.includes(lesson.id)).length > 0
                || lessonsResourcesStore.lessonResources.filter((resource) => resource.lesson.includes(lesson.id)).length > 0
                || lesson.downloads.length > 0 ? `
                    flex flex-1 flex-col justify-between gap-5 overflow-y-auto bg-dark p-5
                ` : `flex flex-1 flex-col justify-between overflow-y-auto bg-dark p-5`"
        >
            <div class="flex flex-col space-y-5">
                <button
                    class="
                        flex cursor-pointer items-center gap-2 text-white/50 transition
                        hover:text-white
                    "
                    @click="router.push('/')"
                >
                    <Icon class="shrink-0" icon="ph:arrow-left" />
                    {{ t("myCourses") }}
                </button>

                <div
                    class="
                        flex items-end justify-between gap-5
                        max-sm:w-full max-sm:flex-col max-sm:items-start max-sm:gap-3
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
                        <h1
                            class="
                                text-xl text-balance
                                max-lg:text-lg
                            "
                        >
                            {{ lesson.title }}
                        </h1>
                    </div>

                    <div
                        v-if="currentCourseStatus === 'In Progress' || currentCourseStatus === 'Completed'"
                        class="
                            flex items-center gap-3
                            max-sm:w-full max-sm:flex-col
                        "
                    >
                        <button
                            v-if="findCurrentLessonIndex(getCourseLessons(courseId)) > 0"
                            class="
                                line-clamp-1 flex cursor-pointer items-center justify-center gap-2 truncate rounded-md
                                bg-white/10 px-4 py-2 outline-[1.5px] outline-white/20 transition
                                hover:bg-white/20
                                max-sm:order-last max-sm:w-full
                            "
                            @click="goToPreviousLesson"
                        >
                            <Icon class="shrink-0" icon="ph:arrow-left" />
                            {{ t("previousLesson") }}
                        </button>

                        <button
                            v-if="findCurrentLessonIndex(getCourseLessons(courseId)) >= getCourseLessons(courseId).length - 1"
                            :class="loading[lesson.id] ||
                                currentCourseStatus === 'Completed'
                                ? `
                                    pointer-events-none line-clamp-1 flex cursor-pointer items-center justify-center
                                    gap-2 truncate rounded-md bg-emerald-400/60 px-4 py-2 opacity-50 transition
                                    hover:bg-emerald-400/50
                                    max-sm:order-first max-sm:w-full
                                `
                                : `
                                    line-clamp-1 flex cursor-pointer items-center justify-center gap-2 truncate
                                    rounded-md bg-emerald-400/60 px-4 py-2 transition
                                    hover:bg-emerald-400/50
                                    max-sm:order-first max-sm:w-full
                                `"
                            @click="() => completeCourse(lesson.id)"
                        >
                            {{
                                currentCourseStatus === "Completed"
                                    ? $t("courseCompleted")
                                    : $t("completeCourse")
                            }}

                            <Icon
                                v-if="loading[lesson.id]"
                                class="shrink-0 animate-spin text-base"
                                icon="fluent:spinner-ios-16-regular"
                            />
                            <Icon
                                v-else
                                class="shrink-0"
                                icon="ph:check"
                            />
                        </button>
                        <button
                            v-else
                            class="
                                line-clamp-1 flex cursor-pointer items-center justify-center gap-2 truncate rounded-md
                                bg-main px-4 py-2 transition
                                hover:bg-main/80
                                max-sm:order-first max-sm:w-full
                            "
                            @click="goToNextLesson"
                        >
                            {{ t("nextLesson") }}
                            <Icon class="shrink-0" icon="ph:arrow-right" />
                        </button>
                    </div>
                </div>

                <div class="flex h-[50vh] justify-center">
                    <video
                        v-if="lesson.video != ''"
                        id="lessonVideo"
                        :data-poster="pb.files.getURL(lesson, lesson.thumbnail)"
                        :poster="pb.files.getURL(lesson, lesson.thumbnail)"
                        controls
                        crossorigin="anonymous"
                        playsinline
                        preload="metadata"
                    >
                        <source :src="pb.files.getURL(lesson, lesson.video)">
                        <track
                            v-if="lesson.captions != ''"
                            :src="pb.files.getURL(lesson, lesson.captions)"
                            default
                            kind="captions"
                            label="English captions"
                            srclang="en"
                        >
                    </video>
                    <video v-else-if="lesson.videoLocal != ''">
                        <source :src="lesson.videoLocal">
                        <track
                            v-if="lesson.captions != ''"
                            :src="pb.files.getURL(lesson, lesson.captions)"
                            default
                            kind="captions"
                            label="English captions"
                            srclang="en"
                        >
                    </video>
                    <template v-else-if="lesson.videoRemoteUrl != ''">
                        <div
                            v-if="getYouTubeVideoId(lesson.videoRemoteUrl) != null"
                            class="relative aspect-video w-full overflow-hidden rounded-md"
                        >
                            <iframe
                                :src="`https://www.youtube.com/embed/${getYouTubeVideoId(lesson.videoRemoteUrl)}?rel=0&modestbranding=1`"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                class="absolute inset-0 size-full border-none"
                                title="YouTube video player"
                            />
                        </div>
                        <div
                            v-else-if="isGoogleDriveUrl(lesson.videoRemoteUrl) && getGoogleDriveFileId(lesson.videoRemoteUrl) != null"
                            class="relative aspect-video w-full overflow-hidden rounded-md"
                        >
                            <iframe
                                :src="`https://drive.google.com/file/d/${getGoogleDriveFileId(lesson.videoRemoteUrl)}/preview`"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                class="absolute inset-0 size-full border-none"
                                title="Google Drive video player"
                            />
                        </div>
                        <div
                            v-else
                            class="flex items-center justify-center rounded-md bg-white/5 p-8"
                        >
                            <div class="text-center">
                                <Icon class="mx-auto mb-2 text-4xl text-white/30" icon="ph:warning" />
                                <p class="text-white/50">
                                    {{ t("notSupportedURL") }}
                                </p>
                                <p class="text-sm text-white/30">
                                    {{ t("notSupportedURLDescription") }}
                                </p>
                            </div>
                        </div>
                    </template>
                </div>

                <div
                    v-if="lesson.content != ''"
                    class="
                        flex w-full items-center justify-center rounded-md bg-white/5 p-12
                        max-sm:p-5
                    "
                >
                    <article
                        class="
                            flex w-full max-w-7xl flex-1 flex-col gap-5 pb-8
                            prose-headings:leading-tight
                            prose-h1:py-8 prose-h1:text-5xl
                            prose-h2:py-8 prose-h2:text-4xl
                            prose-h3:py-6 prose-h3:text-3xl
                            prose-h4:py-6 prose-h4:text-2xl
                            prose-h5:py-4 prose-h5:text-xl
                            prose-h6:py-4 prose-h6:text-lg
                            prose-p:text-base/relaxed prose-p:text-white/50
                            prose-a:text-base prose-a:text-main prose-a:underline prose-a:underline-offset-4
                            prose-blockquote:w-fit prose-blockquote:rounded-md prose-blockquote:border-l-2
                            prose-blockquote:border-l-white/50 prose-blockquote:bg-white/5 prose-blockquote:p-5
                            prose-strong:text-white
                            prose-code:text-base prose-code:text-white/50
                            prose-ol:list-inside prose-ol:list-decimal prose-ol:space-y-2 prose-ol:text-base
                            prose-ul:list-inside prose-ul:list-disc prose-ul:space-y-2 prose-ul:text-base
                            prose-img:w-full prose-img:rounded-md
                        "
                        v-html="sanitizeHTML(lesson.content)"
                    />
                </div>

                <div
                    v-if="lesson.summary != ''"
                    class="flex w-full items-center justify-center space-y-2 rounded-md bg-white/5 py-12"
                >
                    <article class="flex w-full max-w-7xl flex-1 flex-col gap-5">
                        <h3 class="flex items-center gap-2 text-4xl">
                            <Icon class="shrink-0" icon="ph:text-align-left" />
                            {{ t("summary") }}
                        </h3>
                        <p class="text-white/50">
                            {{ lesson.summary }}
                        </p>
                    </article>
                </div>
            </div>

            <div
                class="
                    flex w-full items-start justify-between gap-5
                    max-md:flex-col
                "
            >
                <div
                    v-if="lessonFaqsStore.lessonFaqs.filter((faq) => faq.lesson.includes(lesson.id)).length > 0"
                    class="w-full flex-1 space-y-4"
                >
                    <h2 class="flex items-center gap-2 text-2xl">
                        <Icon class="shrink-0" icon="ph:chats" />
                        {{ t("faq") }}
                    </h2>
                    <div class="grid grid-cols-[repeat(auto-fill,minmax(20vw,1fr))] gap-4">
                        <template
                            v-for="faq in lessonFaqsStore.lessonFaqs"
                            :key="faq.id"
                        >
                            <button
                                v-if="faq.lesson.includes(lesson.id)"
                                class="
                                    cursor-pointer space-y-2 self-start rounded-md bg-white/10 p-2 outline-[1.5px]
                                    outline-white/20 transition
                                    hover:bg-white/20
                                "
                                @click="() => (faq.isOpen = !faq.isOpen)"
                            >
                                <span class="flex items-center justify-between gap-2 text-start">
                                    <span class="line-clamp-1 text-base">
                                        {{ faq.question }}
                                    </span>
                                    <Icon
                                        :class="faq.isOpen ? 'shrink-0 rotate-45 transition' : `shrink-0 transition`"
                                        icon="ph:plus"
                                    />
                                </span>
                                <Transition name="slide-in">
                                    <p
                                        v-if="faq.isOpen"
                                        class="text-start text-white/60"
                                    >
                                        {{ faq.answer }}
                                    </p>
                                </Transition>
                            </button>
                        </template>
                    </div>
                </div>

                <div
                    v-if="lessonsResourcesStore.lessonResources.filter((resource) => resource.lesson.includes(lesson.id)).length > 0"
                    class="w-full flex-1 space-y-4"
                >
                    <h2 class="flex items-center gap-2 text-2xl">
                        <Icon class="shrink-0" icon="ph:link" />
                        {{ t("resources") }}
                    </h2>
                    <div class="grid grid-cols-[repeat(auto-fill,minmax(20vw,1fr))] gap-4">
                        <template
                            v-for="resource in lessonsResourcesStore.lessonResources"
                            :key="resource.id"
                        >
                            <a
                                v-if="resource.lesson.includes(lesson.id)"
                                :href="resource.link"
                                class="
                                    block rounded-md bg-white/10 p-2 outline-[1.5px] outline-white/20 transition
                                    hover:bg-white/20
                                "
                                target="_blank"
                            >
                                <div class="flex items-center justify-between gap-2">
                                    <h3 class="line-clamp-1">
                                        {{ resource.name }}
                                    </h3>
                                    <Icon
                                        class="shrink-0"
                                        icon="ph:arrow-up-right"
                                    />
                                </div>
                            </a>
                        </template>
                    </div>
                </div>

                <div
                    v-if="lesson.downloads.length > 0"
                    class="
                        flex-1 space-y-4
                        max-md:w-full
                    "
                >
                    <h2 class="flex items-center gap-2 text-base">
                        <Icon class="shrink-0" icon="ph:file" />
                        {{ t("downloads") }}
                    </h2>

                    <div class="grid grid-cols-[repeat(auto-fill,minmax(20vw,1fr))] gap-4">
                        <a
                            v-for="download in lesson.downloads"
                            :key="download"
                            :href="pb.files.getURL(lesson, download)"
                            class="
                                block w-full rounded-md bg-white/10 p-2 outline-[1.5px] outline-white/20 transition
                                hover:bg-white/20
                            "
                            download
                        >
                            <div class="flex items-center justify-between gap-2">
                                <h3 class="line-clamp-1">
                                    {{ cleanFileName(download) }}
                                </h3>
                                <Icon class="shrink-0" icon="ph:download-simple" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </template>
</template>
