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
} from '../handleEvents'

const useSocketConfig = (argumentsData) => {
    const {
        socket,
        quizId,
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
    } = argumentsData

    useEffect(() => {
        //Crear conexión y guardarla en un estado:
        const socketInstance = io(process.env.NEXT_PUBLIC_API_HOST)
        setSocket(socketInstance)

        //Se escucha el estado connect, que es el momento en el que el front se conecta con el back. En ese instante se setea el estado joinedQuiz a true para que no se instancien más conexiones si la página se renderiza nuevamente:
        connectHandler(socketInstance, setJoinedQuiz, quizId)

        //Aquí recibo los errores del back y los guardo en un estado:
        errorHandler(socketInstance, setError)
        disconnectHandler(socketInstance)

        // Si el componente se desmonta, se desconecta de la sala
        return () => {
            if (socketInstance) {
                socketInstance.off('sendQuizId')
                socketInstance.off('error')
                socketInstance.disconnect()
            }
        }
    }, [setSocket, setError, setJoinedQuiz, quizId])

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
        quizDataHandler(socket, setQuizData, setPlayerData, setQuestion)
        return () => {
            if (socket) {
                socket.off('quizData')
            }
        }
    }, [socket, setQuizData, setPlayerData, setQuestion])

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
            setInitialPlayerData
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
        //El siguiente paso es que el usuario escriba su nombre de jugado en el el formulario. En ese momento se emite el evento joinQuiz y se envían los datos. El back los guarda en Redis y emite el evento playerJoined.Aquí se guardan en el estado initialPlayerData, de ese modo estarán accesibles durante toda la partida:

        //Los datos DE TODOS LOS JUGADORES que llegan desde back a esta sala se guardan en el estado playerData. Así estarán accesibles para actualizar en cada pregunta:
        playerJoinedHandler(socket, setPlayerData, quizId)

        quizEndedHandler(socket, router)
        return () => {
            if (socket) {
                socket.off('playerJoined')
                socket.off('quizEnded')
            }
        }
    }, [router, socket, setPlayerData, quizId])

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
        editedQuizData(socket, setQuizData)
        return () => {
            if (socket) {
                socket.off('quizUpdatedMessage')
            }
        }
    }, [setQuizData, socket])

    //Actualizar las preguntas que se editan en tiempo real y sincronizarlos en todos los clientes de la sala:
    useEffect(() => {
        editedQuestionData(socket, setQuestion)
        return () => {
            if (socket) {
                socket.off('questionUpdatedMessage')
            }
        }
    }, [setQuestion, socket])

    //Lógica cuando se acaba el tiempo:
    useEffect(() => {
        timerUpdate(socket, setTimeLeft)
        return () => {
            if (socket) {
                socket.off('timerUpdate')
            }
        }
    }, [socket, setTimeLeft])

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
        scoresHandler(socket, setIsQuestionRunning, setShowScores)
        return () => {
            if (socket) {
                socket.off('scores')
            }
        }
    }, [socket, setIsQuestionRunning, setShowScores])

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
}
export default useSocketConfig
