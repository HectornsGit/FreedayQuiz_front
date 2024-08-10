/* eslint-disable @next/next/no-img-element */
import useApiRequest from '@/hooks/useApiRequest';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const GenerateQRButton = ({ quizId }) => {
    const [qrCode, setQrCode] = useState('');
    const { fetchData } = useApiRequest();
    const { data: session, status } = useSession();

    const onSuccessQR = (data) => {
        toast.success(data.message);
        setQrCode(data.qrCode.url);
    };

    const onErrorQR = (error) => {
        toast.error(error.error);
        console.log(error);
    };

    const handleQR = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const urlData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
        };
        const urlGetQR =
            process.env.NEXT_PUBLIC_API_HOST + `/generate-qr/${quizId}`;
        console.log('ruta', urlGetQR);
        fetchData(urlGetQR, urlData, onSuccessQR, onErrorQR);
    };

    return (
        <div>
            <button onClick={handleQR}>Genera el código QRdel quiz</button>
            {qrCode && (
                <div>
                    <h3>Scanea este código QR:</h3>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default GenerateQRButton;
