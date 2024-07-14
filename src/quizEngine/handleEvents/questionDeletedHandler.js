import { toast } from 'react-toastify'

const questionDeletedHandler = (question, quizData, socket, quizId) => {
    if (socket) {
        socket.on('questionDeleted', (message) => {
            toast.success(message.message)

            const nextQuestion = question?.questionNumber + 1
            const numberOfQuestions = quizData.number_of_questions

            if (socket && question && quizId) {
                socket.emit(
                    'nextQuestion',
                    quizId,
                    nextQuestion,
                    numberOfQuestions
                )
            } else {
                toast.warning('Esta era la última pregunta.')
            }
        })
    }
}
export default questionDeletedHandler
