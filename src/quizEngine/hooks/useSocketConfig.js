import { io } from 'socket.io-client'
import { useEffect } from 'react'
import {
    connectHandler,
    disconnectHandler,
    errorHandler,
    getQuizDataHandler,
    noMoreQuestionsHandler,
    playerJoinedHandler,
    questionHandler,
    quizEndedHandler,
    answerSubmittedHandler,
    sendUpdatedQuizData,
    editedQuizData,
    editedQuestionData,
    questionStartedHandler,
    timerUpdate,
    timeUpHandler,
    scoresHandler,
    clientsNumberHandler,
    quizDataHandler,
    sessionTimeLeftHandler,
    questionDeletedHandler,
    answerMessage,
} from '../handleEvents'

const useSocketConfig = (argumentsData) => {
    const {
        socket,
        quizId,
        question,
        quizData,
        loggedUserId,
        setQuizData,
        setSocket,
        router,
        setJoinedQuiz,
        setError,
        setPlayerData,
        setQuestion,
        handleAnswerSubmitted,
        setIsQuestionRunning,
        setTimeLeft,
        setShowScores,
        setIsDisabled,
        setConnectedClients,
        playerData,
        sessionRecovery,
        setSessionRecovery,
        setInitialPlayerData,
        playerId,
        setSessionTimeLeft,
        setClickedResponses,
    } = argumentsData

    useEffect(() => {
        //Crear conexión y guardarla en un estado:
        const socketInstance = io(process.env.NEXT_PUBLIC_API_HOST)
        setSocket(socketInstance)

        //Se escucha el estado connect, que es el momento en el que el front se conecta con el back. En ese instante se setea el estado joinedQuiz a true para que no se instancien más conexiones si la página se renderiza nuevamente:
        connectHandler(socketInstance, setJoinedQuiz, quizId, playerId)

        //Aquí recibo los errores del back y los guardo en un estado:
        errorHandler(socketInstance, setError)
        disconnectHandler(socketInstance, playerId)

        // Si el componente se desmonta, se desconecta de la sala
        return () => {
            if (socketInstance) {
                socketInstance.off('joinRoom')
                socketInstance.off('error')
                socketInstance.off('disconnect')
                socketInstance.disconnect()
            }
        }
    }, [setSocket, setError, setJoinedQuiz, quizId, playerId])

    //Si se conecta el master, se envía la petición de datos del quiz:
    useEffect(() => {
        getQuizDataHandler(socket, quizId, loggedUserId, setQuizData)
        return () => {
            if (socket) {
                socket.off('getQuizData')
            }
        }
    }, [socket, quizId, loggedUserId, setQuizData])

    // Traigo los datos principales del quiz y los guardo en el estado quizData para que estén disponibles inmediatamente:
    useEffect(() => {
        quizDataHandler(
            socket,
            setQuizData,
            setPlayerData,
            setQuestion,
            loggedUserId
        )
        return () => {
            if (socket) {
                socket.off('quizData')
            }
        }
    }, [socket, setQuizData, setPlayerData, setQuestion, loggedUserId])

    //Recuperar los datos de los jugadores, el quiz y la pregunta actual cuando se reconecta:
    useEffect(() => {
        sendUpdatedQuizData(
            socket,
            setPlayerData,
            setQuizData,
            setQuestion,
            setIsQuestionRunning,
            setShowScores,
            setIsDisabled,
            sessionRecovery,
            setSessionRecovery,
            setInitialPlayerData,
            setClickedResponses
        )
        return () => {
            if (socket) {
                socket.off('sendRecoveryQuizData')
            }
        }
    }, [
        socket,
        setPlayerData,
        setQuizData,
        setQuestion,
        setIsQuestionRunning,
        setShowScores,
        setIsDisabled,
        sessionRecovery,
        setSessionRecovery,
        setInitialPlayerData,
        setClickedResponses,
    ])

    //Aquí controla el master cuando iniciar cada pregunta:
    useEffect(() => {
        questionStartedHandler(
            socket,
            setIsQuestionRunning,
            setShowScores,
            setIsDisabled
        )
        return () => {
            if (socket) {
                socket.off('questionStarted')
            }
        }
    }, [socket, setIsQuestionRunning, setShowScores, setIsDisabled])

    useEffect(() => {
        //Aquí el usuario ingresa su nombre de jugador, se setea su estado players y se envía al back para que este notifique a todos los usuarios de la sala, incluyendo el master:
        playerJoinedHandler(socket, setPlayerData, quizId)

        quizEndedHandler(socket, router, loggedUserId, quizData)
        return () => {
            if (socket) {
                socket.off('playerJoined')
                socket.off('quizEnded')
            }
        }
    }, [router, socket, setPlayerData, quizId, loggedUserId, quizData])

    //Recepción de las preguntas:
    //El back hace su lógica y emite el estado question, enviándo la primera pregunta. Aquí se escucha y se guarda en el estado question:
    useEffect(() => {
        questionHandler(socket, setQuestion)
        noMoreQuestionsHandler(socket)

        // Limpio el evento cuando el componente se desmonta para evitar duplicidades innecesarias:
        return () => {
            if (socket) {
                socket.off('question')
                socket.off('noMoreQuestions')
            }
        }
    }, [socket, setQuestion])

    useEffect(() => {
        if (socket) {
            answerSubmittedHandler(socket, handleAnswerSubmitted)
            return () => {
                if (socket) {
                    socket.off('answerSubmitted')
                }
            }
        }
    }, [socket, handleAnswerSubmitted])

    //Actualizar los datos del quiz que se editan en tiempo real y sincronizarlos en todos los clientes de la sala:
    useEffect(() => {
        editedQuizData(socket, setQuizData, loggedUserId)
        return () => {
            if (socket) {
                socket.off('quizUpdatedMessage')
            }
        }
    }, [setQuizData, socket, loggedUserId])

    //Actualizar las preguntas que se editan en tiempo real y sincronizarlos en todos los clientes de la sala:
    useEffect(() => {
        editedQuestionData(socket, setQuestion, loggedUserId, quizData)
        return () => {
            if (socket) {
                socket.off('questionUpdatedMessage')
            }
        }
    }, [setQuestion, socket, loggedUserId, quizData])

    //Tiempo de cada pregunta:
    useEffect(() => {
        timerUpdate(socket, setTimeLeft)
        return () => {
            if (socket) {
                socket.off('timerUpdate')
            }
        }
    }, [socket, setTimeLeft])

    //Tiempo de la sesión:
    useEffect(() => {
        sessionTimeLeftHandler(socket, setSessionTimeLeft)
        return () => {
            if (socket) {
                socket.off('sessionTimeLeft')
            }
        }
    }, [socket, setSessionTimeLeft])

    //Actualización del estado contador:
    useEffect(() => {
        timeUpHandler(socket, setIsDisabled)
        return () => {
            if (socket) {
                socket.off('timeUp')
            }
        }
    }, [socket, setIsDisabled])

    //Para pasar a los jugadores a la pantalla de puntuación, entre pregunta y pregunta:
    useEffect(() => {
        scoresHandler(
            socket,
            setIsQuestionRunning,
            setShowScores,
            setClickedResponses
        )
        return () => {
            if (socket) {
                socket.off('scores')
            }
        }
    }, [socket, setIsQuestionRunning, setShowScores, setClickedResponses])

    //Cada vez que se conecta o desconecta un cliente, se envía el nuevo estado a todos los clientes de la sala:
    useEffect(() => {
        clientsNumberHandler(
            socket,
            setConnectedClients,
            playerData,
            setPlayerData
        )
        return () => {
            if (socket) {
                socket.off('clientsNumber')
            }
        }
    }, [socket, setConnectedClients, setPlayerData, playerData])

    useEffect(() => {
        questionDeletedHandler(question, quizData, socket, quizId)
        return () => {
            if (socket) {
                socket.off('questionDeleted')
            }
        }
    }, [question, quizData, socket, quizId])

    useEffect(() => {
        answerMessage(socket)
        return () => {
            if (socket) {
                socket.off('answerSubmittedMessage')
            }
        }
    }, [socket])
}
export default useSocketConfig
