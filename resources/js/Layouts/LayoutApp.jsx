import { AppSidebar } from "@/Components/Sidebar/AppSidebar";
import NavBreadcrumb from "@/Components/Sidebar/NavBreadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function LayoutApp({ children }) {
    // destruct auth dan flash dari props
    const { auth, flash } = usePage().props;

    // useEffect untuk menampilkan Sweet Alert jika ada flash message
    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "SUCCESS!",
                text: flash.success,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <AppSidebar auth={auth} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <NavBreadcrumb />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
