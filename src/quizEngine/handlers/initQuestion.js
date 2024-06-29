import { toast } from 'react-toastify'

const initQuestion = (socket, quizId, question) => {
    if (socket && question) {
        socket.emit('startQuestion', quizId)
    } else {
        toast.warning(
            'No hay preguntas seleccionadas. Por favor, pulsa en "Nueva pregunta"'
        )
    }
}
export default initQuestion
