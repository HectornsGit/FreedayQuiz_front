const showScoresHandler = (socket, quizId) => {
    const states = {
        isQuestionRunning: false,
        showStates: true,
        isDisabled: true,
    }
    if (socket) {
        socket.emit('showScores', quizId, states)
    }
}
export default showScoresHandler
