export type InputSearchDto = {
    search?: string;
    by?: string;
    page?: number;
    pageSize?: number;
};

export type TSearchState = InputSearchDto & {
    name: string;
    reload: number;
};
