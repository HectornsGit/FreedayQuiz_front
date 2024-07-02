const MasterPrueba = ({ masterProps }) => {
    const {
        signOut,
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
        handleStartQuiz,
        question,
        quizData,
        loggedUserId,
        playerData,
        shuffledQuestionResponses,
        initQuestion,
        timeLeft,
        showScoresHandler,
        connectedClients,
    } = masterProps

    return (
        <>
            <button onClick={signOut}>Cerrar sesión</button>{' '}
            {quizData && (
                <>
                    <p>{quizData?.description}</p>
                    <p>{quizData?.title}</p>
                </>
            )}
            {playerData && (
                <div>
                    <h2>Jugadores conectados: {connectedClients}</h2>
                    <ul>
                        {playerData.map((player) => (
                            <li key={player.id}>
                                Nickname: {player.name} Puntos:{' '}
                                {player.totalScore} Streak: {player.streak}
                                Puntos ultima pregunta:
                                {player.lastCorrectAnswer}
                                State: {player.state}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {question && (
                <>
                    <p>Tiempo restante: {timeLeft}</p>
                    <p>Pregunta: {question?.question}</p>
                    <ul>
                        <h2>Respuestas:</h2>
                        <p>Respuesta correcta:{question.correctAnswer}</p>
                        <p>opción A:{question.optionA}</p>
                        <p>opción B:{question.optionB}</p>
                        <p>opción C:{question.optionC}</p>
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
                            Actualiza los datos del quiz
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
                            Actualiza la pregunta
                        </button>
                    </form>
                    <button onClick={endQuiz}>Finalizar quiz</button>
                    <button
                        onClick={
                            question ? nextQuestionHandler : handleStartQuiz
                        }
                    >
                        Nueva pregunta
                    </button>
                    <button onClick={initQuestion}>
                        Iniciar pregunta para los jugadores
                    </button>
                    <button onClick={showScoresHandler}>
                        Mostrar puntaciones
                    </button>
                </>
            )}
        </>
    )
}
export default MasterPrueba
