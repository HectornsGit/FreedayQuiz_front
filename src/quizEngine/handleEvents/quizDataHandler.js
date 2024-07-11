const quizDataHandler = (
    socket,
    setQuizData,
    setPlayerData,
    setQuestion,
    loggedUserId
) => {
    if (socket) {
        socket.on('quizData', (data, playersData, currentQuestion) => {
            if (loggedUserId && data.owner_id == loggedUserId) {
                setQuizData(data)
                if (playersData.length > 0) setPlayerData(playersData)
                if (currentQuestion) setQuestion(currentQuestion)
            }
            if (!loggedUserId || loggedUserId != data.owner_id) {
                setQuizData(data)
            }
        })
    }
}
export default quizDataHandler
