'use client';
import { toast } from 'react-toastify';
import { calculateResults } from '../utils';

const timeUpHandler = (socket, setIsDisabled, playerData, quizId) => {
    const playerName = window.localStorage.getItem('playerName');
    const isMaster = window.localStorage.getItem('isMaster');
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
