export async function fetchCoursesFromList({
    courseIds,
    sort = "created",
}: FetchCoursesFromList): Promise<Course[]> {
    const filterRecord = retrieveFilter<CourseNested>({
        filter: {
            id: courseIds,
        },
    });

    return await pb.collection(COURSES_COLLECTION).getFullList<Course>(
    {
        sort,
        filter: filterRecord,
    },
    );
}
