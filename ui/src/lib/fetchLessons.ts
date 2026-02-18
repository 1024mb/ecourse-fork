export async function fetchLessons({
    filter,
}: FetchLessons): Promise<Lesson[]> {
    return await pb.collection(LESSONS_COLLECTION).getFullList<Lesson>({
        sort: "created",
        filter: filter != null ? retrieveFilter<LessonNested>({ filter, filterIsInclude: true }) : undefined,
    });
}
