import Link from "next/link";

export default function ButtonPrimary({href, children}) {

    return (
    <Link href={href} className="text-black font-extrabold text-lg bg-gradient px-11 py-2 
    hover:bg-black hover:box-shadow-yellow">{children}</Link>
    );
}
