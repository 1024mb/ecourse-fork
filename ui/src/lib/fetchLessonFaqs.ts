export async function fetchLessonFaqs({
    lessons,
    filter = {},
    sort = "order_index",
}: FetchLessonFaqs): Promise<LessonFaqLessonNestedReturn[]> {
    const recordFilter = retrieveFilter<LessonFaqLessonNested>({
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

    const lessonFaqsLessons = await pb.collection(LESSON_FAQS_LESSONS_COLLECTION)
        .getList<LessonFaqLessonExpanded>(1, 30, {
            sort,
            filter: recordFilter,
            expand: "lesson_faq,lesson",
        });

    const result: LessonFaqLessonNestedReturn[] = [];

    for (const lessonFaqLesson of lessonFaqsLessons.items) {
        const nestedData = {
            lesson: lessonFaqLesson.expand.lesson,
            lesson_faq: lessonFaqLesson.expand.lesson_faq,
        };

        const { expand: _, ...rest } = lessonFaqLesson;

        result.push({
            ...rest,
            ...nestedData,
            isOpen: false,
        });
    }

    return result;
}
