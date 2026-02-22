export default function Table({ children, className, ...rest }) {
    return (
        <div
            className={`${className} overflow-x-auto border border-gray-200 dark:border-neutral-800 rounded-lg`}
            {...rest}
        >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                {children}
            </table>
        </div>
    );
}
