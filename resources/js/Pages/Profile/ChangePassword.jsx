// import Head dan Inertia hooks
import { Head, useForm } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldSet,
} from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import PageHeader from "@/Shared/PageHeader";

export default function ChangePassword() {
    // inisialisasi useForm dengan data awal dari "user"
    const { data, setData, post, processing, errors } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",

        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke route "settings"
        post("/profile/password", {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    current_password: "",
                    password: "",
                    password_confirmation: "",
                });
            },
        });
    };

    return (
        <>
            <Head title={`Change Password`} />
            <LayoutApp>
                <PageHeader
                    title="Change Password"
                    description="Ubah password akun"
                />

                <form onSubmit={handleSubmit}>
                    <FieldSet>
                        <Field>
                            <FieldLabel>Password Lama</FieldLabel>
                            <Input
                                type="password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                className={`${errors.current_password ? "border-red-500" : ""}`}
                            />
                            {errors.current_password && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.current_password}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Password Baru</FieldLabel>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={`${errors.password ? "border-red-500" : ""}`}
                            />
                            {errors.password && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <Input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className={`${errors.password_confirmation ? "border-red-500" : ""}`}
                            />
                            {errors.password_confirmation && (
                                <FieldDescription className="mt-1 text-sm text-red-600">
                                    {errors.password_confirmation}
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
