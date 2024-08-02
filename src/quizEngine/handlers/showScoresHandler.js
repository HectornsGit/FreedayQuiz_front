const showScoresHandler = (socket, quizId, playerData) => {
    const states = {
        isQuestionRunning: false,
        showScores: true,
        isDisabled: true,
    };

    if (socket) {
        socket.emit('showScores', quizId, states);
        socket.emit('closeQuestionInterval', quizId);
    }
};
export default showScoresHandler;
