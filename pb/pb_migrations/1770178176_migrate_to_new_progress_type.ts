migrate((app) => {
    const progressCollection = app.findCollectionByNameOrId("progress");
    const progressRecords = app.findAllRecords(progressCollection);

    const progressTypeCollection = app.findCollectionByNameOrId("progress_type");
    const recordInProgress = app.findFirstRecordByData(progressTypeCollection, "type_name", "in_progress")
    .getString("id");
    const recordNotStarted = app.findFirstRecordByData(progressTypeCollection, "type_name", "not_started")
    .getString("id");
    const recordCompleted = app.findFirstRecordByData(progressTypeCollection, "type_name", "completed").getString("id");

    for (const progressItem of progressRecords) {
        if (progressItem == null) {
            continue;
        }
        if (progressItem.get("status_old") === "In Progress") {
            progressItem.set("status", recordInProgress);
        } else if (progressItem.get("status_old") === "Completed") {
            progressItem.set("status", recordCompleted);
        } else if (progressItem.get("status_old") === "Not Started") {
            progressItem.set("status", recordNotStarted);
        } else if (progressItem.get("status_old") == null || progressItem.get("status_old") === "") {
            continue;
        } else {
            throw new Error(`Unknown status: ${ progressItem.get("status") }`);
        }

        app.save(progressItem);
    }

}, (app) => {
    const progressCollection = app.findCollectionByNameOrId("progress");
    const progressRecords = app.findAllRecords(progressCollection);

    for (const progressItem of progressRecords) {
        if (progressItem == null) {
            continue;
        }
        progressItem.set("status", null);

        app.saveNoValidate(progressItem);
    }
});
