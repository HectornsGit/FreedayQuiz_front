const requestSetWinnerOn = (socket, quizId) => (e) => {
    e.preventDefault();

    if (socket) {
        socket.emit('requestSetWinnerOn', quizId);
    }
};
export default requestSetWinnerOn;
