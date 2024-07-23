'use client';
import MatchComponentAsManager from '@/components/MatchComponents/Manager/MatchComponentAsManager';
import PlayerPrueba from '@/components/PlayerPrueba';
import useQuizLogic from '@/quizEngine/hooks/useQuizLogic';

const Page = () => {
    const {
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
        previousQuestionHandler,
        handleAnswerSubmit,
        handleStartQuiz,
        handleInitialPlayerData,
        question,
        quizData,
        loggedUserId,
        setNickName,
        nickName,
        error,
        playerData,
        shuffledQuestionResponses,
        isQuestionRunning,
        initQuestion,
        timeLeft,
        showScores,
        showScoresHandler,
        isDisabled,
        initialPlayerData,
        socket,
        connectedClients,
        sessionRecovery,
        startNewPlayer,
        isNameSetted,
        signOutHandler,
        recoverySession,
        sessionTime,
        setSessionTimeHandler,
        sessionTimeLeft,
        deleteQuestionHandler,
        clickedResponses,
        getQuestionFromList,
        startRandomQuestion,
    } = useQuizLogic();

    const managerProps = {
        signOutHandler,
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
        previousQuestionHandler,
        handleAnswerSubmit,
        handleStartQuiz,
        question,
        quizData,
        loggedUserId,
        playerData,
        shuffledQuestionResponses,
        initQuestion,
        timeLeft,
        showScoresHandler,
        connectedClients,
        isQuestionRunning,
        showScores,
        sessionTime,
        setSessionTimeHandler,
        sessionTimeLeft,
        deleteQuestionHandler,
        getQuestionFromList,
        startRandomQuestion,
    };
    const playerProps = {
        signOutHandler,
        handleInitialPlayerData,
        quizData,
        question,
        playerData,
        shuffledQuestionResponses,
        handleAnswerSubmit,
        nickName,
        setNickName,
        isQuestionRunning,
        timeLeft,
        showScores,
        isDisabled,
        initialPlayerData,
        socket,
        connectedClients,
        sessionRecovery,
        startNewPlayer,
        isNameSetted,
        recoverySession,
        clickedResponses,
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="h-fit flex flex-col items-center content-center gap-8 text-center mb-14">
            {loggedUserId && loggedUserId == quizData?.owner_id ? (
                <MatchComponentAsManager managerProps={managerProps} />
            ) : (
                <PlayerPrueba playerProps={playerProps} />
            )}
        </section>
    );
};

export default Page;
