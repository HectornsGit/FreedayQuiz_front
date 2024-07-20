const restartTimeSession = (socket, quizId) => {
    if (socket) {
        let time;
        socket.on('needToRestartSession', () => {
            do {
                time = prompt(
                    'Por favor, introduce el tiempo de la sesión en minutos'
                );
                if (isNaN(parseInt(time))) {
                    alert('Debes introducir un número válido');
                } else if (parseInt(time) <= 0) {
                    alert('Debes introducir un número mayor que 0');
                } else if (parseInt(time) >= 1440) {
                    alert('El tiempo de sesión no puede superar 24 horas');
                } else {
                    break;
                }
            } while (time !== Number(time));

            socket.emit('startSession', time, quizId);
        });
    }
};
export default restartTimeSession;
