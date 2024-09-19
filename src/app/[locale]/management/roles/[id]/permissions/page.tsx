import { RolePermission } from '@/components/pages/management/roles';

export default function RolePermissionPage({ params }: { params: { id: string } }) {
    return <RolePermission id={params.id} />;
}
