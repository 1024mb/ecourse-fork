/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("yaoytodp8g23zu3");

    // update collection data
    unmarshal({
                  "listRule": "@request.auth.id != \"\"",
                  "viewRule": "@request.auth.id != \"\"",
              }, collection);

    // remove field
    collection.fields.removeById("6nbuaxni");

    // remove field
    collection.fields.removeById("number65868796");

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("yaoytodp8g23zu3");

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
                                             "id": "6nbuaxni",
                                             "maxSelect": 2147483647,
                                             "minSelect": 0,
                                             "name": "lesson",
                                             "presentable": false,
                                             "required": false,
                                             "system": false,
                                             "type": "relation",
                                         }));

    // add field
    collection.fields.addAt(2, new Field({
                                             "hidden": false,
                                             "id": "number65868796",
                                             "max": null,
                                             "min": 1,
                                             "name": "order_index",
                                             "onlyInt": false,
                                             "presentable": false,
                                             "required": true,
                                             "system": false,
                                             "type": "number",
                                         }));

    return app.save(collection);
});
