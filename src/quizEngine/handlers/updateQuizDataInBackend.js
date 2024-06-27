import { toast } from 'react-toastify'

const updateQuizDataInBackend = (quizData, socket, quizId) => (e) => {
    e.preventDefault()
    if (socket) {
        socket.emit('updateQuizData', quizId, quizData)
        socket.on('quizUpdatedMessage', (data) => {
            if (data.status === 'ok') {
                toast.success(data.message)
            } else toast.error(data.message)
        })
    }
}
export default updateQuizDataInBackend
