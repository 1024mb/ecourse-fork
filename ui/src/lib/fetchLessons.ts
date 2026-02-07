export async function fetchLessons() {
    return await pb.collection("lessons").getFullList<Lesson>({
        sort: "created",
    });
}
