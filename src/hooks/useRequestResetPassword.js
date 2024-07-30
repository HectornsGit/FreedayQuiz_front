import { useState } from 'react';
import useApiRequest from './useApiRequest';
import { toast } from 'react-toastify';

const useRequestResetPassword = () => {
    const { fetchData } = useApiRequest();
    const [email, setEmail] = useState('');

    let tokenFromBack;
    let idFromBack;

    const onSuccessResetPass = (data) => {
        toast.success(data.message);
        setEmail('');
    };

    const onErrorResetPass = (error) => {
        toast.error(error.error);
    };

    const handleEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const urlResetPass =
            process.env.NEXT_PUBLIC_API_HOST + '/request-password-reset';
        const urlDataResetPass = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        };

        fetchData(
            urlResetPass,
            urlDataResetPass,
            onSuccessResetPass,
            onErrorResetPass
        );
    };

    return {
        email,
        setEmail,
        handleEmail,
        tokenFromBack,
        idFromBack,
    };
};

export default useRequestResetPassword;
