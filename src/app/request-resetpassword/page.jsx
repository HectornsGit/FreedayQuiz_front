'use client';

import RequestResetPassword from '@/components/RequestResetPassword';

const requestResetPassword = () => {
    return (
        <div className="h-fit flex flex-col content-center text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4">Verificacion</h2>
            <p className="mb-10 text-lg px-2 py-1">
                <span className="text-4xl">🪁</span>Enviaremos un mensaje a tu
                correo para cambiar la contraseña
            </p>
            <RequestResetPassword />
        </div>
    );
};

export default requestResetPassword;
