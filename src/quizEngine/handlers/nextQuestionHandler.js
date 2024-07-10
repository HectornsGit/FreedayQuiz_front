import { toast } from 'react-toastify'

const nextQuestionHandler = async (question, quizData, socket, quizId) => {
    const nextQuestion = question?.questionNumber + 1
    const numberOfQuestions = quizData.number_of_questions

    if (socket && question && quizId) {
        socket.emit(
            'nextQuestion',
            quizId,
            nextQuestion,
            numberOfQuestions,
            'forward'
        )
    } else {
        toast.warning(
            'No hay preguntas. Clica en "Start Quiz" para traer la primera'
        )
    }
}
export default nextQuestionHandler
