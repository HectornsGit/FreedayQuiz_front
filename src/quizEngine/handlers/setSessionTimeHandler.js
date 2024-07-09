const setSessionTimeHandler =
    (socket, setSessionTime, quizId, number_of_questions) => (e) => {
        e.preventDefault()
        const duration = e.target.elements.session.value
        if (duration != Number(duration)) {
            alert('El campo debe ser un número')
            return
        }
        if (duration > 1440) {
            alert('El tiempo de sesión no puede superar 24 horas')
            return
        }
        window.localStorage.setItem('QuizSessionDuration', duration)
        setSessionTime(duration)
        socket.emit('startSession', duration, quizId, number_of_questions)
    }
export default setSessionTimeHandler
