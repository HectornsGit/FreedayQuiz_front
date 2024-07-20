'use client';
import { getItemWithExpiry } from '../utils';
const firstDataHandler = (socket, setQuizData, quizId) => {
    if (socket) {
        socket.on('firstData', (data) => {
            const isMaster = getItemWithExpiry('isMaster') || false;
            if (isMaster) return;

            setQuizData((prev) => {
                return { ...prev, ...data };
            });
        });
    }
};
export default firstDataHandler;
