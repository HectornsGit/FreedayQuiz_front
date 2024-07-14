import { toast } from 'react-toastify'
const editedQuizData = (socket, setQuizData, loggedUserId) => {
    if (socket) {
        socket.on('quizUpdatedMessage', (data) => {
            if (data.status === 'ok') {
                setQuizData(data.quizUpdated)

                if (loggedUserId && data.quizUpdated.owner_id == loggedUserId) {
                    toast.success(data.message)
                }
            } else {
                if (loggedUserId && data.quizUpdated.owner_id == loggedUserId) {
                    toast.error(data.message)
                }
            }
        })
    }
}
export default editedQuizData
