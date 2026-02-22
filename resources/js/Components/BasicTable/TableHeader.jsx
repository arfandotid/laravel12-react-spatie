export default function TableHeader({ children, className, ...rest }) {
    return (
        <thead
            className={`${className} bg-gray-50 dark:bg-neutral-800`}
            {...rest}
        >
            {children}
        </thead>
    );
}
