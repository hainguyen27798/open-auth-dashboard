'use server';

import type { CreateRoleDto, InputSearchDto, Pagination, Permission, Role, UpdateRoleDto } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function getRoles({ search = '', by = '', pageSize = 5, page = 0 }: InputSearchDto) {
    const rs = await withToken<Pagination<Role>>(HttpClient.get)({
        uri: `/roles?search=${search}&by=${by}&take=${pageSize}&page=${page}`,
    });
    return rs.data;
}

export async function getRole(id: string) {
    const rs = await withToken<Role>(HttpClient.get)({
        uri: `/roles/${id}`,
    });
    return rs.data;
}

export async function getRolePermissions({ id }: { id: string }) {
    const rs = await withToken<Permission[]>(HttpClient.get)({
        uri: `/roles/${id}/permissions`,
    });
    return rs.data;
}

export async function createRole(form: CreateRoleDto) {
    const rs = await withToken<Role[]>(HttpClient.post)({
        uri: '/roles',
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function updateRole(id: string, form: UpdateRoleDto) {
    const rs = await withToken<Role[]>(HttpClient.patch)({
        uri: `/roles/${id}`,
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function deleteRole(id: string) {
    const rs = await withToken<Role[]>(HttpClient.delete)({
        uri: `/roles/${id}`,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function addPermissionForRole(id: string, permissionId: string) {
    const rs = await withToken(HttpClient.post)({
        uri: `/roles/${id}/permission`,
        body: { permissionId },
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function deleteRolePermission(id: string, permissionId: string) {
    const rs = await withToken(HttpClient.delete)({
        uri: `/roles/${id}/permission/${permissionId}`,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}
