type SetLessonProgressAs = {
    progressTypeName: Status,
    lessonId?: string
    courseId?: string
}

async function setProgressAs({ progressTypeName, lessonId }: {
    progressTypeName: Status,
    lessonId: string,
    courseId?: never
}): Promise<void>
async function setProgressAs({ progressTypeName, courseId }: {
    progressTypeName: Status,
    lessonId?: never,
    courseId: string
}): Promise<void>
async function setProgressAs({ progressTypeName, lessonId, courseId }: SetLessonProgressAs): Promise<void> {
    const lessonProgressCollection = pb.collection("progress_lesson");

    const lessonsToModify: string[] = [];

    if (courseId != null) {
        const courseLessons = await fetchCourseLessons({ courseId });

        for (const lesson of courseLessons) {
            lessonsToModify.push(lesson.id);
        }
    } else if (lessonId != null) {
        lessonsToModify.push(lessonId);
    }

    const filter = retrieveFilter<LessonProgress>({
        filter: {
            lesson: lessonsToModify,
        },
    });

    const lessonProgress = await lessonProgressCollection.getFullList<LessonProgress>({
        filter,
    });

    const progressTypeId = await getProgressTypeId({ progressTypeName: progressTypeName });

    if (lessonProgress.length === 0) {
        for (const lesson of lessonsToModify) {
            await lessonProgressCollection.create<LessonProgress>({
                lesson,
                status: progressTypeId,
                user: pb.authStore.record?.id,
            });
        }
    } else {
        const lessonsWithNoProgress = lessonsToModify.filter((lesson) => {
            for (const lP of lessonProgress) {
                if (lP.lesson === lesson) {
                    return false;
                }
            }
            return true;
        });

        for (const lesson of lessonsWithNoProgress) {
            await lessonProgressCollection.create<LessonProgress>({
                lesson,
                status: progressTypeId,
                user: pb.authStore.record?.id,
            });
        }

        for (const lP of lessonProgress) {
            await lessonProgressCollection.update<LessonProgress>(lP.id, {
                status: progressTypeId,
            });
        }
    }
}

type SetLessonAs = {
    lessonId: string
}

export async function setLessonAsCompleted({ lessonId }: SetLessonAs): Promise<void> {
    await setProgressAs({ progressTypeName: "completed", lessonId });
}

export async function setLessonAsInProgress({ lessonId }: SetLessonAs): Promise<void> {
    await setProgressAs({ progressTypeName: "in_progress", lessonId });
}

export async function setLessonAsNotStarted({ lessonId }: SetLessonAs): Promise<void> {
    await setProgressAs({ progressTypeName: "not_started", lessonId });
}

type SetAllCourseLessonAs = {
    courseId: string
}

export async function setAllCourseLessonAsNotStarted({ courseId }: SetAllCourseLessonAs) {
    await setProgressAs({ progressTypeName: "not_started", courseId });
}

export async function setAllCourseLessonAsCompleted({ courseId }: SetAllCourseLessonAs) {
    await setProgressAs({ progressTypeName: "completed", courseId });
}
