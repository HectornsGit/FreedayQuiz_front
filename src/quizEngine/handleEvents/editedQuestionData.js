import { toast } from 'react-toastify'
const editedQuestionData = (socket, setQuestionData) => {
    if (socket) {
        socket.on(
            socket.on('questionUpdatedMessage', (data) => {
                if (data.status === 'ok') {
                    setQuestionData(data.questionUpdated)
                    toast.success(data.message)
                } else toast.error(data.message)
            })
        )
    }
}
export default editedQuestionData
