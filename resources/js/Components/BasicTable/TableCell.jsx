export default function TableCell({ children, className, ...rest }) {
    return (
        <td
            className={`px-6 py-2 text-sm text-gray-900 dark:text-gray-50 ${className}`}
            {...rest}
        >
            {children}
        </td>
    );
}
