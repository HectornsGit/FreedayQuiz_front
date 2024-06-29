const showScoresHandler = (socket, quizId) => {
    if (socket) {
        socket.emit('showScores', quizId)
    }
}
export default showScoresHandler
