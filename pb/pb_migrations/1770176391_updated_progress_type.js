/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("pbc_1701004689");

    // update field
    collection.fields.addAt(1, new Field({
                                             "autogeneratePattern": "",
                                             "hidden": false,
                                             "id": "text2301410062",
                                             "max": 0,
                                             "min": 2,
                                             "name": "type_name",
                                             "pattern": "",
                                             "presentable": true,
                                             "primaryKey": false,
                                             "required": true,
                                             "system": false,
                                             "type": "text",
                                         }));

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_1701004689");

    // update field
    collection.fields.addAt(1, new Field({
                                             "autogeneratePattern": "",
                                             "hidden": false,
                                             "id": "text2301410062",
                                             "max": 0,
                                             "min": 2,
                                             "name": "type_name",
                                             "pattern": "",
                                             "presentable": false,
                                             "primaryKey": false,
                                             "required": true,
                                             "system": false,
                                             "type": "text",
                                         }));

    return app.save(collection);
});
