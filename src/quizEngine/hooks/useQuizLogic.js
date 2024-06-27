import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
    connectHandler,
    disconnectHandler,
    errorHandler,
    getQuizDataHandler,
    noMoreQuestionsHandler,
    playerJoinedHandler,
    questionHandler,
    quizEndedHandler,
} from '../handleEvents/index'

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
    }, [])

    // Traigo los datos principales del quiz y los guardo en el estado quizData para que estén disponibles inmediatamente:
    useEffect(() => {
        getQuizDataHandler(socket, quizId, loggedUserId, setQuizData)
    }, [socket, quizId, loggedUserId])

    useEffect(() => {
        //El siguiente paso es que el usuario escriba su nombre de jugado en el el formulario. En ese momento se emite el evento joinQuiz y se envían los datos. El back los guarda en Redis y emite el evento playerJoined.Aquí se guardan en el estado initialPlayerData, de ese modo estarán accesibles durante toda la partida:

        //Los datos DE TODOS LOS JUGADORES que llegan desde back a esta sala se guardan en el estado playerData. Así estarán accesibles para actualizar en cada pregunta:
        playerJoinedHandler(socket, setPlayerData)

        quizEndedHandler(socket, router)
    }, [socket, router])

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
    }, [socket])

    //En cada respuesta, en el botón correspondiente, se emite el evento submitAnswer y se envían los datos que el jugador ha seleccionado. Este es el callback:
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

    //El back comprueba si la respuesta es correcta y emite el evento answerSubmitted, enviándo los datos actualizados del jugador: Ver el callback handleAnswerSubmitted más abajo:

    const handleInitialPlayerData = useCallback(() => {
        const initialPlayerData = {
            id: playerId,
            name: nickName,
            totalScore: 0,
        }

        setInitialPlayerData((prevPlayerData) => [
            ...prevPlayerData,
            initialPlayerData,
        ])

        if (socket) {
            socket.emit('joinQuiz', playerId, quizId, initialPlayerData)
        }
    }, [socket, playerId, nickName, quizId])

    const handleStartQuiz = useCallback(() => {
        if (socket) {
            socket.emit('startQuiz', loggedUserId, quizId)
        }
    }, [socket, loggedUserId, quizId])

    //Aquí llegan los datos y se actualizan en el estado playerData, para poder ser pintados
    if (socket) {
        const handleAnswerSubmitted = (backData) => {
            playerData.find((frontData) => {
                if (frontData.id === backData.id) {
                    frontData.totalScore = backData.totalScore
                    setPlayerData((prevPlayerData) => [...prevPlayerData])
                }
            })
        }

        socket.on('answerSubmitted', handleAnswerSubmitted)
    }

    const nextQuestionHandler = async () => {
        const nextQuestion = question?.questionNumber + 1
        const numberOfQuestions = quizData.questions.length
        if (socket && question) {
            socket.emit('nextQuestion', quizId, nextQuestion, numberOfQuestions)
        } else {
            toast.warning(
                'No hay preguntas. Clica en "Start Quiz" para traer la primera'
            )
        }
    }

    const updateQuizDataInBackend = (e) => {
        e.preventDefault()
        if (socket) {
            socket.emit('updateQuizData', quizId, quizData)
            socket.on('quizUpdatedMessage', (data) =>
                toast.success(data.message)
            )
        }
    }

    const updateQuestionDataInBackend = (e) => {
        e.preventDefault()
        const form = e.target.form || e.target

        //Primero seteo el estado question:
        setQuestion((prevData) => {
            const datafromForm = {
                question: form.elements.question.value,
                questionTime: form.elements.questionTime.value,
                optionA: form.elements.optionA.value,
                optionB: form.elements.optionB.value,
                optionC: form.elements.optionC.value,
                correctAnswer: form.elements.correctAnswer.value,
            }
            const updatedData = { ...prevData }
            for (const [key, value] of Object.entries(datafromForm)) {
                if (value !== '') {
                    updatedData[key] = value
                }
            }
            // Ahora lo envío al backend:
            if (socket) {
                socket.emit('updateQuestionData', quizId, updatedData)
                socket.on('questionUpdatedMessage', (data) =>
                    toast.success(data.message)
                )
            }
            return updatedData
        })
    }

    //Para actualizar datos del quiz:
    const handleQuizChange = (e) => {
        const { name, value } = e.target
        setQuizData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    //Para actualizar las preguntas:
    const handleQuestionChange = (e) => {
        const { name, value } = e.target
        setShuffledQuestionResponses((prevData) => {
            if (prevData) {
                let updatedResponses
                const index = prevData.findIndex(
                    (i) =>
                        i === question[name] ||
                        (updatedResponses && i === updatedResponses[name]) ||
                        i === shuffledQuestionResponses[name]
                )

                updatedResponses = prevData.map((item) => {
                    if (item === shuffledQuestionResponses[index]) {
                        return value
                    }
                    return item
                })

                return updatedResponses
            } else {
                toast.warning(
                    'Aún no hay datos, clica en "Start quiz" para traer la primea pregunta'
                )
                return
            }
        })
    }

    const endQuiz = async () => {
        const numberOfQuestions = quizData.questions?.length
        if (socket) {
            socket.emit('endQuiz', quizId, numberOfQuestions)
        }
    }
    useEffect(() => {
        if (question) {
            const questionResponses = [
                { optionA: question.optionA },
                { optionB: question.optionB },
                { optionC: question.optionC },
                { correctAnswer: question.correctAnswer },
            ]
            const shuffleArray = (array) => {
                const shuffledArray = [...array]
                shuffledArray.sort(() => Math.random() - 0.5)
                return shuffledArray
            }

            const Responses = shuffleArray(questionResponses)
            setShuffledQuestionResponses(Responses)
        }
    }, [question])

    //Función para poner el value correspondiente a los inputs de las preguntas
    const findValue = (name) => {
        const value = shuffledQuestionResponses?.forEach((item) => {
            if (item.hasOwnProperty(name)) {
                return item[name]
            }
        })
        return value
    }
    return {
        findValue,
        endQuiz,
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
