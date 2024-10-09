const resumeQuestion = (socket, quizId, newQuestionTime) => {
    const states = {
        isQuestionRunning: true,
        showScores: false,
        isDisabled: false,
    };
    if (socket) {
        socket.emit('startQuestion', quizId, states, {
            newQuestionTime,
        });
    }
};
export default resumeQuestion;
