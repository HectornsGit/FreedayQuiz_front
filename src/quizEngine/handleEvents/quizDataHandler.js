const quizDataHandler = (socket, setQuizData) => {
    if (socket) {
        socket.on('quizData', (data) => {
            setQuizData(data)
        })
    }
}
export default quizDataHandler
