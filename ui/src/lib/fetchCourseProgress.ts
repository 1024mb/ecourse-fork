export async function fetchCourseProgress({
    progressTypeRecords,
    filter,
    sort = "created",
}: FetchCourseProgress): Promise<CourseProgressStored[]> {
    let progressFilter: string | undefined = undefined;

    if (filter != null) {
        progressFilter = retrieveFilter<CourseProgressNested>({ filter });
    }

    const progressRecords = await pb.collection(PROGRESS_COLLECTION).getFullList<CourseProgress>({
        sort,
        filter: progressFilter,
    });

    const newProgressRecords: CourseProgressStored[] = [];

    for (const progressRecord of progressRecords) {
        const status = progressTypeRecords.find(
        (progressType) => progressType.id === progressRecord.status,
        );

        if (status == null) {
            continue;
        }

        const newObj = {
            ...progressRecord,
            status: status.type_name as Status,
        };

        newProgressRecords.push({
            ...newObj,
        });
    }

    return newProgressRecords;
}
