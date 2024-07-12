import { toast } from 'react-toastify'

const timeUpHandler = (socket, setIsDisabled) => {
    if (socket) {
        socket.on('timeUp', () => {
            setIsDisabled(true)
            toast.success('Fin del tiempo')
        })
    }
}
export default timeUpHandler
