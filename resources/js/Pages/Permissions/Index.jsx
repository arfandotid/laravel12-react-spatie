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

// import component Button
import { Button } from "@/Components/ui/button";

// import basic table components
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/Components/BasicTable";

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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Nama Permission</TableHead>
                                <TableHead className="w-7">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions && permissions.data.length > 0 ? (
                                permissions.data.map((permission, index) => (
                                    <TableRow key={permission.id}>
                                        <TableCell className="font-medium">
                                            {++index +
                                                (permissions.current_page - 1) *
                                                    permissions.per_page}
                                        </TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>
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
                                                        URL={"/permissions"}
                                                        id={permission.id}
                                                    />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableEmpty
                                    title="Tidak ada Permission"
                                    description="Silahkan tambahkan permission baru"
                                    colSpan={3}
                                />
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <TablePagination links={permissions.links} />
                </div>
            </LayoutApp>
        </>
    );
}
