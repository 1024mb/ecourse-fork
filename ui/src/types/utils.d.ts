type KnownKeys<T> = {
    [K in keyof T as string extends K ? never : K]: T[K]
};

type MakeAllArray<T> = {
    [K in keyof T]: T[K][]
};
