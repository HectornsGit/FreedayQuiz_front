'use client';
import { toast } from 'react-toastify';
import { getItemWithExpiry } from '../utils';

const questionStartedHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setIsDisabled
) => {
    if (socket) {
        socket.on('questionStarted', () => {
            const playerName = getItemWithExpiry('playerName');
            const isMaster = getItemWithExpiry('isMaster');

            if (!playerName && !isMaster) {
                toast.warning(
                    '¡El quiz ha comenzado!, ¡Introduce tu nombre de usuario para unirte!',
                    { autoClose: false }
                );
                return;
            }
            setIsQuestionRunning(true);
            setShowScores(false);
            setIsDisabled(false);
        });
    }
};
export default questionStartedHandler;
