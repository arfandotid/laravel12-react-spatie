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
import { Button } from "@/Components/ui/button";
import Table from "@/Components/BasicTable/Table";
import TableBody from "@/Components/BasicTable/TableBody";
import TableHeader from "@/Components/BasicTable/TableHeader";
import TableRow from "@/Components/BasicTable/TableRow";
import TableHead from "@/Components/BasicTable/TableHead";
import TableCell from "@/Components/BasicTable/TableCell";

export default function UsersIndex() {
    // destruct props "users"
    const { users } = usePage().props;

    return (
        <>
            <Head title={`Users`} />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    showButton
                    title="Users"
                    description="Kelola data pengguna dan role akses"
                    action="/users/create"
                    actionText="Tambah User"
                    permission="users.create"
                />

                {/* Card */}
                <div className="space-y-5">
                    <Search URL={"/users"} />

                    {/* Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="w-7">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users && users.data.length > 0 ? (
                                users.data.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {++index +
                                                (users.current_page - 1) *
                                                    users.per_page}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.roles.length > 0
                                                ? user.roles
                                                      .map((role) => role.name)
                                                      .join(", ")
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                {hasAnyPermission([
                                                    "users.edit",
                                                ]) && (
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                        title="Edit"
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Edit />
                                                        </Button>
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
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableEmpty
                                    title="Tidak ada User"
                                    description="Silahkan tambahkan user baru"
                                    colSpan={5}
                                />
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <TablePagination links={users.links} />
                </div>
            </LayoutApp>
        </>
    );
}
