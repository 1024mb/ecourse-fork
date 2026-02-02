type LessonsByCourseStore = {
    lessonsByCourse: Record<string, Lesson>;
}

export const useLessonsByCourseStore = defineStore("lessonsByCourse", {
    state: (): LessonsByCourseStore => ({
        lessonsByCourse: {},
    }),
    actions: {
        set(data: Record<string, Lesson>) {
            this.lessonsByCourse = data;
        },
        clear() {
            this.lessonsByCourse = {};
        },
    },
    persist: true,
});
