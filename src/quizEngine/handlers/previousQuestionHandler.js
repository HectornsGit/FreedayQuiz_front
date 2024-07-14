import { toast } from 'react-toastify'

toast
const previousQuestionHandler = (question, quizData, socket, quizId) => {
    const nextQuestion = question?.questionNumber - 1
    const numberOfQuestions = quizData.number_of_questions

    if (socket && question && quizId) {
        socket.emit(
            'nextQuestion',
            quizId,
            nextQuestion,
            numberOfQuestions,
            'backward'
        )
    } else {
        toast.warning('No hay preguntas.')
    }
}
export default previousQuestionHandler
