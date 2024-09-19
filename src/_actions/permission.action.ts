'use server';

import type { CreatePermissionDto, InputSearchDto, Pagination, Permission, UpdatePermissionDto } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function getPermissions({ search = '', by = '', page, pageSize }: InputSearchDto) {
    const rs = await withToken<Pagination<Permission>>(HttpClient.get)({
        uri: `/permissions?search=${search}&by=${by}&take=${pageSize}&page=${page}`,
    });
    return rs.data;
}

export async function getAllPermissions() {
    const rs = await withToken<Permission[]>(HttpClient.get)({
        uri: `/permissions/all`,
    });
    return rs.data;
}

export async function createPermission(form: CreatePermissionDto) {
    const rs = await withToken<Permission>(HttpClient.post)({
        uri: '/permissions',
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function updatePermission(id: string, form: UpdatePermissionDto) {
    const rs = await withToken<Permission>(HttpClient.patch)({
        uri: `/permissions/${id}`,
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function deletePermission(id: string) {
    const rs = await withToken<Permission>(HttpClient.delete)({
        uri: `/permissions/${id}`,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}
