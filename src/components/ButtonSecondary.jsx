import Link from "next/link";

export default function ButtonSecondary({href, children}) {

    return (
    <Link href={href} className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white">{children}</Link>
    );
}