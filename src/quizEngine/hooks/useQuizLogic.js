import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParams, useRouter } from 'next/navigation'
import { shuffleArray, findValue } from '../utils'
import useSocketConfig from './useSocketConfig'
import {
    handleQuestionChange,
    nextQuestionHandler,
    updateQuestionDataInBackend,
    updateQuizDataInBackend,
    handleQuizChange,
    endQuiz,
} from '../handlers/index'
import { useQuizHandlers } from './useQuizHandlers'

const useQuizLogic = () => {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()
    const [quizData, setQuizData] = useState(null)
    const [question, setQuestion] = useState(null)
    const [initialPlayerData, setInitialPlayerData] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [error, setError] = useState(null)
    const [_joinedQuiz, setJoinedQuiz] = useState(false)
    const [socket, setSocket] = useState(null)
    const [nickName, setNickName] = useState('')
    const [shuffledQuestionResponses, setShuffledQuestionResponses] =
        useState(null)

    const playerId = uuidv4()
    const loggedUserId = session?.user.data.id
    const quizId = params.quizId

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
        setError,
        setSocket,
        router,
        setJoinedQuiz,
        setPlayerData,
        setQuestion,
        playerData,
        handleAnswerSubmitted,
    })

    //Las funciones que dependen de estado, habrá que envolverlas en funciones anónimas. Las demás, no es necesario:
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
        handleStartQuiz,
        handleInitialPlayerData,
        question,
        quizData,
        playerId,
        loggedUserId,
        quizId,
        setNickName,
        error,
        playerData,
        nickName,
        shuffledQuestionResponses,
    }
}
export default useQuizLogic
