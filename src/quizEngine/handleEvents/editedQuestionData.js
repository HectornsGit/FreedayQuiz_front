import { toast } from 'react-toastify'
const editedQuestionData = (
    socket,
    setQuestionData,
    loggedUserId,
    quizData
) => {
    if (socket) {
        socket.on(
            socket.on('questionUpdatedMessage', (data) => {
                if (data.status === 'ok') {
                    setQuestionData(data.questionUpdated)
                    if (loggedUserId && loggedUserId == quizData.owner_id) {
                        toast.success(data.message)
                    }
                } else {
                    if (loggedUserId && loggedUserId == quizData.owner_id) {
                        toast.error(data.message)
                    }
                }
            })
        )
    }
}
export default editedQuestionData
