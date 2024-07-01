const questionStartedHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setIsDisabled
) => {
    if (socket) {
        socket.on('questionStarted', () => {
            setIsQuestionRunning(true)
            setShowScores(false)
            setIsDisabled(false)
        })
    }
}
export default questionStartedHandler
