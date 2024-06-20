'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    const params = useParams()
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
        socketInstance.on('connect', () => {
            console.log('Connected to server')
            setJoinedQuiz(true)
        })

        //Aquí recibo los errores del back y los guardo en un estado:
        socketInstance.on('error', (error) => {
            setError(null)
            setTimeout(() => {
                setError(error.message)
            }, 0)
        })
        // Si el componente se desmonta, se desconecta de la sala
        return () => {
            socketInstance.disconnect()
        }
    }, [])

    // Traigo los datos principales del quiz y los guardo en el estado quizData para que estén disponibles inmediatamente:
    useEffect(() => {
        if (socket && quizId && loggedUserId) {
            socket.emit('getQuizData', quizId, loggedUserId)

            socket.on('quizData', (data) => {
                setQuizData(data)
            })
        }
    }, [socket, quizId, loggedUserId])

    useEffect(() => {
        //El siguiente paso es que el usuario escriba su nombre de jugado en el el formulario. En ese momento se emite el evento joinQuiz y se envían los datos. El back los guarda en Redis y emite el evento playerJoined.Aquí se guardan en el estado initialPlayerData, de ese modo estarán accesibles durante toda la partida:

        //Los datos DE TODOS LOS JUGADORES que llegan desde back a esta sala se guardan en el estado playerData. Así estarán accesibles para actualizar en cada pregunta:
        if (socket) {
            socket.on('playerJoined', (data) => {
                setPlayerData((prevPlayerData) => [...prevPlayerData, data])
            })

            socket.on('quizEnded', () => {
                router.push(`/`)
            })

            socket.on('disconnect', () => {
                console.log('Disconnected from server')
            })
        }
    }, [socket])

    //Recepción de las preguntas:
    //El siguiente paso es que el master inicie una partida desde el botón correspondiente. En ese momento se emite el evento startQuiz. El back hace su lógica y emite el estado question, enviándo la primera pregunta. Aquí se escucha y se guarda en el estado question:
    useEffect(() => {
        if (socket) {
            socket.on('question', (data) => {
                setQuestion(null)
                //Trucazo para asegurarse de que primero se ejecute el setQuestion de arriba y luego el de abajo.
                setTimeout(() => {
                    setQuestion(data)
                }, 0)
            })
            socket.on('noMoreQuestions', () => {
                console.log('Ya no hay más preguntas')
            })
        }

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
        [socket, quizId, question, playerId]
    )

    //El back comprueba si la respuesta es correcta y emite el evento answerSubmitted, enviándo los datos actualizados del jugador: Ver el callback handleAnswerSubmitted más abajo:

    const handleInitialPlayerData = useCallback(() => {
        console.log(question)
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
        if (socket) {
            socket.emit('nextQuestion', quizId, nextQuestion, numberOfQuestions)
        }
    }

    const updateQuizDataInBackend = (e) => {
        e.preventDefault()

        if (socket) {
            socket.emit('updateQuizData', quizId, quizData)
        }
    }
    const updateQuestionDataInBackend = (e) => {
        e.preventDefault()
        if (socket) {
            socket.emit('updateQuestionData', quizId, question)
        }
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
        setQuestion((prevData) => ({
            ...prevData,
            [name]: value,
        }))
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
                question.optionA,
                question.optionB,
                question.optionC,
                question.correctAnswer,
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

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            {!quizData ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <p>{quizData?.description}</p>
                    <p>{quizData?.title}</p>
                </>
            )}
            {loggedUserId === quizData?.owner_id ? (
                <>
                    <button onClick={endQuiz}>Finalizar quiz</button>
                    <button onClick={nextQuestionHandler}>
                        Nueva pregunta
                    </button>
                    <button onClick={handleStartQuiz}>Start Quiz</button>
                </>
            ) : null}

            {playerData && (
                <div>
                    <h2>Scores</h2>
                    <ul>
                        {playerData.map((player) => (
                            <li key={player.id}>
                                {player.name}: {player.totalScore}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {quizId ? (
                <>
                    <p>{question?.question}</p>
                    <input
                        type="text"
                        placeholder="Introduce tu nombre de jugador"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                    <p>{nickName}</p>
                    <button onClick={handleInitialPlayerData}>
                        Envía tu nombre de jugador
                    </button>
                    {question && (
                        <ul>
                            <p>{question.question}</p>
                            {shuffledQuestionResponses &&
                                shuffledQuestionResponses.map(
                                    (response, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() =>
                                                    handleAnswerSubmit(response)
                                                }
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                }}
                                            >
                                                {response}
                                            </button>
                                        </li>
                                    )
                                )}
                        </ul>
                    )}
                </>
            ) : (
                <div>
                    <h1>{quizData?.title}</h1>
                    {quizData?.questions.map((question) => (
                        <div key={question.questionId}>
                            <h2>{question.text}</h2>
                            {question.answers.map((answer) => (
                                <button
                                    key={answer.answerId}
                                    onClick={() =>
                                        handleAnswerSubmit(answer.text)
                                    }
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleGetScores}>Get Scores</button>
                    {initialPlayerData && (
                        <div>
                            <h2>Scores</h2>
                            <ul>
                                {Object.entries(initialPlayerData).map(
                                    ([userId, score]) => (
                                        <li key={userId}>
                                            {userId}: {score}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {loggedUserId === quizData?.owner_id ? (
                <>
                    <form>
                        <label htmlFor="title">Edita el título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={quizData?.title}
                            onChange={handleQuizChange}
                        />
                        <label htmlFor="title">Edita la descripción</label>
                        <input
                            type="text"
                            id="title"
                            name="description"
                            value={quizData?.description}
                            onChange={handleQuizChange}
                        />
                        <button onClick={updateQuizDataInBackend}>
                            Actualiza el back
                        </button>
                    </form>
                    <form>
                        <label htmlFor="question">Edita la pregunta</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            value={question?.question}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="questionTime">
                            Edita el tiempo de la pregunta
                        </label>
                        <input
                            type="number"
                            id="questionTime"
                            name="questionTime"
                            value={question?.questionTime}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="optionA">Edita la opción A</label>
                        <input
                            type="text"
                            id="optionA"
                            name="optionA"
                            value={question?.optionA}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="optionB">Edita la opción B</label>
                        <input
                            type="text"
                            id="optionB"
                            name="optionB"
                            value={question?.optionB}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="optionC">Edita la opción C</label>
                        <input
                            type="text"
                            id="optionC"
                            name="optionC"
                            value={question?.optionC}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="correctAnswer">
                            Edita la respuesta correcta
                        </label>
                        <input
                            type="text"
                            id="correctAnswer"
                            name="correctAnswer"
                            value={question?.correctAnswer}
                            onChange={handleQuestionChange}
                        />

                        <button
                            type="button"
                            onClick={updateQuestionDataInBackend}
                        >
                            Actualiza el back en Redis
                        </button>
                    </form>
                </>
            ) : null}
        </>
    )
}

export default Page
