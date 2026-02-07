/*
It only fetches max 100 courses
 */
export async function fetchAllCourses({
    filter,
    sort = "created",
}: FetchAllCourses = {}): Promise<Course[]> {
    return await pb.collection("courses").getFullList<Course>(100, {
        sort,
        filter: filter ? retrieveFilter<CourseNested>({ filter }) : undefined,
    });
}
