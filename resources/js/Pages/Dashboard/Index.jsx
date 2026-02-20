// import Head and Link dari Inertia
import { Head } from "@inertiajs/react";

// import LayoutApp
import LayoutApp from "@/Layouts/LayoutApp";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

export default function Dashboard() {
    return (
        <>
            <Head title={`Dashboard`} />
            <LayoutApp>
                {/* Header */}
                {/* <div className="mb-8">
                    <PageHeader
                        showButton={false}
                        title="Dashboard"
                        description="Halaman dashboard"
                    />
                </div> */}
                tes
            </LayoutApp>
        </>
    );
}
