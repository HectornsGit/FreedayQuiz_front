import { toast } from 'react-toastify'

const timeUpHandler = (socket) => {
    if (socket) {
        socket.on('timeUp', () => {
            toast.success('Fin del tiempo')
        })
    }
}
export default timeUpHandler
