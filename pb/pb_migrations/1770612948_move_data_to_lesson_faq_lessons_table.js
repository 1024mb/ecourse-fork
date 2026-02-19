"use strict";
migrate((app) => {
    const lessonFaqsCollection = app.findCollectionByNameOrId("lesson_faqs");
    const lessonFaqs = app.findAllRecords(lessonFaqsCollection);
    const lessonFaqsLessonsCollection = app.findCollectionByNameOrId("lesson_faqs_lessons");
    for (const faq of lessonFaqs) {
        if (faq == null) {
            continue;
        }
        const lessons = faq.getStringSlice("lesson");
        for (const lessonId of lessons) {
            const lessonFaqsLesson = new Record(lessonFaqsLessonsCollection, {
                lesson_faq: faq.getString("id"),
                lesson: lessonId,
                order_index: faq.getInt("order_index"),
            });
            app.save(lessonFaqsLesson);
        }
    }
}, (app) => {
    app.db()
        .newQuery(`
        DELETE
        FROM lesson_faqs_lessons
    `)
        .execute();
});
