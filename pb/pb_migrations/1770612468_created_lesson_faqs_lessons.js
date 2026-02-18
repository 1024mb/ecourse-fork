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
                                                  "cascadeDelete": true,
                                                  "collectionId": "yaoytodp8g23zu3",
                                                  "hidden": false,
                                                  "id": "relation2592789295",
                                                  "maxSelect": 1,
                                                  "minSelect": 0,
                                                  "name": "lesson_faq",
                                                  "presentable": false,
                                                  "required": true,
                                                  "system": false,
                                                  "type": "relation",
                                              },
                                              {
                                                  "cascadeDelete": true,
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
                                          "id": "pbc_83580909",
                                          "indexes": [
                                              "CREATE UNIQUE INDEX `idx_tSNqs4WFlh` ON `lesson_faqs_lessons` (\n  `lesson`,\n  `order_index`\n)",
                                              "CREATE UNIQUE INDEX `idx_J8xQN3M9px` ON `lesson_faqs_lessons` (\n  `lesson_faq`,\n  `lesson`\n)",
                                          ],
                                          "listRule": "@request.auth.id != \"\"",
                                          "name": "lesson_faqs_lessons",
                                          "system": false,
                                          "type": "base",
                                          "updateRule": null,
                                          "viewRule": "@request.auth.id != \"\"",
                                      });

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_83580909");

    return app.delete(collection);
});
