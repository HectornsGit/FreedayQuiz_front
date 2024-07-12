import { toast } from 'react-toastify'

const initQuestion = (socket, quizId, question) => {
    const states = {
        isQuestionRunning: true,
        showScores: false,
        isDisabled: false,
    }
    if (socket && question) {
        socket.emit('startQuestion', quizId, states)
    } else {
        toast.warning(
            'No hay preguntas seleccionadas. Por favor, pulsa en "Nueva pregunta"'
        )
    }
}
export default initQuestion
