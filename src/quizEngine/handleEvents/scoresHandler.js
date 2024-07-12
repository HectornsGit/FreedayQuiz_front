const scoresHandler = (socket, setIsQuestionRunning, setShowScores) => {
    if (socket) {
        socket.on('scores', () => {
            setIsQuestionRunning(false)
            setShowScores(true)
        })
    }
}

export default scoresHandler
