import { toast } from 'react-toastify'
const disconnectHandler = (socket) => {
    if (socket) {
        socket.on('disconnect', () => {
            toast.warning('Disconnected from server')
        })
    }
}

export default disconnectHandler
