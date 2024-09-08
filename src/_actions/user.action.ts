'use server';

import type { InputSearchDto, Role, User } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function getAllUsers({ search = '', by = '' }: InputSearchDto) {
    const rs = await withToken<User[]>(HttpClient.get)({
        uri: `/users?search=${search}&by=${by}`,
    });
    return rs.data;
}

export async function deleteUser(id: string) {
    const rs = await withToken<Role[]>(HttpClient.delete)({
        uri: `/users/${id}`,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}
