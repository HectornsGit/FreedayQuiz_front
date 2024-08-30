'use client';
import { getItemWithExpiry } from '../utils';
import { toast } from 'react-toastify';

const scoresHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setClickedResponses,
    setInitialPlayerData,
    sessionRecovery,
    setNumberAnswersPerQuestion
) => {
    if (socket) {
        socket.on('scores', () => {
            const playerName = getItemWithExpiry('playerName');
            const isMaster = getItemWithExpiry('isMaster');
            //Reseteamos el número de respuestas por pregunta:
            setNumberAnswersPerQuestion(0);
            //Borro datos en localstorage del estado de los botones:
            window.localStorage.removeItem('isDisabled');

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

            if (!isMaster && !sessionRecovery) {
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
