export async function fetchResources() {
    return await pb.collection("resources").getFullList<Resource>({
        sort: "created",
    });
}
