'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

const Page = ({ quizId }) => {
    const { data: session } = useSession()
    const [quizData, setQuizData] = useState(null)
    const [scores, setScores] = useState(null)
    const [error, setError] = useState(null)
    const [loading, _setLoading] = useState(true)
    const [joinedQuiz, setJoinedQuiz] = useState(false)

    const userId = uuidv4()
    const loggedUserId = session?.user.data.id

    useEffect(() => {
        if (!joinedQuiz) {
            //Crear una conexión con el servidor:
            const socket = io(process.env.NEXT_PUBLIC_API_HOST)

            //Escuchar el evento de conexion al servidor:
            socket.on('connect', () => {
                console.log('Connected to server')
            })

            //Escuchar el evento error del servidor y recibir el mensaje de error:
            socket.on('error', (message) => {
                setError(message)
            })

            //Así evito que se creen multiples conexiones al servidor:
            socket.on('joinQuiz', userId)
            setJoinedQuiz(true)

            //Emitir un evento llamado 'startQuiz' con el id del quiz al servidor:
            socket.emit('startQuiz', loggedUserId, quizId)

            //Escuchar el evento quizData del servidor y recibir la información del quiz:
            socket.on('quizData', (data) => {
                setQuizData(data)
            })
            //Escuchar el evento answerSubmitted del servidor y recibir la respuesta enviada por otro usuario:
            socket.on('answerSubmitted', (data) => {
                console.log('Answer Submitted:', data)
                // Aquí puedo manejar la respuesta enviada por otro usuario
            })

            //Escuchar el evento quizScores del servidor y recibir la información de los puntajes:
            socket.on('quizScores', (data) => {
                setScores(data)
            })
            //Escuchar el evento 'de desconexión al servidor:
            socket.on('disconnect', () => {
                console.log('Disconnected from server')
            })
            return () => {
                socket.disconnect()
            }
        }
    }, [quizId])

    const handleAnswerSubmit = (questionId, answerId) => {
        socket.emit('submitAnswer', {
            quizId,
            questionId,
            answerId,
            userId: 'user1',
        })
    }

    const handleGetScores = () => {
        socket.emit('getScores', quizId)
    }

    if (error) {
        return <div>{error}</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{quizData?.title}</h1>
            {/* Renderizar preguntas y respuestas */}
            {quizData?.questions.map((question) => (
                <div key={question.questionId}>
                    <h2>{question.text}</h2>
                    {question.answers.map((answer) => (
                        <button
                            key={answer.answerId}
                            onClick={() =>
                                handleAnswerSubmit(
                                    question.questionId,
                                    answer.answerId
                                )
                            }
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            ))}
            <button onClick={handleGetScores}>Get Scores</button>
            {scores && (
                <div>
                    <h2>Scores</h2>
                    <ul>
                        {Object.entries(scores).map(([userId, score]) => (
                            <li key={userId}>
                                {userId}: {score}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Page
