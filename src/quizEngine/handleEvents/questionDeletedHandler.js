import { toast } from 'react-toastify';

const questionDeletedHandler = (
    question,
    quizData,
    socket,
    quizId,
    setQuizData
) => {
    if (socket) {
        socket.on('questionDeleted', (data) => {
            toast.success(data.message);

            //Lógica para actualizar la lista desplegable de preguntas:
            const newListOfQuestions = quizData.list_of_questions.filter(
                (question) => question.number !== data.questionNumber
            );
            const newQuizData = {
                ...quizData,
                list_of_questions: newListOfQuestions,
                number_of_questions: newListOfQuestions.length,
            };
            setQuizData(newQuizData);

            //Ahora preparamos los datos para actualizar la siguiente pregunta:
            const nextQuestion = question?.questionNumber + 1;
            const numberOfQuestions = quizData.number_of_questions;

            if (socket && question && quizId) {
                socket.emit(
                    'nextQuestion',
                    quizId,
                    nextQuestion,
                    numberOfQuestions
                );
            } else {
                toast.warning('Esta era la última pregunta.');
            }
        });
    }
};
export default questionDeletedHandler;
