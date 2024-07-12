const sessionTimeLeftHandler = (socket, setSessionTimeLeft) => {
    if (socket) {
        socket.on('sessionTimeLeft', (time) => {
            setSessionTimeLeft(time)
        })
    }
}
export default sessionTimeLeftHandler
