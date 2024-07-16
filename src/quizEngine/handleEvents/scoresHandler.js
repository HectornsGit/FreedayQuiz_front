'use client';
import { toast } from 'react-toastify';

const scoresHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setClickedResponses,
    setInitialPlayerData
) => {
    if (socket) {
        socket.on('scores', () => {
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
            setClickedResponses({});
            if (!isMaster) {
                setInitialPlayerData((prevData) => {
                    prevData[0].lastAnswerText = '';
                    prevData[0].lastQuestionNumber = 0;
                    return [...prevData];
                });
            }
        });
    }
};

export default scoresHandler;
