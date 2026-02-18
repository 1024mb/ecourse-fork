import type { LessonFaqLessonNested } from "@/types/collections";

interface BaseFetch {
    sort?: keyof BaseDetails;
}

interface BaseFetchWithOrderIndex {
    sort?: keyof BaseDetails | "order_index";
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

export interface FetchCourseLessons extends BaseFetchWithOrderIndex {
    courseId?: string;
    filter?: LessonFilter;
}

export interface FetchLessons extends BaseFetchWithOrderIndex {
    filter?: LessonFilter;
}

export type CourseFilter = Partial<MakeAllArray<NonNullable<CourseNested>>>

export interface FetchCourses extends BaseFetch {
    filter?: CourseFilter;
    page?: number;
}

export interface FetchCoursesFromList extends BaseFetch {
    courseIds: string[];
}

export interface FetchAllCourses extends BaseFetch {
    filter?: CourseFilter;
}

export type CourseProgressFilter = Partial<MakeAllArray<NonNullable<CourseProgressNested>>>

export interface FetchCourseProgress extends BaseFetch {
    filter?: CourseProgressFilter;
    progressTypeRecords: ProgressType[];
}

export type LessonFaqsFilter = Partial<MakeAllArray<NonNullable<LessonFaqLessonNested>>>

export interface FetchLessonFaqs extends BaseFetchWithOrderIndex {
    filter?: LessonFaqsFilter;
    lessons: Lesson[];
}

export type LessonResourceFilter = Partial<MakeAllArray<NonNullable<LessonResourceLessonNested>>>

export interface FetchLessonResources extends BaseFetchWithOrderIndex {
    filter?: LessonResourceFilter;
    lessons: Lesson[];
}

export type ResourceFilter = Partial<MakeAllArray<NonNullable<Resource>>>

export interface FetchAllResources extends BaseFetch {
    filter?: ResourceFilter;
}
