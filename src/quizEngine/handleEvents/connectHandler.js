import { toast } from 'react-toastify';
import { getItemWithExpiry } from '../utils';

const connectHandler = (
    socketInstance,
    setJoinedQuiz,
    quizId,
    _playerId,
    _loggedUserId
) => {
    socketInstance.on('connect', () => {
        //Se envía el quizId al back para unir a los jugadores a una sala:
        socketInstance.emit('joinRoom', quizId);
        const isMaster = getItemWithExpiry('isMaster');
        const sessionTime = getItemWithExpiry('QuizSessionDuration');

        //Si el tiempo de la sesión de cerró por fallo del servidor, el master envía petición de restablecer:
        if (isMaster && sessionTime) {
            if (socketInstance) {
                socketInstance.emit('restartSessionTime', quizId);
            }
        }

        //Se manejan los casos de conexión y reconexión:
        if (socketInstance.recovered) {
            console.log('Reconnected to server');
            toast.success('Reconnected to server');
            setJoinedQuiz(true);
        } else {
            console.log('Connected to server');
            // toast.success('Connected to server');
            setJoinedQuiz(true);
        }
        // Esto es para simular que el cliente se desconecta del servidor sin usar socket.disconnect:
        setTimeout(() => {
            if (socketInstance.io.engine) {
                socketInstance.io.engine.close();
            }
        }, 10000);
    });
};

export default connectHandler;
