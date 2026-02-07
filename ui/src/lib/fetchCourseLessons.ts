export async function fetchCourseLessons({
    courseId,
    filter = {},
    sort = "created",
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

    return await pb.collection("lessons").getFullList<Lesson>({
        filter: courseFilter,
        sort,
    });
}
