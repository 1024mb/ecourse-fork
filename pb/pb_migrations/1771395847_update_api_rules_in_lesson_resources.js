/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("cflmwtgulbeuubc");

    // update collection data
    unmarshal({
                  "listRule": "@collection.lesson_resources_lessons:rel.lesson_resource ?= id &&\n@collection.lesson_resources_lessons:rel.lesson.course.assignees.id\n    ?= @request.auth.id",
                  "viewRule": "@collection.lesson_resources_lessons:rel.lesson_resource ?= id &&\n@collection.lesson_resources_lessons:rel.lesson.course.assignees.id\n    ?= @request.auth.id",
              }, collection);

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("cflmwtgulbeuubc");

    // update collection data
    unmarshal({
                  "listRule": null,
                  "viewRule": null,
              }, collection);

    return app.save(collection);
});
