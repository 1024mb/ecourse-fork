import type { FetchCoursesFromList } from "@/types/dataFetching";

export async function fetchCoursesFromList({
    courseIds,
    sort = "created",
}: FetchCoursesFromList): Promise<Course[]> {
    const filterRecord = retrieveFilter<CourseNested>({
        filter: {
            id: courseIds,
        },
    });

    return await pb.collection("courses").getFullList<Course>(
    {
        sort,
        filter: filterRecord,
    },
    );
}
