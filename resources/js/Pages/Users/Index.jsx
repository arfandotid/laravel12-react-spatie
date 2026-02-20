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

// import table pagination
import TablePagination from "@/Shared/TablePagination";

export default function UsersIndex() {
    // destruct props "users"
    const { users } = usePage().props;

    return (
        <>
            <Head title={`Users`} />
            <LayoutApp>
                {/* Header */}
                <div className="mb-8">
                    <PageHeader
                        showButton
                        title="Users"
                        description="Kelola data pengguna dan role akses"
                        action="/users/create"
                        actionText="Tambah User"
                        permission="users.create"
                    />
                </div>

                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <Search URL={"/users"} />

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        No.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-7">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users && users.data.length > 0 ? (
                                    users.data.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {++index +
                                                    (users.current_page - 1) *
                                                        users.per_page}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {user.roles.length > 0
                                                    ? user.roles
                                                          .map(
                                                              (role) =>
                                                                  role.name,
                                                          )
                                                          .join(", ")
                                                    : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {hasAnyPermission([
                                                        "users.edit",
                                                    ]) && (
                                                        <Link
                                                            href={`/users/${user.id}/edit`}
                                                            className="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission([
                                                        "users.delete",
                                                    ]) && (
                                                        <Delete
                                                            URL={"/users"}
                                                            id={user.id}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <TableEmpty
                                        title="Tidak ada User"
                                        description="Silahkan tambahkan user baru"
                                        colSpan={5}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <TablePagination links={users.links} />
                </div>
            </LayoutApp>
        </>
    );
}
