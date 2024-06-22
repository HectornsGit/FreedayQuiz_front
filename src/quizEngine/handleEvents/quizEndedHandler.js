import { toast } from 'react-toastify'

const quizEndedHandler = (socket, router) => {
    if (socket) {
        socket.on('quizEnded', (message) => {
            toast.success(message.message)
            router.push('/')
        })
    }
}
export default quizEndedHandler
