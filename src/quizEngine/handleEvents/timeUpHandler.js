'use client';
import { toast } from 'react-toastify';

const timeUpHandler = (socket, setIsDisabled) => {
    const playerName = window.localStorage.getItem('playerName');
    if (socket && playerName) {
        socket.on('timeUp', () => {
            setIsDisabled(true);
            toast.success('Fin del tiempo');
        });
    }
};
export default timeUpHandler;
