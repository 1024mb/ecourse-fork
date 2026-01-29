type LessonFaqsStore = {
    lessonFaqs: LessonFaq[];
}

export const useLessonFaqsStore = defineStore("lessonFaqs", {
    state: (): LessonFaqsStore => ({
        lessonFaqs: [],
    }),
    actions: {
        set(data: LessonFaq[]) {
            this.lessonFaqs = data;
        },
        clear() {
            this.lessonFaqs = [];
        },
    },
});
