import { toast } from 'react-toastify';

const updateQuestionDataInBackend =
    (_setQuestion, socket, quizId, question, setIsInput) => (e) => {
        e.preventDefault();
        if (!question) {
            toast.error(
                'Aún no hay preguntas. Trae la primera clicando en "Start quiz" '
            );
            return;
        }
        const form = e.target;
        const datafromForm = {
            question: form.elements.question.value,
            questionTime: form.elements.questionTime.value,
            optionA: form.elements.optionA.value,
            optionB: form.elements.optionB.value,
            optionC: form.elements.optionC.value,
            correctAnswer: form.elements.correctAnswer.value,
        };
        const updatedData = {};
        for (const [key, value] of Object.entries(datafromForm)) {
            if (value !== '') {
                updatedData[key] = value;
            }
        }
        const finalData = { ...question, ...updatedData };
        setIsInput(false);
        if (socket) {
            socket.emit('updateQuestionData', quizId, finalData);
        }
    };

export default updateQuestionDataInBackend;
