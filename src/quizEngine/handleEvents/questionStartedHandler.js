'use client';
import { toast } from 'react-toastify';
import { getItemWithExpiry } from '../utils';

const questionStartedHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setIsDisabled,
    setPlayerData
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

            //Esto es para que se resetée la última respuesta al iniciar otra, y evitar que envíe la anterior en caso de que el jugador no responda a la pregunta en curso:
            setPlayerData((prev) => {
                return prev.map((player) => ({
                    ...player,
                    lastAnswerText: 0,
                }));
            });
        });
    }
};
export default questionStartedHandler;
