import { useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const useLanding = () => {
    const [accessCode, setAccessCode] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (accessCode) {
            const onSuccess = (result) => {
                const { quizId } = result;
                if (quizId) {
                    toast.success('Redirigiendo al juego...');
                    router.push(`/match/${quizId}`);
                } else {
                    toast.error(
                        'No se encontró el quiz con el código proporcionado.'
                    );
                }
            };

            const onError = (error) => {
                console.log('el error', error);

                if (error.message === 'Access code is invalid') {
                    toast.error('Código de acceso inválido.');
                } else {
                    toast.error(
                        'Error en el servidor. Por favor, inténtelo de nuevo más tarde.'
                    );
                }
            };

            await fetchAPI(
                `/join-quiz/${accessCode}`,
                'GET',
                null,
                onSuccess,
                onError
            );
        } else {
            toast.error('Por favor, introduce un código de acceso válido');
        }
    };
    return { accessCode, setAccessCode, handleSubmit };
};
export default useLanding;
