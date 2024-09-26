const countDown = (socket, setAutomaticCountDown, quizId) => {
    if (socket) {
        socket.on('countDown', (timeLeft) => {
            setAutomaticCountDown(timeLeft);
        });
    }
};
export default countDown;
