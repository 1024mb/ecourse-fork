"use strict";
migrate((app) => {
    const lessonResourcesLessonsCollection = app.findCollectionByNameOrId("lesson_resources_lessons");
    const resource = {
        id: "",
        lesson: [""],
        created: "",
        updated: "",
    };
    const result = arrayOf(new DynamicModel(resource));
    app.db()
        .newQuery(`
        SELECT id, created, updated, lesson
        FROM lesson_resources
        ORDER BY created, updated
    `)
        .all(result);
    const indexOrderRelation = {};
    for (const resource of result) {
        const lessons = resource.lesson;
        for (const lessonId of lessons) {
            const orderIndex = indexOrderRelation[lessonId] ?? 1;
            const lessonResourcesLesson = new Record(lessonResourcesLessonsCollection, {
                lesson_resource: resource.id,
                lesson: lessonId,
                order_index: orderIndex,
            });
            indexOrderRelation[lessonId] = orderIndex + 1;
            app.save(lessonResourcesLesson);
        }
    }
}, (app) => {
    app.db()
        .newQuery(`
        DELETE
        FROM lesson_resources_lessons
    `)
        .execute();
});
