import { setItemWithExpiry } from '../utils';
const quizDataHandler = (
    socket,
    setQuizData,
    setPlayerData,
    setQuestion,
    loggedUserId,
    setIsMasterOnline,
    setQuestionsExecuted
) => {
    if (socket) {
        socket.on(
            'quizData',
            (data, playersData, currentQuestion, executedQuestions) => {
                setIsMasterOnline(true);
                if (loggedUserId && data.owner_id == loggedUserId) {
                    setItemWithExpiry('isMaster', true, 12);
                    window.localStorage.removeItem('idNewPlayer');
                    setQuizData(data);
                    if (executedQuestions)
                        setQuestionsExecuted(executedQuestions);
                    if (playersData.length > 0) setPlayerData(playersData);
                    if (currentQuestion) setQuestion(currentQuestion);
                }
                if (!loggedUserId || loggedUserId != data.owner_id) {
                    setQuizData(data);
                }
            }
        );
    }
};
export default quizDataHandler;
