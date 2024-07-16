const quizDataHandler = (
    socket,
    setQuizData,
    setPlayerData,
    setQuestion,
    loggedUserId,
    setIsMasterOnline
) => {
    if (socket) {
        socket.on('quizData', (data, playersData, currentQuestion) => {
            setIsMasterOnline(true);
            if (loggedUserId && data.owner_id == loggedUserId) {
                window.localStorage.setItem('isMaster', true);
                setQuizData(data);
                if (playersData.length > 0) setPlayerData(playersData);
                if (currentQuestion) setQuestion(currentQuestion);
            }
            if (!loggedUserId || loggedUserId != data.owner_id) {
                setQuizData(data);
            }
        });
    }
};
export default quizDataHandler;
