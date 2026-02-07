export async function fetchLessonResources({
    lessons,
    filter = {},
    sort = "created",
}: FetchLessonResource): Promise<LessonResource[]> {
    const faqFilter = retrieveFilter<LessonResourceNested>({
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
        filter: faqFilter,
    });
}
