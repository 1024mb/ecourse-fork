/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("b36lt0a0v5anqh3");

    // update field
    collection.fields.addAt(1, new Field({
                                             "cascadeDelete": true,
                                             "collectionId": "7jo5p6lzwwht0s5",
                                             "hidden": false,
                                             "id": "wdsxai2y",
                                             "maxSelect": 1,
                                             "minSelect": 0,
                                             "name": "course",
                                             "presentable": false,
                                             "required": false,
                                             "system": false,
                                             "type": "relation",
                                         }));

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("b36lt0a0v5anqh3");

    // update field
    collection.fields.addAt(1, new Field({
                                             "cascadeDelete": false,
                                             "collectionId": "7jo5p6lzwwht0s5",
                                             "hidden": false,
                                             "id": "wdsxai2y",
                                             "maxSelect": 1,
                                             "minSelect": 0,
                                             "name": "course",
                                             "presentable": false,
                                             "required": false,
                                             "system": false,
                                             "type": "relation",
                                         }));

    return app.save(collection);
});
