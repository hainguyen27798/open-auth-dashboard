'use client';

import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { App, Avatar, Button, Dropdown, Table } from 'antd';
import { Ellipsis, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useSWRImmutable from 'swr/immutable';

import { deleteUser, getAllUsers } from '@/_actions/user.action';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeSearchUserAction, selectSearchUserState } from '@/lib/store/slices';
import { useRouter } from '@/navigation';
import type { User } from '@/types';

export default function UserList() {
    const searchState = useAppSelector(selectSearchUserState);
    const { data, isLoading } = useSWRImmutable(searchState, getAllUsers, { revalidateOnMount: true });
    const $t = useTranslations('users.table');
    const { notification, modal } = App.useApp();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const actionItems: MenuProps['items'] = [
        {
            label: $t('actions.view_details'),
            key: 'view_user_details',
        },
        {
            type: 'divider',
        },
        {
            label: $t('actions.delete'),
            danger: true,
            key: 'delete_user',
            icon: <Trash size={16} />,
        },
    ];

    const deleteAction = (id: string) => {
        modal.confirm({
            title: $t('confirm_delete'),
            okType: 'danger',
            okText: $t('delete_btn'),
            onOk: async () => {
                const rs = await deleteUser(id);

                if (rs?.error) {
                    notification.error({
                        message: rs.message,
                        showProgress: true,
                    });
                } else {
                    notification.success({
                        message: rs.message,
                        showProgress: true,
                    });
                    dispatch(changeSearchUserAction({ reload: Date.now() }));
                }
            },
        });
    };

    const viewDetails = (id: string) => {
        router.push(`users/${id}/details`);
    };

    const renderActionButton = (id: string, record: User) => {
        return (
            <Dropdown
                menu={{
                    items: record.canModify ? actionItems : [actionItems[0]],
                    onClick: ({ key }) => {
                        switch (key) {
                            case 'delete_user':
                                deleteAction(id);
                                break;
                            case 'view_user_details':
                                viewDetails(id);
                                break;
                            default:
                                break;
                        }
                    },
                }}
                placement="bottomRight"
            >
                <Button size="small" className="!border-gray-300 !text-gray-500" icon={<Ellipsis size={16} />} />
            </Dropdown>
        );
    };

    return (
        <>
            <Table dataSource={data} rowKey="id" loading={isLoading}>
                <Table.Column<User>
                    key="name"
                    title={$t('name')}
                    dataIndex="name"
                    render={(name, record) => (
                        <div className="flex items-center gap-3">
                            <Avatar size={40} icon={<UserOutlined />} />
                            <div>
                                <div className="cursor-pointer text-indigo-500" onClick={() => viewDetails(record.id)}>
                                    {name}
                                </div>
                                <div className="text-gray-500">{record.email}</div>
                            </div>
                        </div>
                    )}
                />
                <Table.Column<User>
                    key="socialProvider"
                    title={$t('connection')}
                    dataIndex="socialProvider"
                    render={(value) => value || 'Username-password'}
                />
                <Table.Column<User>
                    key="socialProvider"
                    title={$t('logins')}
                    dataIndex="socialProvider"
                    render={(value) => value || 'Username-password'}
                />
                <Table.Column<User>
                    key="socialProvider"
                    title={$t('latest_login')}
                    dataIndex="socialProvider"
                    render={(value) => value || 'Username-password'}
                />
                <Table.Column<User>
                    key="action_btn"
                    dataIndex="id"
                    render={(id, record) => (
                        <div className="flex items-center justify-end gap-2">{renderActionButton(id, record)}</div>
                    )}
                ></Table.Column>
            </Table>
        </>
    );
}
