'use client';

import { Button } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';
import { useState } from 'react';

import UserList from '@/components/pages/management/users/UserList';
import { DashboardFilter } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hook';
import { changeSearchUserAction } from '@/lib/store/slices';

const searchByOptions: DefaultOptionType[] = [
    {
        label: 'Name',
        value: 'name',
    },
    {
        label: 'Email',
        value: 'email',
    },
];

export default function UserManagement() {
    const $t = useTranslations('users');
    const [isUserEditorOpen, setIsUserEditorOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <div className="text-3xl font-semibold">{$t('title')}</div>
                <Button type="primary" icon={<PlusIcon size={18} />} onClick={() => setIsUserEditorOpen(true)}>
                    {$t('create_user')}
                </Button>
            </div>
            <div className="mt-6 text-gray-500">{$t('description')}</div>
            <div className="mt-10">
                <DashboardFilter
                    searchByOptions={searchByOptions}
                    defaultSearchBy="name"
                    searchPlaceholder={$t('search_for')}
                    filterChange={(value) => dispatch(changeSearchUserAction(value))}
                />
                <div className="mt-6">
                    <UserList />
                </div>
            </div>
        </>
    );
}
