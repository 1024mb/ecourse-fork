export async function fetchLessonResources({
    lessons,
    filter = {},
    sort = "order_index",
}: FetchLessonResources): Promise<LessonResourceLessonNestedReturn[]> {
    const recordFilter = retrieveFilter<LessonResourceLessonNested>({
        filter: {
            ...filter,
            lesson: [
                [
                    {
                        id: lessons.map((lesson) => lesson.id),
                    },
                ],
            ],
        },
    });

    const lessonResourceLessons = await pb.collection(LESSON_RESOURCES_LESSONS_COLLECTION)
        .getList<LessonResourceLessonExpanded>(1, 30, {
            sort,
            filter: recordFilter,
            expand: "lesson_resource,lesson",
        });

    const result: LessonResourceLessonNestedReturn[] = [];

    for (const lessonResourceLesson of lessonResourceLessons.items) {
        const { expand: _, ...rest } = lessonResourceLesson;

        result.push({
            ...rest,
            lesson: lessonResourceLesson.expand.lesson,
            lesson_resource: lessonResourceLesson.expand.lesson_resource,
        });
    }

    return result;
}
