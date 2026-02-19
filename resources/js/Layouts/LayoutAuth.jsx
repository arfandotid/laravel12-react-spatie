// import Link
import { Link } from "@inertiajs/react";

// import usePage dari inertiajs
import { usePage } from "@inertiajs/react";

// import icon dari lucide react
import { Building2 } from "lucide-react";

export default function LayoutAuth({ children }) {
    // get page props "settings"
    const { settings } = usePage().props;

    return (
        <div className="relative p-6 bg-white z-1 sm:p-0">
            <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0">
                {children}
                <div className="items-center hidden w-full h-full lg:w-1/2 lg:grid relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
                    <div className="relative flex items-center justify-center z-1">
                        <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
                            <img
                                src="https://cdn.jsdelivr.net/gh/maulayyacyber/assets-images-ebooks/surat-desa-react/grid-01.svg"
                                alt="grid"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                            <img
                                src="https://cdn.jsdelivr.net/gh/maulayyacyber/assets-images-ebooks/surat-desa-react/grid-01.svg"
                                alt="grid"
                            />
                        </div>
                        <div className="flex flex-col items-center max-w-md">
                            <Link
                                to="/"
                                className="block mb-4 bg-slate-700 p-3 rounded-2xl"
                            >
                                {settings?.app_logo ? (
                                    <img
                                        width={80}
                                        height={"auto"}
                                        src={`${settings.app_logo}`}
                                        alt={`Logo ${settings.app_name}`}
                                        className="object-contain"
                                    />
                                ) : (
                                    <Building2
                                        size={80}
                                        className="text-white p-2"
                                    />
                                )}
                            </Link>
                            <p className="text-center text-gray-400">
                                <strong>{settings.app_name}</strong> - Hak Cipta{" "}
                                {new Date().getFullYear()} &copy; Dilindungi
                                Undang-Undang.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
