// import Head dan Inertia hooks
import { Head, useForm, usePage, router } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save, Trash2, Upload } from "lucide-react";

// SweetAlert2
import Swal from "sweetalert2";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function SettingsIndex() {
    // destructure "setting" dari props page
    const { setting } = usePage().props;

    // inisialisasi useForm dengan data awal dari "setting"
    const { data, setData, post, processing, errors } = useForm({
        app_name: setting?.app_name || "",
        app_logo: null,

        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke route "settings"
        post("/settings", {
            preserveScroll: true,
        });
    };

    // method deleteLogo
    const deleteLogo = async (id) => {
        // show sweet alert
        Swal.fire({
            title: "Apakah Anda Yakin?",
            text: "Data yang telah dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // delete
                router.delete(`/settings/delete-logo`);
            }
        });
    };

    return (
        <>
            <Head title={`Pengaturan Aplikasi`} />
            <LayoutApp>
                <form onSubmit={handleSubmit}>
                    <FieldSet>
                        <Field>
                            <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                                Logo Aplikasi
                            </FieldLabel>
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
                                    ${errors.app_logo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500"}`}
                            >
                                <input
                                    type="file"
                                    id="logo_file"
                                    onChange={(e) =>
                                        setData("app_logo", e.target.files[0])
                                    }
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/jpg"
                                />

                                <label
                                    htmlFor="logo_file"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600">
                                        {data.app_logo
                                            ? data.app_logo.name
                                            : "Klik untuk upload logo aplikasi"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG / JPG, maksimal 2MB
                                    </p>
                                </label>
                            </div>
                            {setting.app_logo && (
                                <button
                                    type="button"
                                    onClick={deleteLogo}
                                    className="inline-flex items-center px-2 py-1 mt-3 text-sm font-semibold
                                    text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Hapus Logo
                                </button>
                            )}
                            {errors.app_logo && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.app_logo}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>Nama Aplikasi</FieldLabel>
                            <Input
                                type="text"
                                value={data.app_name}
                                onChange={(e) =>
                                    setData("app_name", e.target.value)
                                }
                                className={`${errors.app_name ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.app_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.app_name}
                                </p>
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
