export type Pagination<T = unknown> = {
    data: T[];
    metaData: {
        total: number;
        pageSize: number;
        pageSelected: number;
    };
};
