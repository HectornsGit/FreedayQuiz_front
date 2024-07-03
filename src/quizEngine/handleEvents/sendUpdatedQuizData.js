const sendUpdatedQuizData = (
    socket,
    setPlayerData,
    setQuizData,
    setQuestion,
    setIsQuestionRunning,
    setShowScores,
    setIsDisabled
) => {
    if (socket) {
        socket.once(
            'sendRecoveryQuizData',
            (backPlayersData, backQuizData, currentQuestion, updatedStates) => {
                setIsQuestionRunning(updatedStates.isQuestionRunning)
                setShowScores(updatedStates.showScores)
                setIsDisabled(updatedStates.isDisabled)
                setInterval(() => {
                    setPlayerData(backPlayersData)
                    setQuizData(backQuizData)
                    setQuestion(currentQuestion)
                }, 0)
            }
        )
    }
}
export default sendUpdatedQuizData
