'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'next/navigation'

const Page = () => {
    const params = useParams()
    const { data: session } = useSession()
    const [quizData, setQuizData] = useState(null)
    const [question, setQuestion] = useState(null)
    const [initialPlayerData, setInitialPlayerData] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [error, setError] = useState(null)
    const [joinedQuiz, setJoinedQuiz] = useState(false)
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

        //Se escucha el estado connect. En ese momento se setea el estado joinedQuiz a true para que no se instancien más conexiones si la página se renderiza nuevamente:
        socketInstance.on('connect', () => {
            console.log('Connected to server')
            setJoinedQuiz(true)
        })

        //El siguiente paso es que el usuario escriba su nombre de jugado en el el formulario. En ese momento se emite el evento joinQuiz y se envían los datos. El back los guarda en Redis y emite el evento playerJoined.Aquí se guardan en el estado initialPlayerData, de ese modo estarán accesibles durante toda la partida:

        //Los datos DE TODOS LOS JUGADORES que llegan desde back a esta sala se guardan en el estado playerData. Así estarán accesibles para actualizar en cada pregunta:
        socketInstance.on('playerJoined', (data) => {
            setPlayerData((prevPlayerData) => [...prevPlayerData, data])
        })

        socketInstance.on('error', (message) => {
            setError(message)
        })

        socketInstance.on('quizData', (data) => {
            setQuizData(data)
        })

        //El siguiente paso es que el master inicie una partida desde el botón correspondiente. En ese momento se emite el evento startQuiz. El back hace su lógica y emite el estado question, enviándo la primera pregunta. Aquí se escucha y se guarda en el estado question:
        socketInstance.on('question', (data) => {
            setQuestion(data)
        })

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from server')
        })

        //Si el componente se desmonta, se desconecta de la sala:
        return () => {
            socketInstance.disconnect()
        }
    }, [])

    //En casa respuesta, en el botón correspondiente, se emite el evento submitAnswer y se envían los datos que el jugador ha seleccionado. Este es el callback:
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

    const handleGetScores = useCallback(() => {
        if (socket) {
            socket.emit('getScores', quizId)
        }
    }, [socket, quizId])

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
                    <button onClick={handleStartQuiz}>Start Quiz</button>
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
        </>
    )
}

export default Page
