import { toast } from 'react-toastify'
const noMoreQuestionsHandler = (socket) => {
    if (socket) {
        socket.once('noMoreQuestions', () => {
            toast.warning('Ya no hay más preguntas')
        })
    }
}

export default noMoreQuestionsHandler
