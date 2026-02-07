/*
It only fetches max 100 resources
 */
export async function fetchAllResources({
    filter,
    sort = "created",
}: FetchAllResources = {}): Promise<Resource[]> {
    return await pb.collection("resources").getFullList<Resource>(100, {
        sort,
        filter: filter ? retrieveFilter<Resource>({ filter }) : undefined,
    });
}
