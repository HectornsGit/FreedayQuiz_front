import { toast } from 'react-toastify'
const disconnectHandler = (socket) => {
    if (socket) {
        socket.on('disconnect', () => {
            console.log('Disconnected from server')
            toast.warning('Disconnected from server')
        })
    }
}

export default disconnectHandler
