type LessonsStore = {
    lessons: Lesson[];
}

export const useLessonsStore = defineStore("lessons", {
    state: (): LessonsStore => ({
        lessons: [],
    }),
    actions: {
        set(data: Lesson[]) {
            this.lessons = data;
        },
        clear() {
            this.lessons = [];
        },
    },
});
