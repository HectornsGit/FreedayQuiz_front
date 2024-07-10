const endQuiz = async (quizData, socket, quizId, questionsToDelete) => {
    const confirmation = window.confirm(
        '¿Estás seguro de que quieres finalizar el quiz?'
    )
    if (!confirmation) return
    const numberOfQuestions = quizData.number_of_questions
    if (socket) {
        socket.emit('closeSessionIntervals', quizId)
        socket.emit('endQuiz', quizId, numberOfQuestions, questionsToDelete)
    }
}
export default endQuiz
