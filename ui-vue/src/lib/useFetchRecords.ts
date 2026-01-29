import { getI18n } from "@/i18n";
import { pb } from "@/lib/pocketbase.ts";
import { useAlertStore } from "@/stores/useAlertStore";
import { useCoursesStore } from "@/stores/useCoursesStore.ts";
import { useLessonFaqsStore } from "@/stores/useLessonFaqsStore.ts";
import { useLessonResourcesStore } from "@/stores/useLessonResourcesStore.ts";
import { useLessonsStore } from "@/stores/useLessonsStore.ts";
import { useProgressStore } from "@/stores/useProgressStore.ts";
import { useResourcesStore } from "@/stores/useResourcesStore.ts";
import type { Course, Lesson, LessonFaq, LessonResource, Progress, Resource } from "@/types/collections";

export async function fetchCourses() {
    return await pb.collection("courses").getFullList<Course>({
        sort: "created",
    });
}

export async function fetchLessons() {
    return await pb.collection("lessons").getFullList<Lesson>({
        sort: "created",
    });
}

export async function fetchProgress() {
    return await pb.collection("progress").getFullList<Progress>({
        sort: "created",
    });
}

export async function fetchResources() {
    return await pb.collection("resources").getFullList<Resource>({
        sort: "created",
    });
}

export async function fetchLessonFaqs() {
    return await pb.collection("lesson_faqs").getFullList<LessonFaq>({
        sort: "created",
    });
}

export async function fetchLessonResources() {
    return await pb.collection("lesson_resources").getFullList<LessonResource>({
        sort: "created",
    });
}

export async function useFetchRecords() {
    const i18n = getI18n();

    try {
        const courseRecords = await fetchCourses();
        const lessonRecords = await fetchLessons();
        const progressRecords = await fetchProgress();
        const resourceRecords = await fetchResources();
        const lessonFaqsRecords = await fetchLessonFaqs();
        const lessonResourcesRecords = await fetchLessonResources();

        useCoursesStore().set(courseRecords);
        useLessonsStore().set(lessonRecords);
        useProgressStore().set(progressRecords);
        useResourcesStore().set(resourceRecords);
        useLessonFaqsStore().set(lessonFaqsRecords);
        useLessonResourcesStore().set(lessonResourcesRecords);
    } catch (error) {
        console.error(error);
        useAlertStore().showAlert(i18n.global.t("errorMsg.loadDataFailed"), "fail");
    }
}
