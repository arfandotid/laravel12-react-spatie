// import Head dan Link dari Inertia
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";
import { Input } from "@/Components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";

export default function UsersEdit() {
    // props dari controller
    const { user, roles, userRoles } = usePage().props;

    // useForm untuk mengelola form data
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        roles: userRoles || [],
    });

    // fungsi toggleRole
    const toggleRole = (id) => {
        setData(
            "roles",
            data.roles.includes(id)
                ? data.roles.filter((item) => item !== id)
                : [...data.roles, id],
        );
    };

    // fungsi handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke server
        put(`/users/${user.id}`);
    };

    return (
        <>
            <Head title={`Edit User - ${import.meta.env.VITE_APP_NAME}`} />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    title="Edit User"
                    description="Perbarui data pengguna dan role akses"
                />

                {/* Card */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Name */}
                        <Field>
                            <FieldLabel>Nama</FieldLabel>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`${errors.name ? "border-red-500" : ""}`}
                                placeholder="Nama lengkap"
                            />
                            {errors.name && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={`${errors.email ? "border-red-500" : ""}`}
                                placeholder="email@example.com"
                            />
                            {errors.email && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Password (Optional) */}
                        <Field>
                            <FieldLabel>Password (opsional)</FieldLabel>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={`${errors.password ? "border-red-500" : ""}`}
                                placeholder="Kosongkan jika tidak ingin mengubah"
                            />
                            {errors.password && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Roles */}
                        <Field>
                            <FieldLabel>Roles</FieldLabel>

                            <div className="grid grid-cols-1 gap-4">
                                {roles.map((role) => (
                                    <Field
                                        orientation="horizontal"
                                        key={role.id}
                                    >
                                        <Checkbox
                                            id={`role-${role.id}`}
                                            checked={data.roles.includes(
                                                role.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                                toggleRole(role.id, checked);
                                            }}
                                        />
                                        <FieldLabel htmlFor={`role-${role.id}`}>
                                            {role.name}
                                        </FieldLabel>
                                    </Field>
                                ))}
                            </div>

                            {errors.roles && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.roles}
                                </FieldDescription>
                            )}
                        </Field>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-start space-x-2 pt-6">
                        <Link href="/users">
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
