// import Head dan Inertia hooks
import { Head, useForm, usePage, router } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

// SweetAlert2
import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldSet,
} from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import PageHeader from "@/Shared/PageHeader";

export default function ProfileIndex() {
    // destructure "user" dari props page
    const { user } = usePage().props;

    // inisialisasi useForm dengan data awal dari "user"
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",

        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke route "settings"
        post("/profile", {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Profile`} />
            <LayoutApp>
                <PageHeader title="Profile" description="Kelola profil saya" />

                <form onSubmit={handleSubmit}>
                    <FieldSet>
                        <Field>
                            <FieldLabel>Nama</FieldLabel>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={`${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Action */}
                        <div>
                            <Button type="submit" disabled={processing}>
                                <Save />
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </FieldSet>
                </form>
            </LayoutApp>
        </>
    );
}
