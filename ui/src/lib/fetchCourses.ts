import type { ListResult } from "pocketbase";

/*
By default, fetches page 1.
Backend only outputs courses with at least one lesson.
 */
export async function fetchCourses({
    page = 1,
    filter,
    sort = "created",
}: FetchCourses = {}): Promise<ListResult<Course>> {
    return await pb.collection("courses").getList<Course>(
    page,
    3,
    {
        sort,
        filter: filter ? retrieveFilter<CourseNested>({ filter }) : undefined,
    },
    );
}
