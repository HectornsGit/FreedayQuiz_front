const restartTimeSession = (socket, quizId) => {
    if (socket) {
        socket.on('needToRestartSession', () => {
            const time = prompt(
                'Por favor, introduce el tiempo de la sesión en minutos'
            );
            socket.emit('startSession', time, quizId);
        });
    }
};
export default restartTimeSession;
