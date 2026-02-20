"use client";

import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";

// import menuConfig
import {
    menuItems,
    getFilteredMenuItems,
    getFilteredDropdown,
} from "./menuConfig";

export function NavMain() {
    const filteredMenuItems = getFilteredMenuItems();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarMenu>
                {filteredMenuItems.map((item) => {
                    // Filter dropdown items
                    const filteredDropdown = getFilteredDropdown(item.dropdown);

                    // Hide dropdown if it has no items
                    if (item.dropdown && filteredDropdown.length === 0) {
                        return null;
                    }

                    return (
                        <Collapsible
                            key={item.name}
                            asChild
                            defaultOpen="false"
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                {item.dropdown ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.name}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.name}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.dropdown?.map(
                                                    (subItem) => (
                                                        <SidebarMenuSubItem
                                                            key={subItem.name}
                                                        >
                                                            <SidebarMenuSubButton
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        subItem.href
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            subItem.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ),
                                                )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ) : (
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
