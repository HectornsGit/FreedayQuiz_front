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
    } = argumentsData

    useEffect(() => {
        //Crear conexión y guardarla en un estado:
        const socketInstance = io(process.env.NEXT_PUBLIC_API_HOST)
        setSocket(socketInstance)

        //Se escucha el estado connect, que es el momento en el que el front se conecta con el back. En ese instante se setea el estado joinedQuiz a true para que no se instancien más conexiones si la página se renderiza nuevamente:
        connectHandler(socketInstance, setJoinedQuiz)

        //Aquí recibo los errores del back y los guardo en un estado:
        errorHandler(socketInstance, setError)
        disconnectHandler(socketInstance)

        // Si el componente se desmonta, se desconecta de la sala
        return () => {
            socketInstance.disconnect()
        }
    }, [setSocket, setError, setJoinedQuiz])

    // Traigo los datos principales del quiz y los guardo en el estado quizData para que estén disponibles inmediatamente:
    useEffect(() => {
        getQuizDataHandler(socket, quizId, loggedUserId, setQuizData)
    }, [socket, quizId, loggedUserId, setQuizData])

    useEffect(() => {
        //El siguiente paso es que el usuario escriba su nombre de jugado en el el formulario. En ese momento se emite el evento joinQuiz y se envían los datos. El back los guarda en Redis y emite el evento playerJoined.Aquí se guardan en el estado initialPlayerData, de ese modo estarán accesibles durante toda la partida:

        //Los datos DE TODOS LOS JUGADORES que llegan desde back a esta sala se guardan en el estado playerData. Así estarán accesibles para actualizar en cada pregunta:
        playerJoinedHandler(socket, setPlayerData)

        quizEndedHandler(socket, router)
    }, [socket, router, setPlayerData])

    //Recepción de las preguntas:
    //El siguiente paso es que el master inicie una partida desde el botón correspondiente. En ese momento se emite el evento startQuiz. El back hace su lógica y emite el estado question, enviándo la primera pregunta. Aquí se escucha y se guarda en el estado question:

    useEffect(() => {
        questionHandler(socket, setQuestion)
        noMoreQuestionsHandler(socket)

        // Limpiar el evento cuando el componente se desmonta
        return () => {
            if (socket) {
                socket.off('question')
            }
        }
    }, [socket, setQuestion])

    useEffect(() => {
        if (socket) {
            answerSubmittedHandler(socket, handleAnswerSubmitted)
        }
    }, [socket, handleAnswerSubmitted])
}
export default useSocketConfig
