// import Link
import { Link } from "@inertiajs/react";

// import icons
import { Plus } from "lucide-react";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";
import { Button } from "@/Components/ui/button";

export default function PageHeader({
    showButton,
    title,
    description,
    action,
    actionText,
    permission,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {showButton && permission && (
                <div className="mt-4 sm:mt-0">
                    {hasAnyPermission(permission) && (
                        <Link href={action}>
                            <Button>
                                <Plus className="w-5 h-5 mr-2" />
                                {actionText}
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
