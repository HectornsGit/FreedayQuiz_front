'use client'
import useQuizLogic from '@/quizEngine/hooks/useQuizLogic'

const Page = () => {
    const {
        endQuiz,
        findValue,
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
        loggedUserId,
        setNickName,
        nickName,
        error,
        playerData,
        shuffledQuestionResponses,
    } = useQuizLogic()

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            {' '}
            <input
                type="text"
                placeholder="Introduce tu nombre de jugador"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
            />
            <button onClick={handleInitialPlayerData}>
                Envía tu nombre de jugador
            </button>
            {!quizData ? (
                <>
                    <p>Esperando que el master inicie el juego...</p>{' '}
                </>
            ) : (
                <>
                    <p>{quizData?.description}</p>
                    <p>{quizData?.title}</p>
                </>
            )}
            {playerData && (
                <div>
                    <h2>Jugadores conectados: {playerData.length}</h2>
                    <ul>
                        {playerData.map((player) => (
                            <li key={player.id}>
                                Nickname: {player.name} Puntos:{' '}
                                {player.totalScore}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {question && (
                <>
                    <p>Pregunta: {question?.question}</p>
                    <ul>
                        <p>Respuestas:</p>
                        {shuffledQuestionResponses &&
                            shuffledQuestionResponses.map((response, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() =>
                                            handleAnswerSubmit(
                                                Object.values(response)[0]
                                            )
                                        }
                                    >
                                        {Object.values(response)[0]}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </>
            )}
            {loggedUserId && loggedUserId == quizData?.owner_id && (
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
                            value={findValue(
                                'question',
                                shuffledQuestionResponses
                            )}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="questionTime">
                            Edita el tiempo de la pregunta
                        </label>
                        <input
                            type="number"
                            id="questionTime"
                            name="questionTime"
                            value={findValue(
                                'questionTime',
                                shuffledQuestionResponses
                            )}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="optionA">Edita la opción A</label>
                        <input
                            type="text"
                            id="optionA"
                            name="optionA"
                            value={findValue(
                                'optionA',
                                shuffledQuestionResponses
                            )}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="optionB">Edita la opción B</label>
                        <input
                            type="text"
                            id="optionB"
                            name="optionB"
                            value={findValue(
                                'optionB',
                                shuffledQuestionResponses
                            )}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="optionC">Edita la opción C</label>
                        <input
                            type="text"
                            id="optionC"
                            name="optionC"
                            value={findValue(
                                'optionC',
                                shuffledQuestionResponses
                            )}
                            onChange={handleQuestionChange}
                        />

                        <label htmlFor="correctAnswer">
                            Edita la respuesta correcta
                        </label>
                        <input
                            type="text"
                            id="correctAnswer"
                            name="correctAnswer"
                            value={findValue(
                                'correctAnswer',
                                shuffledQuestionResponses
                            )}
                            onChange={handleQuestionChange}
                        />

                        <button
                            type="button"
                            onClick={updateQuestionDataInBackend}
                        >
                            Actualiza el back en Redis
                        </button>
                    </form>
                    <button onClick={endQuiz}>Finalizar quiz</button>
                    <button onClick={nextQuestionHandler}>
                        Nueva pregunta
                    </button>
                    <button onClick={handleStartQuiz}>Start Quiz</button>
                </>
            )}
        </>
    )
}

export default Page
