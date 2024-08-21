import useApiRequest from '@/hooks/useApiRequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

const useLoginForm = () => {
    const { fetchData } = useApiRequest();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false); //para mostrar o no el texto en el campo contraseña

    const host = process.env.NEXT_PUBLIC_API_HOST;

    const onSuccess = async (_data) => {
        toast.success('Logueado correctamente');
        setEmail('');
        setPassword('');
        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });

        if (result.ok) {
            router.push('/');
        } else {
            toast.error('Error en el inicio de sesión');
        }
    };
    const onError = (error) => {
        toast.error(error.error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        };
        fetchData(host + '/login', body, onSuccess, onError);
    };
    return {
        handleSubmit,
        showPass,
        setShowPass,
        password,
        setPassword,
        email,
        setEmail,
    };
};
export default useLoginForm;
