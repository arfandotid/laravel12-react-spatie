// import Head dan Link dari Inertia
import { Head, Link, useForm } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function PermissionsCreate() {
    // useForm untuk mengelola form data
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    // fungsi handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke server
        post("/permissions");
    };

    return (
        <>
            <Head title={`Tambah Permission`} />
            <LayoutApp>
                {/* Header */}
                <PageHeader
                    title="Tambah Permission"
                    description="Buat permission baru untuk hak akses pengguna"
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
                                placeholder="Contoh: permissions.create"
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
                            {processing ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </LayoutApp>
        </>
    );
}
