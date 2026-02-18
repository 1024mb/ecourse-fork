/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("pbc_83580909");

    // update collection data
    unmarshal({
                  "listRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
                  "viewRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
              }, collection);

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_83580909");

    // update collection data
    unmarshal({
                  "listRule": "@request.auth.id != \"\"",
                  "viewRule": "@request.auth.id != \"\"",
              }, collection);

    return app.save(collection);
});
