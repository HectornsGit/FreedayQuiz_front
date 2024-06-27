const sendUpdatedQuizData = (
    socket,
    setPlayerData,
    setQuizData,
    setQuestion
) => {
    if (socket) {
        socket.on(
            'sendUpdatedQuizData',
            (backPlayersData, backQuizData, currentQuestion) => {
                setPlayerData(backPlayersData)
                setQuizData(backQuizData)
                setQuestion(currentQuestion)
            }
        )
    }
}
export default sendUpdatedQuizData
