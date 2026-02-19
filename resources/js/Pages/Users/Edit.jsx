// import Head dan Link dari Inertia
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import icons
import { Save } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

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
                <div className="mb-8">
                    <PageHeader
                        title="Edit User"
                        description="Perbarui data pengguna dan role akses"
                    />
                </div>

                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password{" "}
                                    <span className="text-gray-400">
                                        (Opsional)
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Kosongkan jika tidak ingin mengubah"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Roles */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Roles
                                </label>

                                <div className="grid grid-cols-1 gap-4">
                                    {roles.map((role) => (
                                        <label
                                            key={role.id}
                                            className="flex items-center space-x-2 text-sm text-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.roles.includes(
                                                    role.id,
                                                )}
                                                onChange={() =>
                                                    toggleRole(role.id)
                                                }
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span>{role.name}</span>
                                        </label>
                                    ))}
                                </div>

                                {errors.roles && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.roles}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-start space-x-3 pt-6">
                            <Link
                                href="/users"
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </LayoutApp>
        </>
    );
}
