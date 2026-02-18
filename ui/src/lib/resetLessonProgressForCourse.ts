import { getProgressTypeId } from "@/lib/utils";

export async function resetLessonProgressForCourse({ courseId }: {
    courseId: string
}): Promise<void> {
    const { courseLessons, lessonProgress } = await fetchLessonProgress({ courseId, returnLessons: true });

    const lessonProgressLessonIds = lessonProgress.map((lessonProgress) => lessonProgress.lesson);

    const notStartedId = await getProgressTypeId({ progressTypeName: "not_started" });

    for (const lesson of courseLessons) {
        if (lessonProgressLessonIds.includes(lesson.id)) {
            continue;
        }

        await pb.collection(PROGRESS_LESSON_COLLECTION).create<LessonProgress>({
            lesson: lesson.id,
            status: notStartedId,
            user: pb.authStore.record?.id,
        });
    }

    for (const lesson of lessonProgress) {
        await pb.collection(PROGRESS_LESSON_COLLECTION).update<LessonProgress>(lesson.id, {
            status: notStartedId,
        });
    }
}
