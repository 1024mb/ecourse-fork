migrate((app) => {
    type Faq = {
        id: string,
        lesson: string[]
        order_index: number
        question: string
        answer: string
        created: string
        updated: string
    }

    const faq: Faq = {
        id: "",
        lesson: [],
        order_index: 0,
        question: "",
        answer: "",
        created: "",
        updated: "",
    };

    const result = arrayOf<Faq>(<Faq>new DynamicModel(faq));

    app.db().newQuery(`
        SELECT id, created, lesson
        FROM lesson_faqs
        ORDER BY created, updated
    `)
        .all(result);

    const latestIndex: Record<string, number> = {};
    for (const faq of result) {
        const lessons = faq.lesson;
        const maxIndex = lessons.map(l => latestIndex[l] || 0).reduce((a, b) => Math.max(a, b), 0);
        const orderIndex = maxIndex + 1;

        app.db()
            .newQuery(`
            UPDATE lesson_faqs
            SET order_index = {:orderIndex}
            WHERE id = {:id}
        `)
            .bind({ orderIndex, id: faq.id })
            .execute();

        for (const l of lessons) {
            latestIndex[l] = orderIndex;
        }
    }
}, (app) => {
    app.db()
        .newQuery("UPDATE main.lesson_faqs SET order_index = 0")
        .execute();
});
