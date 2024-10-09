const showScoresHandler = (socket, quizId, playerData) => {
    try {
        const states = {
            isQuestionRunning: false,
            showScores: true,
            isDisabled: true,
        };

        if (socket) {
            socket.emit('showScores', quizId, states);
            socket.emit('closeQuestionInterval', quizId);
        }
    } catch (error) {
        console.error(`Error in showScoresHandler: ${error.message}`);
    }
};
export default showScoresHandler;
