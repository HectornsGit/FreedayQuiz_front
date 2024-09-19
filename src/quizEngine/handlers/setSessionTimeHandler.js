import { setItemWithExpiry } from '../utils';
const setSessionTimeHandler =
    (socket, setSessionTime, quizId, number_of_questions, setIsClockInput) =>
    (e) => {
        e.preventDefault();
        const duration = e.target.elements.session.value;
        if (duration != Number(duration)) {
            alert('El campo debe ser un número');
            return;
        }
        if (duration > 1440) {
            alert('El tiempo de sesión no puede superar 24 horas');
            return;
        }
        if (duration <= 0) {
            alert('Debes introducir un número mayor que 0');
            return;
        }

        setItemWithExpiry('QuizSessionDuration', duration, 2);
        setSessionTime(duration);
        setIsClockInput(false);
        socket.emit('startSession', duration, quizId, number_of_questions);
    };
export default setSessionTimeHandler;
