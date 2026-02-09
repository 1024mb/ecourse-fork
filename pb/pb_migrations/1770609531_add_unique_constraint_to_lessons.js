/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("b36lt0a0v5anqh3");

    // update collection data
    unmarshal({
                  "indexes": [
                      "CREATE UNIQUE INDEX `idx_i34HbibxAm` ON `lessons` (\n  `course`,\n  `order_index`\n)",
                  ],
              }, collection);

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("b36lt0a0v5anqh3");

    // update collection data
    unmarshal({
                  "indexes": [],
              }, collection);

    return app.save(collection);
});
