import { toast } from 'react-toastify'
const connectHandler = (socketInstance, setJoinedQuiz) => {
    socketInstance.on('connect', () => {
        console.log('Connected to server')
        toast.success('Connected to server')
        setJoinedQuiz(true)
    })
}

export default connectHandler
