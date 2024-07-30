import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';
import useApiRequest from '@/hooks/useApiRequest';

const useResetPassword = () => {
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

    return {
        handleSubmit,
        setNewPassword,
        newPassword,
    };
};

export default useResetPassword;
