'use client'
import { toast } from 'react-toastify'

const quizEndedHandler = (socket, router) => {
    if (socket) {
        socket.on('quizEnded', (message) => {
            window.localStorage.removeItem('idNewPlayer')
            window.localStorage.removeItem('playerName')
            toast.success(message.message)
            socket.disconnect()
            router.push('/')
        })
    }
}
export default quizEndedHandler
