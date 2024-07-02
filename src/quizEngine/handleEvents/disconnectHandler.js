import { toast } from 'react-toastify'
const disconnectHandler = (socket) => {
    if (socket) {
        socket.on('disconnect', () => {
            console.log(socket.id, 'Disconnected from server')
            toast.warning('Disconnected from server')
        })
    }
}

export default disconnectHandler
