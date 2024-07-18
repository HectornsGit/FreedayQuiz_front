import { toast } from 'react-toastify';

const getQuestionFromList = (quizId, socket) => (e) => {
    e.preventDefault();
    const number_of_questions = null;
    const questionNumber = parseInt(e.target.value);
    if (socket && quizId) {
        socket.emit(
            'nextQuestion',
            quizId,
            questionNumber,
            number_of_questions
        );
    } else {
        toast.warning('Pregunta no encontrada');
    }
};
export default getQuestionFromList;
