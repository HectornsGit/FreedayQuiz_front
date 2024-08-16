'use client';

import GenerateQRCode from '@/components/GenerateQRCode';
import { useParams } from 'next/navigation';

const QRPage = () => {
    const { quizId } = useParams();

    return (
        <div className="hide-header">
            <GenerateQRCode quizId={quizId} />
        </div>
    );
};

export default QRPage;
