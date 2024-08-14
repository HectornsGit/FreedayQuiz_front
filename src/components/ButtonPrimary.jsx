import Link from 'next/link';

export default function ButtonPrimary({ href, children }) {
    return (
        <Link
            href={href}
            className="text-black font-extrabold text-lg bg-gradient px-5 py-2 
    hover:box-shadow-yellow"
        >
            <span className="gradient-text">{children}</span>
        </Link>
    );
}
