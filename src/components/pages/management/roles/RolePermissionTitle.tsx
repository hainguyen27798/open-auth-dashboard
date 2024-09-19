'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { getRole } from '@/_actions/role.action';
import AddRolePermissionModel from '@/components/pages/management/roles/AddRolePermissionModel';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeCurrentRoleAction, selectCurrentRoleState } from '@/lib/store/slices';

export default function RolePermissionTitle() {
    const $t = useTranslations('roles.details.permissions');
    const role = useAppSelector(selectCurrentRoleState);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onClose = useCallback(
        (ok: boolean) => {
            setIsOpen(false);
            if (ok && role.data?.id) {
                dispatch(changeCurrentRoleAction({ isLoading: true }));
                getRole(role.data.id)
                    .then((data) => {
                        dispatch(changeCurrentRoleAction({ data }));
                    })
                    .finally(() => {
                        dispatch(changeCurrentRoleAction({ isLoading: false }));
                    });
            }
        },
        [dispatch, role.data?.id],
    );

    return (
        <>
            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-gray-500">
                    {role.data?.canModify ? $t('description') : $t('description_view_only')}
                </div>
                <Button type="primary" className="px-5" onClick={() => setIsOpen(true)}>
                    {$t('add_permissions')}
                </Button>
            </div>
            {isOpen && <AddRolePermissionModel role={role.data} isOpen={isOpen} close={onClose} />}
        </>
    );
}
