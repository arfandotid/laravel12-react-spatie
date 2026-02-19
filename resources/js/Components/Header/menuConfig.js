// import helper
import hasAnyPermission from "@/Utils/Permission";

// import icons
import { Users, UserCog, Settings, Key, Shield } from "lucide-react";

// Menu items dengan permission check
export const menuItems = [
    {
        name: "User Management",
        icon: UserCog,
        permissions: ["roles.index", "permissions.index", "users.index"],
        dropdown: [
            {
                name: "Roles",
                href: "/roles",
                icon: Shield,
                description: "Kelola peran pengguna",
                permissions: ["roles.index"],
            },
            {
                name: "Permissions",
                href: "/permissions",
                icon: Key,
                description: "Kelola izin akses",
                permissions: ["permissions.index"],
            },
            {
                name: "Users",
                href: "/users",
                icon: Users,
                description: "Kelola data pengguna",
                permissions: ["users.index"],
            },
        ],
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/settings",
        permissions: ["settings.index"],
        description: "Pengaturan sistem aplikasi",
    },
];

// Filter menu items berdasarkan permission
export const getFilteredMenuItems = () => {
    return menuItems.filter((item) => {
        if (item.permissions && item.permissions.length > 0) {
            return hasAnyPermission(item.permissions);
        }
        return true;
    });
};

// Fungsi untuk filter dropdown items berdasarkan permission
export const getFilteredDropdown = (dropdownItems) => {
    if (!dropdownItems) return [];

    return dropdownItems.filter((subItem) => {
        if (subItem.permissions && subItem.permissions.length > 0) {
            return hasAnyPermission(subItem.permissions);
        }
        return true;
    });
};
