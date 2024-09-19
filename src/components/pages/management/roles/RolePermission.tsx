import RolePermissionList from '@/components/pages/management/roles/RolePermissionList';
import RolePermissionTitle from '@/components/pages/management/roles/RolePermissionTitle';

type RolePermissionProps = {
    id: string;
};

export default function RolePermission({ id }: RolePermissionProps) {
    return (
        <>
            <RolePermissionTitle />
            <div className="mt-6">
                <RolePermissionList id={id} />
            </div>
        </>
    );
}
