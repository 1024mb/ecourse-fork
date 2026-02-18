export async function fetchProgressTypes(): Promise<ProgressType[]> {
    return await pb.collection(PROGRESS_TYPE_COLLECTION).getFullList<ProgressType>({
        sort: "created",
    });
}
