migrate((app) => {
    const collection = app.findCollectionByNameOrId("progress_type");
    const recordInProgress = new Record(collection, {
        type_name: "in_progress",
    });

    app.save(recordInProgress);

    const recordNotStarted = new Record(collection, {
        type_name: "not_started",
    });

    app.save(recordNotStarted);

    const recordCompleted = new Record(collection, {
        type_name: "completed",
    });

    app.save(recordCompleted);
}, (app) => {
    const collection = app.findCollectionByNameOrId("progress_type");

    const recordInProgress = app.findFirstRecordByData(collection, "type_name", "in_progress");
    app.delete(recordInProgress);

    const recordNotStarted = app.findFirstRecordByData(collection, "type_name", "not_started");
    app.delete(recordNotStarted);

    const recordCompleted = app.findFirstRecordByData(collection, "type_name", "completed");
    app.delete(recordCompleted);
});
