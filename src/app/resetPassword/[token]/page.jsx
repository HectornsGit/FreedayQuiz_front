'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

function ResetPassword() {
    const params = useParams();
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();
    const token = params.token;

    const handleSubmit = async (e) => {
        console.log(
            'DAtos',
            token,
            newPassword,
            process.env.NEXT_PUBLIC_API_HOST + '/reset-password'
        );
        e.preventDefault();
        const res = await fetch(
            process.env.NEXT_PUBLIC_API_HOST + '/reset-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            }
        );

        if (res.ok) {
            alert('Contraseña reseteada');
            router.push('/login');
        } else {
            alert('Error en el proceso de cambiar contraseña');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Escribe tu nueva contraseña"
                required
            />
            <button type="submit">Reset password</button>
        </form>
    );
}

export default ResetPassword;
