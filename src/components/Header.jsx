/* eslint-disable @next/next/no-img-element */
'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import '../styles/header.css';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import useHeader from '@/hooks/useHeader';

export default function Header() {
    const { data: session } = useSession();
    const {
        menu,
        desktopMenuOpen,
        toggleMenu,
        toggledesktopMenu,
        handleMenuClose,
        handledesktopMenuClose,
        userInfo,
        loading,
    } = useHeader();

    return (
        <header className="min-h-[14vh] flex items-center justify-between text-white p-8 bg-header">
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
                            className="rounded-full cursor-pointer w-12 h-12 object-cover border-2 border-[var(--yellow)]"
                        />
                    )}
                </button>
                <ul
                    className={`burguer-menu ${menu ? 'activated' : ''} z-[1000]`}
                >
                    {!session ? (
                        <>
                            <li className="text-center text-black font-bold text-xl py-2">
                                <Link href="/login" onClick={handleMenuClose}>
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li className="text-center text-black font-bold text-xl py-2">
                                <Link
                                    href="/register"
                                    onClick={handleMenuClose}
                                >
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
                <ul className="hidden md:flex gap-x-8 items-center relative">
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
                                    onClick={toggledesktopMenu}
                                    className="flex items-center space-x-2"
                                >
                                    {!loading && userInfo?.avatar ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
                                            alt="Avatar"
                                            className="rounded-full cursor-pointer md:w-20 md:h-20 object-cover border-2 border-[var(--yellow)]"
                                        />
                                    ) : (
                                        <span>Perfil</span>
                                    )}
                                </button>
                                <ul
                                    className={`desktop-menu ${desktopMenuOpen ? 'activated-desktop' : ''}`}
                                >
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-gray-200"
                                            onClick={handledesktopMenuClose}
                                        >
                                            Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                handledesktopMenuClose();
                                            }}
                                            className="block w-full px-4 py-2 hover:bg-gray-200"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
