/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParams, useRouter } from 'next/navigation'
import {
    shuffleArray,
    findValue,
    startNewPlayer,
    signOutHandler,
} from '../utils'
import useSocketConfig from './useSocketConfig'

import {
    handleQuestionChange,
    nextQuestionHandler,
    updateQuestionDataInBackend,
    updateQuizDataInBackend,
    handleQuizChange,
    endQuiz,
    initQuestion,
    showScoresHandler,
    recoverySession,
} from '../handlers/index'
import { useQuizHandlers } from './useQuizHandlers'

const useQuizLogic = () => {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()

    //Estados para manejar el master, con los datos comunes de todos los jugadores en tiempo real del quiz:
    const [quizData, setQuizData] = useState(null)
    const [question, setQuestion] = useState(null)
    const [playerData, setPlayerData] = useState([])

    //Estados del cliente local, con la información particular del jugador:
    const [initialPlayerData, setInitialPlayerData] = useState([])
    const [nickName, setNickName] = useState('')
    const [isNameSetted, setIsNameSetted] = useState(false)

    //Estados que se manejan automáticamente:
    const [_joinedQuiz, setJoinedQuiz] = useState(false)
    const [socket, setSocket] = useState(null)
    const [error, setError] = useState(null)
    const [shuffledQuestionResponses, setShuffledQuestionResponses] =
        useState(null)
    const [isQuestionRunning, setIsQuestionRunning] = useState(false)
    const [timeLeft, setTimeLeft] = useState(
        question ? question.questionTime : null
    )
    const [showScores, setShowScores] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [sessionRecovery, setSessionRecovery] = useState(true)
    const [connectedClients, setConnectedClients] = useState(0)

    //Para activar la recuperación y sincronización de datos en caso de que salga de la pantalla o la refresque por error:
    let playerId
    let playerName
    playerId = window.localStorage.getItem('idNewPlayer')
    playerName = window.localStorage.getItem('playerName')

    //Solo se ejecutará una vez al montar el componente, para evitar el bucle infinito de renderizaciones:
    useEffect(() => {
        if (!playerId) {
            playerId = uuidv4()
            window.localStorage.setItem('idNewPlayer', playerId)
            setSessionRecovery(false)
        }
        if (playerName) {
            setIsNameSetted(true)
        }
    }, [playerId])

    const loggedUserId = session?.user.data.id
    const quizId = params.quizId.toString()

    //Aquí van los handlers que necesitan useCallback:
    const {
        handleAnswerSubmitted,
        handleAnswerSubmit,
        handleInitialPlayerData,
        handleStartQuiz,
    } = useQuizHandlers({
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
        timeLeft,
        setIsDisabled,
    })

    useEffect(() => {
        if (question) {
            const questionResponses = [
                { optionA: question.optionA },
                { optionB: question.optionB },
                { optionC: question.optionC },
                { correctAnswer: question.correctAnswer },
            ]
            const Responses = shuffleArray(questionResponses)
            setShuffledQuestionResponses(Responses)
        }
    }, [question])

    //Este es el hook que escucha los eventos del socket:
    useSocketConfig({
        socket,
        quizId,
        loggedUserId,
        setQuizData,
        setQuestion,
        setError,
        setSocket,
        router,
        setJoinedQuiz,
        setPlayerData,
        setQuestion,
        playerData,
        handleAnswerSubmitted,
        setIsQuestionRunning,
        isQuestionRunning,
        setTimeLeft,
        timeLeft,
        setShowScores,
        showScores,
        setIsDisabled,
        setConnectedClients,
        playerData,
        isNameSetted,
        sessionRecovery,
        setSessionRecovery,
        setInitialPlayerData,
    })

    //Las funciones que dependen de uno o varios estados, habrá que envolverlas en funciones anónimas. Las demás, no es necesario, pero habrá que hacer en la función original una función que devuelva una función:
    return {
        endQuiz: () => endQuiz(quizData, socket, quizId),
        findValue,
        handleQuestionChange: () =>
            handleQuestionChange(
                setShuffledQuestionResponses,
                shuffledQuestionResponses
            ),
        handleQuizChange: handleQuizChange(setQuizData),
        updateQuestionDataInBackend: updateQuestionDataInBackend(
            setQuestion,
            socket,
            quizId,
            question
        ),
        updateQuizDataInBackend: updateQuizDataInBackend(
            quizData,
            socket,
            quizId
        ),
        nextQuestionHandler: () =>
            nextQuestionHandler(question, quizData, socket, quizId),
        handleAnswerSubmit,
        initQuestion: () => initQuestion(socket, quizId, question),
        handleStartQuiz,
        showScoresHandler: () => showScoresHandler(socket, quizId),
        handleInitialPlayerData,
        question,
        quizData,
        playerId,
        loggedUserId,
        quizId,
        setNickName,
        error,
        playerData,
        startNewPlayer: () => startNewPlayer(router, params, setIsNameSetted),
        signOutHandler: () => signOutHandler(router, setIsNameSetted),
        recoverySession: () => recoverySession(socket, quizId),
        nickName,
        shuffledQuestionResponses,
        isQuestionRunning,
        setIsQuestionRunning,
        timeLeft,
        showScores,
        isDisabled,
        initialPlayerData,
        socket,
        connectedClients,
        sessionRecovery,
        isNameSetted,
    }
}
export default useQuizLogic
