import type { DefaultModel } from '@/types/default-model';

export type User = DefaultModel & {
    name: string;
    status: string;
    email: string;
};
