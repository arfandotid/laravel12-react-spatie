export default function TableRow({ children, className, ...rest }) {
    return (
        <tr className={`${className} `} {...rest}>
            {children}
        </tr>
    );
}
