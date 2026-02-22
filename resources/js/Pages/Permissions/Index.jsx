// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";

// import icons
import { Edit } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty";

// import component Search
import Search from "@/Shared/Search";

// import component Delete
import Delete from "@/Shared/Delete";

// Import table pagination
import TablePagination from "@/Shared/TablePagination";
import { Button } from "@/Components/ui/button";

export default function PermissionsIndex() {
    // destruct props "permissions" dari usePage
    const { permissions } = usePage().props;

    return (
        <>
            <Head title={`Permissions`} />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    showButton
                    title="Permissions"
                    description="Kelola permission untuk hak akses pengguna"
                    action="/permissions/create"
                    actionText="Tambah Permission"
                    permission="permissions.create"
                />

                {/* Card */}
                <div className="space-y-5">
                    <Search URL={"/permissions"} />

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        No.
                                    </th>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Nama Permission
                                    </th>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase w-7">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {permissions && permissions.data.length > 0 ? (
                                    permissions.data.map(
                                        (permission, index) => (
                                            <tr
                                                key={permission.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-2 text-sm font-medium text-gray-900">
                                                    {++index +
                                                        (permissions.current_page -
                                                            1) *
                                                            permissions.per_page}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-900">
                                                    {permission.name}
                                                </td>
                                                <td className="px-6 py-2">
                                                    <div className="flex items-center space-x-2">
                                                        {hasAnyPermission([
                                                            "permissions.edit",
                                                        ]) && (
                                                            <Link
                                                                href={`/permissions/${permission.id}/edit`}
                                                                title="Edit"
                                                            >
                                                                <Button
                                                                    size="icon"
                                                                    variant="outline"
                                                                >
                                                                    <Edit />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        {hasAnyPermission([
                                                            "permissions.delete",
                                                        ]) && (
                                                            <Delete
                                                                URL={
                                                                    "/permissions"
                                                                }
                                                                id={
                                                                    permission.id
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )
                                ) : (
                                    <TableEmpty
                                        title="Tidak ada Permission"
                                        description="Silahkan tambahkan permission baru"
                                        colSpan={3}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <TablePagination links={permissions.links} />
                </div>
            </LayoutApp>
        </>
    );
}
