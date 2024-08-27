'use client';
import { useSession } from 'next-auth/react';
import LoginForm from '../../components/login.form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const { data: session } = useSession();
    console.log('session desde login', session?.user.data.id);
    return (
        <div className="h-fit flex flex-col content-center text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4">Iniciar sesión</h2>
            <p className="mb-10 text-lg px-2 py-1">
                {' '}
                <span className="text-4xl">🎲</span> Inicia sesión para comenzar
                a crear partidas
            </p>
            <LoginForm />
            <p className="mt-6 font-medium text-base">
                ¿No tienes cuenta?,{' '}
                <Link
                    href="/register"
                    className="underline font-semibold hover:text-[--yellow]"
                >
                    regístrate
                </Link>
            </p>
        </div>
    );
}
