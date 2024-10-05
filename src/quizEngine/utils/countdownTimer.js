const countdownTimer = (time, socket) => {
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            console.log(`Iniciando nueva pregunta en ${time}`);
            time--;

            if (time < 0) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);

        const handlePause = () => {
            clearInterval(timer);
            resolve();
        };

        if (socket) {
            socket.on('quizPaused', handlePause);

            // Limpieza al desconectar el socket
            socket.on('disconnect', () => {
                clearInterval(timer);
                reject(
                    new Error('Socket desconectado. Temporizador detenido.')
                );
            });
        }
    });
};

export default countdownTimer;
