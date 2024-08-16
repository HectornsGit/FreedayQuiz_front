// components/GenerateQRCode.js
import { useEffect, useState } from 'react';
import useApiRequest from '@/hooks/useApiRequest';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const GenerateQRCode = ({ quizId }) => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(true);
    const { fetchData } = useApiRequest();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return; // Espera a que la sesión esté lista

        if (!session?.accessToken) {
            toast.error('Token de autenticación no disponible');
            setLoading(false);
            return;
        }

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
            } finally {
                setLoading(false);
            }
        };

        generateQR();
    }, [session, status, quizId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center text-center min-h-screen">
            {qrCode ? (
                <div className="flex flex-col items-center qr-code">
                    <h1 className="font-extrabold text-2xl mb-4">¡Comenzar!</h1>
                    <h3 className="text-lg mb-6">
                        Comparte el código QR para que los/as participantes
                        puedan iniciar el quiz
                    </h3>
                    <img src={qrCode} alt="QR Code" className="mx-auto" />
                </div>
            ) : (
                <p>No se ha generado ningún QR code.</p>
            )}
        </div>
    );
};

export default GenerateQRCode;
