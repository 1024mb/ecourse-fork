import { getI18n } from "@/i18n";
import slugify from "slugify";
import { toast } from "vue-sonner";

export async function updateProgressStatus(progressRecordId: string, newStatus: Status) {
    const i18n = getI18n();
    const progressStore = useProgressStore();

    try {
        const result = await pb.collection("progress").update<Progress>(progressRecordId, {
            status: newStatus,
        });

        progressStore.progress = progressStore.progress.map((record) =>
            record.id === progressRecordId ? { ...record, status: newStatus } : record);

        return result;
    } catch {
        toast.error(i18n.global.t("errorMsg.failedToUpdateCourseStatus"));
    }
}

export function getYouTubeVideoId(url: string | null) {
    if (url == null) {
        return null;
    }

    const regExp = /^https?:\/\/(?:www\.)?youtube\.com(\/watch\?v=|\/embed\/)([A-Za-z0-9-_]+)(?:\?.+)?$/;
    const regExpAlt = /^https?:\/\/(?:www\.)?youtu\.be\/([A-Za-z0-9-_]+)(?:\?.+)?$/;

    let match = url.match(regExp);

    if (match == null) {
        match = url.match(regExpAlt);
    }

    if (match == null) {
        return null;
    }

    return match[2] ?? null;
}

export function getGoogleDriveFileId(url: string) {
    if (url == null) {
        return null;
    }

    // Handle different Google Drive URL formats
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /[?&]id=([a-zA-Z0-9_-]+)/,
        /\/open\?id=([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

export function isGoogleDriveUrl(url: string) {
    if (url == null) {
        return false;
    }

    return url.toLowerCase().includes("drive.google.com");
}

export function slugifyId(id: string): string {
    return slugify(id, { lower: true, strict: true });
}

export function cleanFileName(inputFileName: string) {
    // TODO: Is this actually needed? Why do we change the original name at all?

    let cleanedFileName = inputFileName.charAt(0).toUpperCase() + inputFileName.slice(1);

    cleanedFileName = cleanedFileName.replace(/_/g, " ");

    const dotIndex = cleanedFileName.lastIndexOf(".");
    if (dotIndex !== -1 && dotIndex >= 11) {
        cleanedFileName = cleanedFileName.slice(0, dotIndex - 11) + cleanedFileName.slice(dotIndex);
    }

    return cleanedFileName;
}

// function to scroll to a course
export function scrollToCourse(target: string) {
    const courses = document.getElementById(target);

    if (courses) {
        const coursesContainer = findCoursesContainer(courses);

        if (coursesContainer) {
            const offset = courses.offsetTop;

            coursesContainer.scrollTo({
                top: offset,
                behavior: "smooth",
            });
        }
    }
}

// function to find the scrollable parent container around the courses
function findCoursesContainer(element: HTMLElement) {
    let parent = element.parentElement;

    while (parent) {
        if (parent.classList.contains("overflow-y-scroll")) {
            return parent;
        }
        parent = parent.parentElement;
    }

    return null;
}
