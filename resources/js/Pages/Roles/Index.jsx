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

// import component Pagination
import TablePagination from "@/Shared/TablePagination";

export default function RolesIndex() {
    // destruct props "roles"
    const { roles } = usePage().props;

    return (
        <>
            <Head title={`Roles`} />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    showButton
                    title="Roles"
                    description="Kelola role dan hak akses pengguna"
                    action="/roles/create"
                    actionText="Tambah Role"
                    permission="roles.create"
                />

                <div className="space-y-5">
                    <Search URL={"/roles"} />

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        No.
                                    </th>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Nama Role
                                    </th>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Jumlah Permission
                                    </th>
                                    <th className="px-6 py-2 text-left text-xs font-semibold text-gray-700 uppercase w-7">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {roles && roles.data.length > 0 ? (
                                    roles.data.map((role, index) => (
                                        <tr
                                            key={role.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-2 text-sm font-medium text-gray-900">
                                                {++index +
                                                    (roles.current_page - 1) *
                                                        roles.per_page}
                                            </td>
                                            <td className="px-6 py-2 text-sm text-gray-900">
                                                {role.name}
                                            </td>
                                            <td className="px-6 py-2 text-sm text-gray-700">
                                                {role.permissions_count}
                                            </td>
                                            <td className="px-6 py-2">
                                                <div className="flex items-center space-x-2">
                                                    {hasAnyPermission([
                                                        "roles.edit",
                                                    ]) && (
                                                        <Link
                                                            href={`/roles/${role.id}/edit`}
                                                            className="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission([
                                                        "roles.delete",
                                                    ]) && (
                                                        <Delete
                                                            URL={"/roles"}
                                                            id={role.id}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <TableEmpty
                                        title="Tidak ada Role"
                                        description="Silahkan tambahkan role baru"
                                        colSpan={4}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <TablePagination links={roles.links} />
                </div>
            </LayoutApp>
        </>
    );
}
