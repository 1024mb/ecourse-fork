"use strict";
module.exports = {
    getProgressTypeId: ({ progressTypeName }) => {
        const progressTypeRecords = $app.findAllRecords("progress_type");
        for (const record of progressTypeRecords) {
            if (record == null) {
                continue;
            }
            if (record.getString("type_name") === progressTypeName) {
                return record.id;
            }
        }
        throw new Error("Unknown progress type name " + progressTypeName);
    },
};
