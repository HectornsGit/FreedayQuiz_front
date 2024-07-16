'use client';
import { getItemWithExpiry } from '../utils';
import { toast } from 'react-toastify';
import { calculateResults } from '../utils';

const timeUpHandler = (socket, setIsDisabled, playerData, quizId) => {
    const playerName = getItemWithExpiry('playerName');
    const isMaster = getItemWithExpiry('isMaster');

    if (socket && playerName) {
        socket.on('timeUp', () => {
            setIsDisabled(true);
            toast.success('Fin del tiempo');
        });
    }
    if (socket && isMaster) {
        socket.on('timeUp', () => {
            const hitsResults = calculateResults(playerData);
            socket.emit('sendResults', quizId, hitsResults);
        });
    }
};
export default timeUpHandler;
