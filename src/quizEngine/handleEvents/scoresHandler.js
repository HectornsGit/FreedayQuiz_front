const scoresHandler = (
    socket,
    setIsQuestionRunning,
    setShowScores,
    setClickedResponses
) => {
    if (socket) {
        socket.on('scores', (hitsResults) => {
            setIsQuestionRunning(false)
            setShowScores(true)
            setClickedResponses(hitsResults)
        })
    }
}

export default scoresHandler
