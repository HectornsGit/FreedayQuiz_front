import { toast } from 'react-toastify'

const connectHandler = (socketInstance, setJoinedQuiz, quizId, playerId) => {
    socketInstance.on('connect', () => {
        //Se envía el quizId al back para unir a los jugadores a una sala:

        socketInstance.emit('joinRoom', quizId)

        //Se manejan los casos de conexión y reconexión:
        if (socketInstance.recovered) {
            console.log('Reconnected to server')
            toast.success('Reconnected to server')
            setJoinedQuiz(true)
            socketInstance.emit('requestRecoveryData', quizId)
        } else {
            console.log('Connected to server')
            toast.success('Connected to server')
            setJoinedQuiz(true)
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
