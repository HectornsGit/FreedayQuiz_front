const timerUpdate = (socket, setTimeLeft) => {
    if (socket) {
        socket.on('timerUpdate', (timeLeft) => {
            setTimeLeft(timeLeft)
        })
    }
}
export default timerUpdate
