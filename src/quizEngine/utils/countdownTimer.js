const countdownTimer = (time, socket) => {
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
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
        }
    });
};

export default countdownTimer;
