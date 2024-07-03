const endQuiz = async (quizData, socket, quizId) => {
    const confirmation = window.confirm(
        '¿Estás seguro de que quieres finalizar el quiz?'
    )
    if (!confirmation) return
    const numberOfQuestions = quizData.number_of_questions
    if (socket) {
        socket.emit('endQuiz', quizId, numberOfQuestions)
    }
}
export default endQuiz
