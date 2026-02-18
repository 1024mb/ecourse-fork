export async function fetchCourse({ courseId }: {
    courseId: string
}): Promise<Course | null> {
    try {
        return await pb.collection(COURSES_COLLECTION).getOne<Course>(courseId);
    } catch (error) {
        console.error(error);
        return null;
    }
}
