/* eslint-disable @next/next/no-img-element */
import useGenerateQRCode from '@/hooks/useGenerateQRCode';
import { useSession } from 'next-auth/react';

const GenerateQRCode = ({ quizId }) => {
    const { data: session, status } = useSession();
    const { qrCode, loading } = useGenerateQRCode(session, status, quizId);

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
