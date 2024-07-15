'use client';
import { toast } from 'react-toastify';

const scoresHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setClickedResponses
) => {
    if (socket) {
        socket.on('scores', (hitsResults) => {
            const playerName = window.localStorage.getItem('playerName');
            const isMaster = window.localStorage.getItem('isMaster');

            if (!playerName && !isMaster) {
                toast.warning(
                    '¡El quiz ha comenzado!, ¡Introduce tu nombre de usuario para unirte!',
                    { autoClose: false }
                );
                return;
            }
            setIsQuestionRunning(false);
            setShowScores(true);
            setClickedResponses(hitsResults);
        });
    }
};

export default scoresHandler;
