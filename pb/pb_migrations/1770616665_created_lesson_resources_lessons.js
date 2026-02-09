/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
                                          "createRule": null,
                                          "deleteRule": null,
                                          "fields": [
                                              {
                                                  "autogeneratePattern": "[a-z0-9]{15}",
                                                  "hidden": false,
                                                  "id": "text3208210256",
                                                  "max": 15,
                                                  "min": 15,
                                                  "name": "id",
                                                  "pattern": "^[a-z0-9]+$",
                                                  "presentable": false,
                                                  "primaryKey": true,
                                                  "required": true,
                                                  "system": true,
                                                  "type": "text",
                                              },
                                              {
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
                                              },
                                              {
                                                  "cascadeDelete": false,
                                                  "collectionId": "b36lt0a0v5anqh3",
                                                  "hidden": false,
                                                  "id": "relation4168381683",
                                                  "maxSelect": 1,
                                                  "minSelect": 0,
                                                  "name": "lesson",
                                                  "presentable": false,
                                                  "required": true,
                                                  "system": false,
                                                  "type": "relation",
                                              },
                                              {
                                                  "cascadeDelete": false,
                                                  "collectionId": "cflmwtgulbeuubc",
                                                  "hidden": false,
                                                  "id": "relation4107714063",
                                                  "maxSelect": 1,
                                                  "minSelect": 0,
                                                  "name": "lesson_resource",
                                                  "presentable": false,
                                                  "required": true,
                                                  "system": false,
                                                  "type": "relation",
                                              },
                                              {
                                                  "hidden": false,
                                                  "id": "autodate2990389176",
                                                  "name": "created",
                                                  "onCreate": true,
                                                  "onUpdate": false,
                                                  "presentable": false,
                                                  "system": false,
                                                  "type": "autodate",
                                              },
                                              {
                                                  "hidden": false,
                                                  "id": "autodate3332085495",
                                                  "name": "updated",
                                                  "onCreate": true,
                                                  "onUpdate": true,
                                                  "presentable": false,
                                                  "system": false,
                                                  "type": "autodate",
                                              },
                                          ],
                                          "id": "pbc_1512398218",
                                          "indexes": [
                                              "CREATE UNIQUE INDEX `idx_yTLfCaqusp` ON `lesson_resources_lessons` (\n  `order_index`,\n  `lesson`\n)",
                                              "CREATE INDEX `idx_8UGe6CP2bX` ON `lesson_resources_lessons` (\n  `lesson_resource`,\n  `lesson`\n)",
                                          ],
                                          "listRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
                                          "name": "lesson_resources_lessons",
                                          "system": false,
                                          "type": "base",
                                          "updateRule": null,
                                          "viewRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
                                      });

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_1512398218");

    return app.delete(collection);
});
