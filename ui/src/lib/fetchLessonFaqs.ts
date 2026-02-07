export async function fetchLessonFaqs({
    lessons,
    filter = {},
    sort = "created",
}: FetchLessonFaqs): Promise<LessonFaq[]> {
    const faqFilter = retrieveFilter<LessonFaqNested>({
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

    const lessonFaqs = await pb.collection("lesson_faqs").getFullList<LessonFaq>({
        sort,
        filter: faqFilter,
    });

    return lessonFaqs.map((lessonFaq) => ({
        ...lessonFaq,
        isOpen: false,
    }));
}
