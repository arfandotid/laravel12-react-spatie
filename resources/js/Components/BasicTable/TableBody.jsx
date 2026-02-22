export default function TableBody({ children, className, ...rest }) {
    return (
        <tbody
            className={` ${className} bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700`}
            {...rest}
        >
            {children}
        </tbody>
    );
}
