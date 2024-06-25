import { toast } from 'react-toastify'

const nextQuestionHandler = async (question, quizData, socket, quizId) => {
    const nextQuestion = question?.questionNumber + 1
    const numberOfQuestions = quizData?.questions.length
    if (socket && question && quizId) {
        socket.emit('nextQuestion', quizId, nextQuestion, numberOfQuestions)
    } else {
        toast.warning(
            'No hay preguntas. Clica en "Start Quiz" para traer la primera'
        )
    }
}
export default nextQuestionHandler
