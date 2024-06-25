import { toast } from 'react-toastify'

const updateQuizDataInBackend = (quizData, socket, quizId) => (e) => {
    e.preventDefault()
    if (socket) {
        socket.emit('updateQuizData', quizId, quizData)
        socket.once('quizUpdatedMessage', (data) => toast.success(data.message))
    }
}
export default updateQuizDataInBackend
