'use client'
import MasterPrueba from '@/components/MasterPrueba'
import PlayerPrueba from '@/components/PlayerPrueba'
import useQuizLogic from '@/quizEngine/hooks/useQuizLogic'
import { signOut } from 'next-auth/react'

const Page = () => {
    const {
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
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
    } = useQuizLogic()

    const masterProps = {
        signOut,
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
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
    }
    const playerProps = {
        signOut,
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
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            {loggedUserId && loggedUserId == quizData?.owner_id ? (
                <MasterPrueba masterProps={masterProps} />
            ) : (
                <PlayerPrueba playerProps={playerProps} />
            )}
        </>
    )
}

export default Page
