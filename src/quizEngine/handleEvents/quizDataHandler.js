const quizDataHandler = (socket, setQuizData, setPlayerData, setQuestion) => {
    if (socket) {
        socket.on('quizData', (data, playersData, currentQuestion) => {
            setQuizData(data)
            if (playersData.length > 0) setPlayerData(playersData)
            if (currentQuestion) setQuestion(currentQuestion)
        })
    }
}
export default quizDataHandler
