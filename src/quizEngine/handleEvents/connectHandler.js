import { toast } from 'react-toastify'
const connectHandler = (socketInstance, setJoinedQuiz, quizId) => {
    socketInstance.on('connect', () => {
        if (socketInstance.recovered) {
            console.log('Reconnected to server')
            toast.success('Reconnected to server')
            setJoinedQuiz(true)
            socketInstance.emit('sendQuizId', quizId)
        } else {
            console.log('Connected to server')
            toast.success('Connected to server')
            setJoinedQuiz(true)
            socketInstance.emit('sendQuizId', quizId)
        }
        // Esto es para simular que el cliente se desconecta del servidor sin usar socket.disconnect:
        // setTimeout(() => {
        //     if (socketInstance.io.engine) {
        //         socketInstance.io.engine.close()
        //     }
        // }, 10000)
    })
}

export default connectHandler
