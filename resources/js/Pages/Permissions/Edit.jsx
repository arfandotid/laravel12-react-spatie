// import Head dan Link dari Inertia
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";
import { Button } from "@/Components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";

export default function PermissionsEdit() {
    // destruct permission dari props
    const { permission } = usePage().props;

    // useForm untuk mengelola form data
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name || "",
    });

    // fungsi handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke server
        put(`/permissions/${permission.id}`);
    };

    return (
        <>
            <Head
                title={`Edit Permission - ${import.meta.env.VITE_APP_NAME}`}
            />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    title="Edit Permission"
                    description="Perbarui data permission untuk hak akses pengguna"
                />

                {/* Card */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Name */}
                        <Field>
                            <FieldLabel>Nama Permission</FieldLabel>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Contoh: permissions.edit"
                            />
                            {errors.name && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </FieldDescription>
                            )}
                        </Field>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-start space-x-2 pt-6">
                        <Link href="/permissions">
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
