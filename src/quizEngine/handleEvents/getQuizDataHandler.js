const getQuizDataHandler = (socket, quizId, loggedUserId, setQuizData) => {
    if (socket && quizId && loggedUserId) {
        socket.emit('getQuizData', quizId, loggedUserId)
        socket.on('quizData', (data) => {
            setQuizData(data)
        })
    }
}

export default getQuizDataHandler
