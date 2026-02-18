/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("yaoytodp8g23zu3");

    // update collection data
    unmarshal({
                  "listRule": null,
                  "viewRule": null,
              }, collection);

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("yaoytodp8g23zu3");

    // update collection data
    unmarshal({
                  "listRule": "@request.auth.id != \"\"",
                  "viewRule": "@request.auth.id != \"\"",
              }, collection);

    return app.save(collection);
});
