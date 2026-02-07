/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("0p3zwlmhocgdrly");

    // remove field
    collection.fields.removeById("rni0h1ie");

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("0p3zwlmhocgdrly");

    // add field
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
});
