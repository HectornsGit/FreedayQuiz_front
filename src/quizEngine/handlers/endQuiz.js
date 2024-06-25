const endQuiz = async (quizData, socket, quizId) => {
    const numberOfQuestions = quizData.questions?.length
    if (socket) {
        socket.emit('endQuiz', quizId, numberOfQuestions)
    }
}
export default endQuiz
