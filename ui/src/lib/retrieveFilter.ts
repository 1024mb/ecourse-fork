import { isStrictPlainObject } from "@/lib/utils";

export type RetrieveFilterParams<T> = {
    filter: Partial<MakeAllArray<NonNullable<T>>> | undefined
    filterIsInclude?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function retrieveFilter<T>({ filter }: {
    filter: undefined
    filterIsInclude?: boolean
}): undefined
export function retrieveFilter<T>({ filter }: {
    filter: Partial<MakeAllArray<NonNullable<T>>>
    filterIsInclude?: boolean
}): string
/*
By the default the filter is of type "equals". If filterIsInclude is set to true then the filter is of type "includes"
 */
export function retrieveFilter<T>({ filter, filterIsInclude = false }: RetrieveFilterParams<T>): string | undefined {
    if (filter == null) {
        return undefined;
    }

    const operator = filterIsInclude ? "~" : "=";
    const operatorArray = filterIsInclude ? "?~" : "?=";

    let courseFilter = "";
    let firstFilterApplied = false;

    for (const columnName in filter) {
        if (!Object.prototype.hasOwnProperty.call(filter, columnName)) {
            continue;
        }

        if (filter[columnName] == null) {
            continue;
        }

        let filterString = "";

        for (const firstLevelItem of filter[columnName]) {
            if (Array.isArray(firstLevelItem)) {
                // If the first level item is an array, that is filter[columnName] is of type any[][], then it means
                // all the values listed for filtering must use the "any or at-least-one-of" operator
                for (const secondLevelItem of firstLevelItem) {
                    if (Array.isArray(secondLevelItem)) {
                        throw new Error("Only up to two levels of array indentation is allowed");
                    }

                    if (isStrictPlainObject(secondLevelItem)) {
                        for (const fieldName of Object.keys(secondLevelItem)) {
                            for (const fieldValue of secondLevelItem[fieldName]) {
                                if (Array.isArray(fieldValue)) {
                                    for (const fieldValueItem of fieldValue) {
                                        filterString += `${ String(columnName) }.${ String(fieldName) } ${ operatorArray } '${ fieldValueItem }' || `;
                                    }
                                } else {
                                    filterString += `${ String(columnName) }.${ String(fieldName) } ${ operatorArray } '${ fieldValue }' || `;
                                }
                            }
                        }
                    } else {
                        filterString += `${ String(columnName) } ${ operatorArray } '${ secondLevelItem }' || `;
                    }
                }
            } else if (isStrictPlainObject(firstLevelItem)) {
                for (const fieldName in firstLevelItem) {
                    if (!Object.prototype.hasOwnProperty.call(firstLevelItem, fieldName)) {
                        continue;
                    }

                    // @ts-expect-error we have already checked that firstLevelItem is an object with our custom function
                    for (const fieldValue of firstLevelItem[fieldName]) {
                        if (Array.isArray(fieldValue)) {
                            for (const fieldValueItem of fieldValue) {
                                filterString += `${ String(columnName) }.${ String(fieldName) } ${ operatorArray } '${ fieldValueItem }' || `;
                            }
                        } else {
                            filterString += `${ String(columnName) }.${ String(fieldName) } ${ operator } '${ fieldValue }' || `;
                        }
                    }
                }
            } else {
                filterString += `${ String(columnName) } ${ operator } '${ firstLevelItem }' || `;
            }
        }

        filterString = `(${ filterString.slice(0, -4) })`;

        courseFilter += `${ firstFilterApplied ? " ||" : "" } ${ filterString }`;

        firstFilterApplied = true;
    }

    return courseFilter.trim();
}
