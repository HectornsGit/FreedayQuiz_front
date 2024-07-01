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
        socket.on(
            'sendRecoveryQuizData',
            (backPlayersData, backQuizData, currentQuestion, updatedStates) => {
                console.log(updatedStates)
                setPlayerData(backPlayersData)
                setQuizData(backQuizData)
                setQuestion(currentQuestion)
                // setIsQuestionRunning(updatedStates.isQuestionRunning)
                // setShowScores(updatedStates.showScores)
                // setIsDisabled(updatedStates.isDisabled)
            }
        )
    }
}
export default sendUpdatedQuizData
