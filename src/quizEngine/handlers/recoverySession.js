const recoverySession = (socket, quizId) => {
    if (socket) {
        socket.emit('requestRecoveryData', quizId)
    }
}
export default recoverySession
