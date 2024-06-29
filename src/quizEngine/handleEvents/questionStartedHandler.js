const questionStartedHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores
) => {
    if (socket) {
        socket.on('questionStarted', () => {
            setIsQuestionRunning(true)
            setShowScores(false)
        })
    }
}
export default questionStartedHandler
