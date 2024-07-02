const getQuizDataHandler = (socket, quizId, loggedUserId) => {
    if (socket && quizId && loggedUserId) {
        socket.emit('getQuizData', quizId, loggedUserId)
    }
}

export default getQuizDataHandler
