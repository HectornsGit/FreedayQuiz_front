import { selectRandomQuestion } from '../utils';

const startRandomAutomaticQuestion = (
    socket,
    setQuestionsExecuted,
    questionsExecuted,
    numberOfQuestions,
    quizId,
    list_of_questions,
    newQuestionTime
) => {
    const states = {
        isQuestionRunning: true,
        showScores: false,
        isDisabled: false,
    };
    const { randomQuestionNumber, validNumbers } = selectRandomQuestion(
        numberOfQuestions,
        questionsExecuted,
        list_of_questions
    );
    if (!randomQuestionNumber) return;

    setQuestionsExecuted((prev) => [...prev, randomQuestionNumber]);

    if (socket) {
        socket.emit('nextQuestion', quizId, randomQuestionNumber, null);
        socket.emit('startQuestion', quizId, states, {
            randomQuestionNumber,
            validNumbers,
            newQuestionTime,
        });
    }
};
export default startRandomAutomaticQuestion;
