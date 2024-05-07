//Menu navegación
"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../src/app/styles/header.css";



export default function Header() {

    const [menu, setMenu] = useState (false);

    const toggleMenu = () =>{
    setMenu(!menu)
}

    return (
        <header className="flex items-center justify-between text-white p-8 bg-header">
            <h1>
                {/* Pongo las imágenes asi porque cuando es versión movil aparece un logo y cuando es version mas grande, otro */}
                <Image src="/logo-HAB-mobile.png" alt="Logo hack a boss" width={150} height={59} className="block md:hidden"/>
                <Image src="/logo-HAB-pc.png" alt="Logo hack a boss" width={100} height={85} className="hidden md:block"/>
            </h1>
    <nav>
        <button onClick={toggleMenu} className="block md:hidden">
            <svg className="icon-menu" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </button>
        <ul className={`burguer-menu ${menu ? 'activated' : ''}`}>
            <li><Link href="#">Sign In</Link></li>
            <li><Link href="#">Sign Up</Link></li>
        </ul>
    </nav>
        </header>
    );
}