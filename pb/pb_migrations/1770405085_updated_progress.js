/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("0p3zwlmhocgdrly");

    // update collection data
    unmarshal({
                  "indexes": [
                      "CREATE UNIQUE INDEX `idx_trfYaeEjsj` ON `progress` (\n  `assignee`,\n  `course`\n)",
                  ],
              }, collection);

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("0p3zwlmhocgdrly");

    // update collection data
    unmarshal({
                  "indexes": [
                      "CREATE INDEX `idx_trfYaeEjsj` ON `progress` (\n  `assignee`,\n  `course`\n)",
                  ],
              }, collection);

    return app.save(collection);
});
