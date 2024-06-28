import { toast } from 'react-toastify'
const editedQuizData = (socket, setQuizData) => {
    if (socket) {
        socket.on('quizUpdatedMessage', (data) => {
            if (data.status === 'ok') {
                setQuizData(data.quizUpdated)
                toast.success(data.message)
            } else toast.error(data.message)
        })
    }
}
export default editedQuizData
