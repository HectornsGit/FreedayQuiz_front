'use client';
import { toast } from 'react-toastify';

const questionStartedHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setIsDisabled
) => {
    if (socket) {
        socket.on('questionStarted', () => {
            const playerName = window.localStorage.getItem('playerName');
            const isMaster = window.localStorage.getItem('isMaster');

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
