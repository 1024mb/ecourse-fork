interface BaseFetch {
    sort?: keyof BaseDetails;
}

export type LessonProgressFilter = Partial<MakeAllArray<NonNullable<LessonProgressNested>>>

export interface FetchLessonProgress extends BaseFetch {
    courseId: string;
    filter?: LessonProgressFilter;
    returnLessons?: boolean;
}

export interface FetchFirstNonCompletedLesson {
    courseId: string;
}

export type LessonFilter = Partial<MakeAllArray<NonNullable<LessonNested>>>

export interface FetchCourseLessons extends BaseFetch {
    courseId?: string;
    filter?: LessonFilter;
}

export type CourseFilter = Partial<MakeAllArray<NonNullable<CourseNested>>>

export interface FetchCourses extends BaseFetch {
    filter?: CourseFilter;
    page?: number;
}

export type CourseProgressFilter = Partial<MakeAllArray<NonNullable<CourseProgressNested>>>

export interface FetchCourseProgress extends BaseFetch {
    filter?: CourseProgressFilter;
    progressTypeRecords: ProgressType[];
}

export type LessonFaqsFilter = Partial<MakeAllArray<NonNullable<LessonFaqNested>>>

export interface FetchLessonFaqs extends BaseFetch {
    filter?: LessonFaqsFilter;
    lessons: Lesson[];
}

export type LessonResourceFilter = Partial<MakeAllArray<NonNullable<LessonResourceNested>>>

export interface FetchLessonResource extends BaseFetch {
    filter?: LessonFaqsFilter;
    lessons: Lesson[];
}
