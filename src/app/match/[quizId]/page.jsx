'use client'
import MatchComponentAsManager from '@/components/MatchComponents/Manager/MatchComponentAsManager'
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
        initialPlayerData,
        socket,
        connectedClients,
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
        connectedClients,
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
        initialPlayerData,
        socket,
        connectedClients,
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <section className="h-fit flex flex-col w-full  items-center content-center gap-8 text-center mb-14">
            {loggedUserId && loggedUserId == quizData?.owner_id ? (
                <MatchComponentAsManager managerProps={masterProps} />
            ) : (
                <PlayerPrueba playerProps={playerProps} />
            )}
        </section>
    )
}

export default Page
