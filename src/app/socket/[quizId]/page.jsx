'use client'
import MasterPrueba from '@/components/MasterPrueba'
import PlayerPrueba from '@/components/PlayerPrueba'
import useQuizLogic from '@/quizEngine/hooks/useQuizLogic'

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
    } = useQuizLogic()

    const masterProps = {
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
    }
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
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {' '}
            {loggedUserId && loggedUserId == quizData?.owner_id ? (
                <MasterPrueba masterProps={masterProps} />
            ) : (
                <PlayerPrueba playerProps={playerProps} />
            )}
        </>
    );
};

export default Page;
