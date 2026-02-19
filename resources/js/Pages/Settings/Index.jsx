// import Head dan Inertia hooks
import { Head, useForm, usePage } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save, Upload } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

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

    return (
        <>
            <Head title={`Pengaturan Desa`} />
            <LayoutApp>
                {/* Header */}
                <div className="mb-8">
                    <PageHeader
                        title="Pengaturan Aplikasi"
                        description="Kelola identitas aplikasi, logo, dan pengaturan umum"
                    />
                </div>

                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Logo Aplikasi
                                </label>

                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
                                    ${errors.app_logo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500"}`}
                                >
                                    <input
                                        type="file"
                                        id="logo_file"
                                        onChange={(e) =>
                                            setData(
                                                "app_logo",
                                                e.target.files[0],
                                            )
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

                                {errors.app_logo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.app_logo}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Aplikasi
                                    </label>
                                    <input
                                        type="text"
                                        value={data.app_name}
                                        onChange={(e) =>
                                            setData("app_name", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.app_name ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.app_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.app_name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2.5 text-sm font-semibold
                                    text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutApp>
        </>
    );
}
