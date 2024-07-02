import { useCallback } from 'react'

export const useQuizHandlers = ({
    socket,
    quizId,
    question,
    initialPlayerData,
    setPlayerData,
    playerId,
    nickName,
    setInitialPlayerData,
    loggedUserId,
    timeLeft,
    setIsDisabled,
}) => {
    const handleAnswerSubmitted = useCallback(
        (backData) => {
            setPlayerData((prevPlayerData) =>
                prevPlayerData.map((frontData) => {
                    if (frontData.id === backData.id) {
                        return {
                            ...frontData,
                            totalScore: backData.totalScore,
                            streak: backData.streak,
                            lastCorrectAnswer: backData.lastCorrectAnswer,
                        }
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
                    totalTime: question.questionTime,
                    timeTaken: question.questionTime - timeLeft,
                })
                setIsDisabled(true)
            }
        },
        [socket, quizId, question, initialPlayerData, timeLeft, setIsDisabled]
    )

    const handleInitialPlayerData = useCallback(() => {
        const initialPlayer = {
            id: playerId,
            name: nickName,
            state: 'online',
            totalScore: 0,
            streak: 0,
            lastCorrectAnswer: 0,
        }

        setInitialPlayerData((prevPlayerData) => [
            ...prevPlayerData,
            initialPlayer,
        ])
        //Guardo el nickName y el id en el socket, para acceder a él en caso necesario:
        socket.Mydata = { name: nickName, id: playerId }
        socket.data = { name: nickName, id: playerId }

        //Se envía petición para sincronizar los datos, por si el quiz está en curso:
        socket.emit('requestRecoveryData', quizId)

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
