/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("pbc_668059830");

    // update collection data
    unmarshal({
                  "createRule": "@request.auth.id != \"\" && @request.body.user = @request.auth.id",
                  "listRule": "@request.auth.id != \"\" && user = @request.auth.id",
                  "updateRule": "@request.auth.id != \"\" && user = @request.auth.id && @request.body.user:isset = false && @request.body.lesson:isset = false",
                  "viewRule": "@request.auth.id != \"\" && user = @request.auth.id",
              }, collection);

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_668059830");

    // update collection data
    unmarshal({
                  "createRule": null,
                  "listRule": null,
                  "updateRule": null,
                  "viewRule": null,
              }, collection);

    return app.save(collection);
});
