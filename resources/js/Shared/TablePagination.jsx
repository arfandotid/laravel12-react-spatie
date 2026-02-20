//import Link
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Link } from "@inertiajs/react";

export default function TablePagination({ links }) {
    return (
        <Pagination className="flex justify-end">
            <PaginationContent>
                {links.map((link, index) => {
                    const label = link.label
                        .replace("&laquo;", "«")
                        .replace("&raquo;", "»");

                    // PREVIOUS
                    if (label.includes("Previous")) {
                        return (
                            <PaginationItem key={index}>
                                {link.url ? (
                                    <PaginationPrevious href={link.url} />
                                ) : (
                                    <PaginationPrevious className="pointer-events-none opacity-50" />
                                )}
                            </PaginationItem>
                        );
                    }

                    // NEXT
                    if (label.includes("Next")) {
                        return (
                            <PaginationItem key={index}>
                                {link.url ? (
                                    <PaginationNext href={link.url} />
                                ) : (
                                    <PaginationNext className="pointer-events-none opacity-50" />
                                )}
                            </PaginationItem>
                        );
                    }

                    // PAGE NUMBER
                    return (
                        <PaginationItem key={index}>
                            {link.url ? (
                                <PaginationLink
                                    isActive={link.active}
                                    href={link.url}
                                >
                                    {label}
                                </PaginationLink>
                            ) : (
                                <PaginationLink
                                    isActive={link.active}
                                    className="pointer-events-none opacity-50"
                                >
                                    {label}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
