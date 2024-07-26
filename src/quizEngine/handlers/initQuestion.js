import { toast } from 'react-toastify';

const initQuestion = (
    socket,
    quizId,
    question,
    setQuestionsExecuted,
    questionsExecuted
) => {
    const states = {
        isQuestionRunning: true,
        showScores: false,
        isDisabled: false,
    };

    const alreadyExecutedQuestion = questionsExecuted?.find(
        (item) => item == question.questionNumber
    );

    if (alreadyExecutedQuestion) {
        let confirm = window.confirm(
            'Esa pregunta ya ha sido ejecutada, ¿quiere repertirla?'
        );
        if (!confirm) return;
    }

    if (question) {
        setQuestionsExecuted((prev) => [...prev, question.questionNumber]);
    }

    if (socket && question) {
        socket.emit('startQuestion', quizId, states);
    } else {
        toast.warning(
            'No hay preguntas seleccionadas. Por favor, pulsa en "Siguiente pregunta"'
        );
    }
};
export default initQuestion;
