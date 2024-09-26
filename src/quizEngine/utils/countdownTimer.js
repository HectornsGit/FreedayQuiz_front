const countdownTimer = (time) => {
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            console.log(`Iniciando nueva pregunta en ${time}`);
            time--;

            if (time < 0) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);
    });
};
export default countdownTimer;
