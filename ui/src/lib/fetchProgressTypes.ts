export async function fetchProgressTypes(): Promise<ProgressType[]> {
    return await pb.collection("progress_type").getFullList<ProgressType>({
        sort: "created",
    });
}
