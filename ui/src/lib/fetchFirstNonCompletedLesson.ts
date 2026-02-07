import { ensureProgressTypes } from "@/lib/utils";

/*
Returns the ID of the first non-completed lesson from the specified course or null if none available
 */
export async function fetchFirstNonCompletedLesson({ courseId }: FetchFirstNonCompletedLesson): Promise<string | null> {
    const {
        lessonProgress,
        courseLessons,
    } = await fetchLessonProgress({ courseId, returnLessons: true });

    await ensureProgressTypes();
    const progressTypeStore = useProgressTypeStore();
    const completedTypeId = progressTypeStore.progressTypes.find(
    (progressType) => progressType.type_name === "completed",
    )?.id;

    if (completedTypeId == null) {
        throw new Error("No \"completed\" progress type was found.");
    }

    const nonCompletedLesson = lessonProgress.find((progress) => progress.status !== completedTypeId);

    if (nonCompletedLesson != null) {
        return nonCompletedLesson.lesson;
    }

    const lastCompletedLesson = lessonProgress.findLast((progress) => progress.status === completedTypeId);

    if (lastCompletedLesson != null) {
        const lastCompletedLessonIndex = courseLessons.findIndex((lesson) => lesson.id === lastCompletedLesson.id);

        if (lastCompletedLessonIndex >= 0) {
            const firstNonCompletedLesson = courseLessons[lastCompletedLessonIndex + 1];

            if (firstNonCompletedLesson != null) {
                return firstNonCompletedLesson.id;
            }
        }
    }

    return courseLessons[0]?.id ?? null;
}
