/* eslint-disable @next/next/no-img-element */
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const GenerateQRCode = ({ quizId }) => {
    const [qrCode, setQrCode] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

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
                toast.success(data.message);
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            }
        };

        fetchQuizData(); // Obtén el access_code
        generateQR(); // Genera el código QR
        setLoading(false); // Deja de cargar
    }, [session, status, quizId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col justify-center items-center text-center min-h-screen">
            {qrCode ? (
                <div className="flex flex-col items-center qr-code">
                    <h1 className="font-extrabold text-2xl mb-4">¡Comenzar!</h1>
                    <h3 className="text-lg mb-6">
                        Comparte el código QR para que los/as participantes
                        puedan iniciar el quiz
                    </h3>
                    <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
                    {accessCode && (
                        <div className="mt-4">
                            <h2 className="font-bold text-xl">Pin de juego</h2>
                            <p className="text-lg text-[var(--yellow)]">
                                {accessCode}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <p>No se ha generado ningún QR code.</p>
            )}
        </div>
    );
};

export default GenerateQRCode;
