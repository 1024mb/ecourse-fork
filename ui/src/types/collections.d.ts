import type { RecordModel } from "pocketbase";

interface BaseDetails extends RecordModel {
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

export interface LessonFaq extends BaseDetails {
    lesson: string[];
    question: string;
    answer: string;
}

export interface LessonResource extends BaseDetails {
    lesson: string[];
    name: string;
    link: string;
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
}

export type Status = "Not Started" | "In Progress" | "Completed"

export interface Progress extends BaseDetails {
    assignee: string;
    status: Status;
    course: string;
}

export interface Resource extends BaseDetails {
    name: string;
    link: string;
}

export type Users = Record<string, User>
export type Courses = Record<string, Course>
export type LessonFaqs = Record<string, LessonFaq>
export type LessonResources = Record<string, LessonResource>
export type Lessons = Record<string, Lesson>
export type Resources = Record<string, Resource>
