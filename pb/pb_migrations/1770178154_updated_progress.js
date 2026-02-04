/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("0p3zwlmhocgdrly");

    // update collection data
    unmarshal({
                  "indexes": [
                      "CREATE INDEX `idx_trfYaeEjsj` ON `progress` (\n  `assignee`,\n  `course`\n)",
                  ],
              }, collection);

    // add field
    collection.fields.addAt(4, new Field({
                                             "cascadeDelete": false,
                                             "collectionId": "pbc_1701004689",
                                             "hidden": false,
                                             "id": "relation2063623452",
                                             "maxSelect": 1,
                                             "minSelect": 0,
                                             "name": "status",
                                             "presentable": false,
                                             "required": true,
                                             "system": false,
                                             "type": "relation",
                                         }));

    // update field
    collection.fields.addAt(2, new Field({
                                             "hidden": false,
                                             "id": "rni0h1ie",
                                             "maxSelect": 1,
                                             "name": "status_old",
                                             "presentable": false,
                                             "required": true,
                                             "system": false,
                                             "type": "select",
                                             "values": [
                                                 "Not Started",
                                                 "In Progress",
                                                 "Completed",
                                             ],
                                         }));

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("0p3zwlmhocgdrly");

    // update collection data
    unmarshal({
                  "indexes": [],
              }, collection);

    // remove field
    collection.fields.removeById("relation2063623452");

    // update field
    collection.fields.addAt(2, new Field({
                                             "hidden": false,
                                             "id": "rni0h1ie",
                                             "maxSelect": 1,
                                             "name": "status",
                                             "presentable": false,
                                             "required": true,
                                             "system": false,
                                             "type": "select",
                                             "values": [
                                                 "Not Started",
                                                 "In Progress",
                                                 "Completed",
                                             ],
                                         }));

    return app.save(collection);
});
