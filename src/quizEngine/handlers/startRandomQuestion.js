import { selectRandomQuestion } from '../utils';
const startRandomQuestion = (
    socket,
    setQuestionsExecuted,
    questionsExecuted,
    numberOfQuestions,
    quizId,
    list_of_questions
) => {
    const states = {
        isQuestionRunning: true,
        showScores: false,
        isDisabled: false,
    };
    const randomQuestionNumber = selectRandomQuestion(
        numberOfQuestions,
        questionsExecuted,
        list_of_questions
    );
    if (!randomQuestionNumber) return;

    setQuestionsExecuted((prev) => [...prev, randomQuestionNumber]);

    if (socket) {
        socket.emit('nextQuestion', quizId, randomQuestionNumber, null);
        socket.emit('startQuestion', quizId, states);
    }
};
export default startRandomQuestion;
