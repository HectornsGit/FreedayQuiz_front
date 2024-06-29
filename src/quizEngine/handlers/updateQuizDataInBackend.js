const updateQuizDataInBackend =
    (quizData, socket, quizId, setQuizData) => (e) => {
        e.preventDefault()
        if (socket) {
            socket.emit('updateQuizData', quizId, quizData)
        }
    }
export default updateQuizDataInBackend
