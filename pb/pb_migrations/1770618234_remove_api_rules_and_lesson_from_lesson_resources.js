/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("cflmwtgulbeuubc");

    // update collection data
    unmarshal({
                  "listRule": null,
                  "viewRule": null,
              }, collection);

    // remove field
    collection.fields.removeById("wndfjyrc");

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("cflmwtgulbeuubc");

    // update collection data
    unmarshal({
                  "listRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
                  "viewRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
              }, collection);

    // add field
    collection.fields.addAt(1, new Field({
                                             "cascadeDelete": true,
                                             "collectionId": "b36lt0a0v5anqh3",
                                             "hidden": false,
                                             "id": "wndfjyrc",
                                             "maxSelect": 2147483647,
                                             "minSelect": 0,
                                             "name": "lesson",
                                             "presentable": false,
                                             "required": false,
                                             "system": false,
                                             "type": "relation",
                                         }));

    return app.save(collection);
});
