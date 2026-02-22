export default function TableHead({ children, className, ...rest }) {
    return (
        <th
            className={`${className} px-6 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-50 uppercase`}
            {...rest}
        >
            {children}
        </th>
    );
}
