const endQuiz = async (quizData, socket, quizId) => {
    const numberOfQuestions = quizData.number_of_questions
    if (socket) {
        socket.emit('endQuiz', quizId, numberOfQuestions)
    }
}
export default endQuiz
