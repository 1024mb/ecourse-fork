import type { RecordModel } from "pocketbase";

type eCourseRecordModel = Omit<KnownKeys<RecordModel>, "expand">

export interface BaseDetails extends eCourseRecordModel {
    created: string;
    updated: string;
}

export interface User extends BaseDetails {
    email: string | null;
    emailVisibility: boolean;
    verified: boolean;
    username: string;
}

export interface Course extends BaseDetails {
    title: string;
    description: string;
    assignees: string[];
    assign_to_everyone: boolean;
}

export interface CourseNested extends BaseDetails {
    assignees: Partial<MakeAllArray<NonNullable<User>>>[];
}

export interface LessonFaq extends BaseDetails {
    question: string;
    answer: string;
}

export interface LessonFaqLesson extends BaseDetails {
    lesson_faq: string;
    lesson: string;
    order_index: number;
}

export interface LessonFaqLessonNested extends LessonFaqLesson {
    lesson_faq: Partial<MakeAllArray<NonNullable<LessonFaq>>>[];
    lesson: Partial<MakeAllArray<NonNullable<Lesson>>>[];
}

export interface LessonFaqLessonExpanded extends LessonFaqLesson {
    expand: {
        lesson_faq: LessonFaq;
        lesson: Lesson;
    };
}

export interface LessonFaqLessonNestedReturn extends LessonFaqLesson {
    lesson_faq: LessonFaq;
    lesson: Lesson;
    isOpen: boolean;
}

export interface LessonResource extends BaseDetails {
    name: string;
    link: string;
}

export interface LessonResourceLesson extends BaseDetails {
    lesson_resource: string;
    lesson: string;
    order_index: number;
}

export interface LessonResourceLessonNested extends LessonResource {
    lesson_resource: Partial<MakeAllArray<NonNullable<LessonResource>>>[];
    lesson: Partial<MakeAllArray<NonNullable<Lesson>>>[];
}

export interface LessonResourceLessonExpanded extends LessonResourceLesson {
    expand: {
        lesson_resource: LessonResource;
        lesson: Lesson;
    };
}

export interface LessonResourceLessonNestedReturn extends LessonResourceLesson {
    lesson_resource: LessonResource;
    lesson: Lesson;
}

export interface Lesson extends BaseDetails {
    captions: string;
    content: string;
    course: string;
    downloads: string[];
    summary: string;
    thumbnail: string;
    title: string;
    video: string;
    videoLocal: string;
    videoRemoteUrl: string;
    order_index: number;
}

export interface LessonNested extends Lesson {
    course: Partial<MakeAllArray<NonNullable<Course>>>;
}

export type Status = "not_started" | "in_progress" | "completed"

export interface ProgressType extends BaseDetails {
    type_name: Status;
}

/*
Holds status IDs
 */
export interface CourseProgress extends BaseDetails {
    assignee: string;

    /*
    ID of the linked status record
     */
    status: string;

    course: string;
}

export interface CourseProgressNested extends CourseProgress {
    assignee: Partial<MakeAllArray<NonNullable<User>>>;
    status: Partial<MakeAllArray<NonNullable<ProgressType>>>;
    course: Partial<MakeAllArray<NonNullable<Course>>>;
}

/*
Holds status type names
 */
export interface CourseProgressStored extends CourseProgress {
    status: Status;
}

export interface Resource extends BaseDetails {
    name: string;
    link: string;
}

export interface LessonProgress extends BaseDetails {
    lesson: string;
    user: string;

    /*
    ID of the linked status record
     */
    status: string;
}

export interface LessonProgressNested extends LessonProgress {
    lesson: Partial<MakeAllArray<NonNullable<Lesson>>>;
    user: Partial<MakeAllArray<NonNullable<User>>>;
    status: Partial<MakeAllArray<NonNullable<ProgressType>>>;
}
