// import Head dan Link dari Inertia
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";

export default function RolesEdit() {
    // props dari controller
    const { role, permissions, rolePermissions } = usePage().props;

    // useForm untuk mengelola form data
    const { data, setData, put, processing, errors } = useForm({
        name: role.name || "",
        permissions: rolePermissions || [],
    });

    // group permission berdasarkan prefix (roles.*, users.*, dll)
    const groupedPermissions = permissions.reduce((groups, permission) => {
        const [group] = permission.name.split(".");
        const groupName = group.charAt(0).toUpperCase() + group.slice(1);

        if (!groups[groupName]) {
            groups[groupName] = [];
        }

        groups[groupName].push(permission);
        return groups;
    }, {});

    // fungsi togglePermission
    const togglePermission = (id) => {
        setData(
            "permissions",
            data.permissions.includes(id)
                ? data.permissions.filter((item) => item !== id)
                : [...data.permissions, id],
        );
    };

    // fungsi handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke server
        put(`/roles/${role.id}`);
    };

    return (
        <>
            <Head title={`Edit Role - ${import.meta.env.VITE_APP_NAME}`} />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    title="Edit Role"
                    description="Perbarui role dan hak akses yang dimiliki"
                />

                {/* Card */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Role Name */}
                        <Field>
                            <FieldLabel>Nama Role</FieldLabel>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Contoh: admin"
                            />
                            {errors.name && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Permissions */}
                        <Field>
                            <FieldLabel>Permissions</FieldLabel>

                            {/* GRID GROUP */}
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(groupedPermissions).map(
                                    (group) => (
                                        <div
                                            key={group}
                                            className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                                        >
                                            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                                                {group}
                                            </h4>

                                            {/* CHECKBOX GRID */}
                                            <div className="grid grid-cols-1 gap-2">
                                                {groupedPermissions[group].map(
                                                    (permission) => (
                                                        <Field
                                                            orientation="horizontal"
                                                            key={permission.id}
                                                        >
                                                            <Checkbox
                                                                checked={data.permissions.includes(
                                                                    permission.id,
                                                                )}
                                                                onCheckedChange={(
                                                                    checked,
                                                                ) => {
                                                                    togglePermission(
                                                                        permission.id,
                                                                        checked,
                                                                    );
                                                                }}
                                                                id={`permission-${permission.id}`}
                                                            />
                                                            <FieldLabel
                                                                htmlFor={`permission-${permission.id}`}
                                                            >
                                                                {
                                                                    permission.name
                                                                }
                                                            </FieldLabel>
                                                        </Field>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>

                            {errors.permissions && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.permissions}
                                </p>
                            )}
                        </Field>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-start space-x-2 pt-6">
                        <Link href="/roles">
                            <Button variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save />
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </div>
                </form>
            </LayoutApp>
        </>
    );
}
