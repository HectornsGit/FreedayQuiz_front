'use client';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import ResetPasswordBox from '@/components/ResetPasswordBox';

const Page = () => {
    return (
        <>
            <p style={{ color: 'white' }}>Esta es una página restringida</p>
            <button
                style={{ color: 'white' }}
                onClick={async () => {
                    toast.success('Sesión cerrada');
                    await signOut({ redirect: false });
                }}
            >
                Cerrar sesion
            </button>
            <ResetPasswordBox />
        </>
    );
};
export default Page;
