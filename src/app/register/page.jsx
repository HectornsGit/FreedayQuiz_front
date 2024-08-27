'use client';
import RegisterForm from '../../components/register.form';
import Link from 'next/link';

function RegisterPage() {
    return (
        <>
            <div className="h-fit flex flex-col content-center text-center mb-14">
                <h2 className="text-4xl font-extrabold mb-4">¡Regístrate!</h2>
                <p className="mb-10 text-lg text-center">
                    <span className="text-2xl">😝</span>Regístrate y crea quizes
                    divertidos
                </p>
                <RegisterForm />
                <p className="mt-6 font-medium text-base">
                    ¿Ya tienes cuenta?,{' '}
                    <Link
                        href="/login"
                        className="underline font-semibold hover:text-[--yellow]"
                    >
                        inicia sesión
                    </Link>
                </p>
            </div>
        </>
    );
}

export default RegisterPage;
