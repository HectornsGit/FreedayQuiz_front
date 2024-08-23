import Link from 'next/link';

export default function ButtonSecondary({ href, children }) {
    return (
        <Link
            href={href}
            className="text-black font-extrabold text-lg bg-white px-5 py-2hover:bg-black transition-colors duration-300 ease-in-out hover:text-white hover:box-shadow-white"
        >
            {children}
        </Link>
    );
}
