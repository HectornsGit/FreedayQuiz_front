import { toast } from 'react-toastify';

const answerMessage = (socket) => {
    if (socket) {
        socket.on('answerSubmittedMessage', (_answer, isCorrect) => {
            //Solo se ejecuta para el juagor que ha respondido:
            // if (isCorrect === 'correct') {
            //     toast.success('Has acertado')
            // } else toast.error('Has fallado')
        });
    }
};
export default answerMessage;
