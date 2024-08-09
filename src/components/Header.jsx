'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import '../styles/header.css';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function Header() {
    const [menu, setMenu] = useState(false); // Para el menú de móvil
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false); // Para el menú desplegable del avatar
    const { data: session } = useSession();
    const { userInfo, loading } = useUserInfo();

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const toggleAvatarMenu = () => {
        setAvatarMenuOpen(!avatarMenuOpen);
    };

    const handleMenuClose = () => {
        setMenu(false);
    };

    const handleAvatarMenuClose = () => {
        setAvatarMenuOpen(false);
    };

    return (
        <header className="flex items-center justify-between text-white p-8 bg-header">
            <h1>
                <Link href="/">
                    <img
                        src="/logo-HAB-mobile.png"
                        alt="Logo hack a boss"
                        width={100}
                        height={39}
                        className="block md:hidden"
                    />
                </Link>
                <Link href="/">
                    <img
                        src="/logo-HAB-pc.png"
                        alt="Logo hack a boss"
                        width={100}
                        height={85}
                        className="hidden md:block"
                    />
                </Link>
            </h1>
            <nav>
                {/* Menú de hamburguesa para móviles */}
                <button onClick={toggleMenu} className="md:hidden">
                    {!session ? (
                        <svg
                            className="icon-menu"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                            />
                        </svg>
                    ) : (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo?.avatar || ''}`}
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    )}
                </button>
                <ul className={`burguer-menu ${menu ? 'activated' : ''}`}>
                    {!session ? (
                        <>
                            <li className="text-center text-black font-bold text-xl py-2">
                                <Link href="/login" onClick={handleMenuClose}>
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li className="text-center text-black font-bold text-xl py-2">
                                <Link href="/register" onClick={handleMenuClose}>
                                    Registrarse
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="text-center text-black font-bold text-xl py-2">
                                <Link href="/profile" onClick={handleMenuClose}>
                                    Perfil
                                </Link>
                            </li>
                            <li className="text-center text-black font-bold text-xl py-2">
                                <button
                                    onClick={() => {
                                        signOut();
                                        handleMenuClose();
                                    }}
                                    className="w-full"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                {/* Menú para escritorio */}
                <ul className="hidden md:flex gap-x-8 items-center">
                    {!session ? (
                        <>
                            <li>
                                <ButtonSecondary href="/login">
                                    Iniciar sesión
                                </ButtonSecondary>
                            </li>
                            <li>
                                <ButtonPrimary href="/register">
                                    Registrarse
                                </ButtonPrimary>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="relative">
                                <button
                                    onClick={toggleAvatarMenu}
                                    className="flex items-center space-x-2"
                                >
                                    {!loading && userInfo?.avatar ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
                                            alt="Avatar"
                                            width={40}
                                            height={40}
                                            className="rounded-full cursor-pointer"
                                        />
                                    ) : (
                                        <span>Perfil</span>
                                    )}
                                </button>
                                {avatarMenuOpen && (
                                    <ul className="absolute bg-white text-black border border-gray-300 rounded-lg shadow-lg mt-2 right-0">
                                        <li>
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 hover:bg-gray-200"
                                                onClick={handleAvatarMenuClose}
                                            >
                                                Perfil
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    handleAvatarMenuClose();
                                                }}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
