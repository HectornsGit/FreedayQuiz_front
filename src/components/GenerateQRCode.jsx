/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
import useGenerateQRCode from '@/hooks/useGenerateQRCode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const GenerateQRCode = ({ quizId }) => {
    const { data: session, status } = useSession();
    const { qrCode, loading, accessCode } = useGenerateQRCode(
        session,
        status,
        quizId
    );
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
                    {isMobileOrTablet && (
                        <button
                            onClick={handleGoToMatch}
                            className="text-black font-extrabold text-lg bg-gradient px-11 py-2 hover:box-shadow-yellow mt-6"
                        >
                            <p className="gradient-text">Iniciar juego</p>
                        </button>
                    )}
                </div>
            ) : (
                <p>No se ha generado ningún QR code.</p>
            )}
        </div>
    );
};

export default GenerateQRCode;
