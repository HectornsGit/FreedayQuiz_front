import { toast } from 'react-toastify'
const disconnectHandler = (socket, playerId) => {
    if (socket) {
        socket.on('disconnect', () => {
            toast.warning('Disconnected from server')
        })
    }
}

export default disconnectHandler
