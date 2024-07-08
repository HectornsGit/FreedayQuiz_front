import { toast } from 'react-toastify'
const noMoreQuestionsHandler = (socket) => {
    if (socket) {
        socket.on('noMoreQuestions', () => {
            toast.warning('Ya no hay más preguntas')
        })
    }
}

export default noMoreQuestionsHandler
