export async function fetchLessonProgress({ courseId, returnLessons }: {
    courseId: string,
    filter?: LessonProgressFilter,
    returnLessons?: false
}): Promise<LessonProgress[]>
export async function fetchLessonProgress({ courseId, returnLessons }: {
    courseId: string,
    filter?: LessonProgressFilter,
    returnLessons: true
}): Promise<{
    lessonProgress: LessonProgress[],
    courseLessons: Lesson[]
}>
export async function fetchLessonProgress({
    courseId,
    returnLessons = false,
}: FetchLessonProgress): Promise<LessonProgress[] | {
    lessonProgress: LessonProgress[],
    courseLessons: Lesson[]
}> {
    const courseLessons = await fetchCourseLessons({ courseId });

    const lessonIds = courseLessons.map((courseLesson) => courseLesson.id);

    const filter = retrieveFilter<LessonProgress>({
        filter: {
            lesson: lessonIds,
        },
    });

    const lessonProgress = await pb.collection(PROGRESS_LESSON_COLLECTION).getFullList<LessonProgress>({
        sort: "created",
        filter,
    });

    if (returnLessons) {
        return {
            lessonProgress,
            courseLessons,
        };
    } else {
        return lessonProgress;
    }
}
