'use client';
const firstDataHandler = (socket, setQuizData) => {
    if (socket) {
        socket.on('firstData', (data) => {
            const isMaster = window.localStorage.getItem('isMaster') || false;
            if (isMaster) return;
            setQuizData((prev) => {
                return { ...prev, ...data };
            });
        });
    }
};
export default firstDataHandler;
