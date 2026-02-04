/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("pbc_668059830");

    // add field
    collection.fields.addAt(3, new Field({
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

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_668059830");

    // remove field
    collection.fields.removeById("relation2063623452");

    return app.save(collection);
});
