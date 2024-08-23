import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGenerateQRCode = (session, status, quizId) => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(true);

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
                // toast.success(data.message);
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        generateQR();
    }, [session, status, quizId]);

    return { qrCode, setQrCode, loading, setLoading };
};
export default useGenerateQRCode;
