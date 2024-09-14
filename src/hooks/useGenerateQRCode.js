import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGenerateQRCode = (session, status, quizId) => {
    const [qrCode, setQrCode] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return; // Espera a que la sesión esté lista

        if (!session?.accessToken) {
            toast.error('Token de autenticación no disponible');
            setLoading(false);
            return;
        }

        const fetchQuizData = async () => {
            try {
                const urlData = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                };
                const urlGetQuiz = `${process.env.NEXT_PUBLIC_API_HOST}/get-quiz/${quizId}`;
                const response = await fetch(urlGetQuiz, urlData);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || 'Error al obtener datos del quiz'
                    );
                }

                setAccessCode(data.access_code); // Guarda el access_code
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            }
        };

        const generateQR = async () => {
            try {
                const urlData = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                };
                const urlGetQR = `${process.env.NEXT_PUBLIC_API_HOST}/generate-qr/${quizId}`;
                const response = await fetch(urlGetQR, urlData);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al generar QR');
                }

                setQrCode(data.qrCode.url);
                // toast.success(data.message);
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            }
        };

        fetchQuizData(); // Obtén el access_code
        generateQR(); // Genera el código QR
        setLoading(false); // Deja de cargar
    }, [session, status, quizId]);

    const router = useRouter();
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    // Detectar si es móvil o tablet al cargar el componente
    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobileOrTablet(isMobile);
    }, []);

    const handleGoToMatch = () => {
        router.push(`/match/${quizId}`);
    };

    return {
        qrCode,
        setQrCode,
        loading,
        setLoading,
        accessCode,
        setAccessCode,
        isMobileOrTablet,
        handleGoToMatch,
    };
};
export default useGenerateQRCode;
