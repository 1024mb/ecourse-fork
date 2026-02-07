export async function fetchLessonResources({
    lessons,
    filter = {},
    sort = "created",
}: FetchLessonResource): Promise<LessonResource[]> {
    const recordFilter = retrieveFilter<LessonResourceNested>({
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

    return await pb.collection("lesson_resources").getFullList<LessonResource>({
        sort,
        filter: recordFilter,
    });
}
