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

        const answerNames = ['optionA', 'optionB', 'optionC'];
        const form = e.target;

        const questionDataFromForm = {
            question: form.elements.question.value,
            questionTime: form.elements.questionTime.value,
        };

        const answersFromForm = {
            optionA: form.elements.optionA?.value,
            optionB: form.elements.optionB?.value,
            optionC: form.elements.optionC?.value,
            optionD: form.elements.optionD?.value,
            correctAnswer: form.elements.correctAnswer?.value,
        };

        const updatedData = {};
        updatedData.correctAnswer =
            answersFromForm[answersFromForm.correctAnswer];
        for (const [key, value] of Object.entries(answersFromForm)) {
            {
                if (key === 'correctAnswer') {
                    continue;
                }
                if (value === updatedData.correctAnswer || value == undefined) {
                    continue;
                }
                updatedData[answerNames[0]] = value;
                answerNames.shift();
            }
        }
        for (const [key, value] of Object.entries(questionDataFromForm)) {
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
