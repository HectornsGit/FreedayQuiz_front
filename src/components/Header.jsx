import Image from "next/image";

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-between bg-pink-100 p-8">
            <h1>
                <Image src='/logo-HAB-mobile.png' alt='Logo hack a boss' width={150} height={59}/>
            </h1>
            <nav>
                <ul>
                    <li>Sign in</li>
                    <li>Sign up</li>
                </ul>
            </nav>
        </header>
    );
}