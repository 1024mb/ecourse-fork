type CoursesStore = {
    courses: Course[];
}

export const useCoursesStore = defineStore("courses", {
    state: (): CoursesStore => ({
        courses: [],
    }),
    actions: {
        set(data: Course[]) {
            this.courses = data;
        },
        clear() {
            this.courses = [];
        },
    },
});
