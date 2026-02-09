/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("b36lt0a0v5anqh3");

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
}, (app) => {
    const collection = app.findCollectionByNameOrId("b36lt0a0v5anqh3");

    // remove field
    collection.fields.removeById("number65868796");

    return app.save(collection);
});
