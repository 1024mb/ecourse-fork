import { getI18n } from "@/i18n";
import { toast } from "vue-sonner";

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
        toast.error(i18n.global.t("errorMsg.loadDataFailed"));
    }
}
