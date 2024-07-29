'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import useApiRequest from '@/hooks/useApiRequest';

function ResetPassword() {
    const { fetchData } = useApiRequest();
    const params = useParams();
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();
    const token = params.token;

    const onSuccessResetPass = (data) => {
        toast.success(data.message);
        router.push('/login');
    };

    const onErrorResetPass = (error) => {
        toast.error(error.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const urlResetPass =
            process.env.NEXT_PUBLIC_API_HOST + '/reset-password';
        const urlDataResetPass = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword }),
        };

        fetchData(
            urlResetPass,
            urlDataResetPass,
            onSuccessResetPass,
            onErrorResetPass
        );
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
