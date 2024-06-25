import { useCallback } from 'react'

export const useQuizHandlers = ({
    socket,
    quizId,
    question,
    initialPlayerData,
    playerData,
    setPlayerData,
    playerId,
    nickName,
    setInitialPlayerData,
    loggedUserId,
}) => {
    const handleAnswerSubmitted = useCallback(
        (backData) => {
            setPlayerData((prevPlayerData) =>
                prevPlayerData.map((frontData) => {
                    if (frontData.id === backData.id) {
                        return { ...frontData, totalScore: backData.totalScore }
                    }
                    return frontData
                })
            )
        },
        [setPlayerData]
    )

    const handleAnswerSubmit = useCallback(
        (response) => {
            if (socket) {
                socket.emit('submitAnswer', {
                    quizId,
                    questionId: question.id,
                    questionNumber: question.questionNumber,
                    answer: response,
                    playerId: initialPlayerData[0].id,
                })
            }
        },
        [socket, quizId, question, initialPlayerData]
    )

    const handleInitialPlayerData = useCallback(() => {
        const initialPlayer = {
            id: playerId,
            name: nickName,
            totalScore: 0,
        }

        setInitialPlayerData((prevPlayerData) => [
            ...prevPlayerData,
            initialPlayer,
        ])

        if (socket) {
            socket.emit('joinQuiz', playerId, quizId, initialPlayer)
        }
    }, [socket, playerId, nickName, quizId, setInitialPlayerData])

    const handleStartQuiz = useCallback(() => {
        if (socket) {
            socket.emit('startQuiz', loggedUserId, quizId)
        }
    }, [socket, loggedUserId, quizId])

    return {
        handleAnswerSubmitted,
        handleAnswerSubmit,
        handleInitialPlayerData,
        handleStartQuiz,
    }
}
