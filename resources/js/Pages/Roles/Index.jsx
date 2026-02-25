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

// import component Button
import { Button } from "@/Components/ui/button";

// import component Pagination
import TablePagination from "@/Shared/TablePagination";

// import basic table components
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/Components/BasicTable";

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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Nama Role</TableHead>
                                <TableHead>Jumlah Permission</TableHead>
                                <TableHead className="w-7">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles && roles.data.length > 0 ? (
                                roles.data.map((role, index) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">
                                            {++index +
                                                (roles.current_page - 1) *
                                                    roles.per_page}
                                        </TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>
                                            {role.permissions_count}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                {hasAnyPermission([
                                                    "roles.edit",
                                                ]) && (
                                                    <Link
                                                        href={`/roles/${role.id}/edit`}
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
                                                    "roles.delete",
                                                ]) && (
                                                    <Delete
                                                        URL={"/roles"}
                                                        id={role.id}
                                                    />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableEmpty
                                    title="Tidak ada Role"
                                    description="Silahkan tambahkan role baru"
                                    colSpan={4}
                                />
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <TablePagination links={roles.links} />
                </div>
            </LayoutApp>
        </>
    );
}
