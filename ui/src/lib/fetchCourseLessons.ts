export async function fetchCourseLessons({
    courseId,
    filter = {},
    sort = "order_index",
}: FetchCourseLessons): Promise<Lesson[]> {
    if (courseId != null) {
        filter.course = [
            {
                id: [courseId],
            },
        ];
    }

    const courseFilter = retrieveFilter<LessonNested>({
        filter,
    });

    return await pb.collection(LESSONS_COLLECTION).getFullList<Lesson>({
        filter: courseFilter,
        sort,
    });
}
