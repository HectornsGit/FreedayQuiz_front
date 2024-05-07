import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-pink-100 p-8">
            <h1>
                {/* Pongo las imágenes asi porque cuando es versión movil aparece un logo y cuando es version mas grande, otro */}
                <Image src="/logo-HAB-mobile.png" alt="Logo hack a boss" width={150} height={59} className="block md:hidden"/>
                <Image src="/logo-HAB-pc.png" alt="Logo hack a boss" width={100} height={85} className="hidden md:block"/>
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