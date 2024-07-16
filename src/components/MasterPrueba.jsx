import ShowTime from '../components/ShowTime';
const MasterPrueba = ({ masterProps }) => {
    const {
        signOutHandler,
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
        previousQuestionHandler,
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
        isQuestionRunning,
        showScores,
        sessionTime,
        setSessionTimeHandler,
        sessionTimeLeft,
        deleteQuestionHandler,
    } = masterProps;

    const disableButton =
        showScores || (isQuestionRunning && timeLeft > 0) ? true : false;

    if (!sessionTime) {
        return (
            <>
                <form onSubmit={setSessionTimeHandler}>
                    <label htmlFor="session">
                        Establezca la duración máxima de la sesión (en minutos)
                    </label>
                    <input type="text" id="session" name="session" required />

                    <button>Enviar</button>
                </form>
            </>
        );
    }

    return (
        <>
            {sessionTimeLeft && (
                <ShowTime
                    time={sessionTimeLeft}
                    handler={setSessionTimeHandler}
                />
            )}
            <button onClick={signOutHandler}>Cerrar sesión de usuario</button>

            {quizData && sessionTime && (
                <>
                    <p>{quizData?.description}</p>
                    <p>{quizData?.title}</p>
                </>
            )}
            {playerData && (
                <div>
                    <h2>Jugadores conectados: {connectedClients}</h2>
                    <ul>
                        {playerData?.map((player) => (
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
                    <p>Pregunta número: {question?.questionNumber}</p>
                    <ul>
                        <h2>Respuestas:</h2>
                        <p>Respuesta correcta:{question.correctAnswer}</p>
                        <p>opción A:{question.optionA}</p>
                        <p>opción B:{question.optionB}</p>
                        <p>opción C:{question.optionC}</p>
                    </ul>
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
                    <form onSubmit={updateQuestionDataInBackend}>
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

                        <button type="submit">Actualiza la pregunta</button>
                    </form>
                    <button type="button" onClick={deleteQuestionHandler}>
                        Elimina la pregunta
                    </button>
                </>
            )}
            {loggedUserId && loggedUserId == quizData?.owner_id && (
                <>
                    <button onClick={endQuiz}>Finalizar sesión</button>
                    <button onClick={previousQuestionHandler}>
                        Pregunta anterior
                    </button>
                    <button
                        onClick={
                            question ? nextQuestionHandler : handleStartQuiz
                        }
                    >
                        Siguiente pregunta
                    </button>
                    <button onClick={initQuestion} disabled={isQuestionRunning}>
                        Iniciar pregunta para los jugadores
                    </button>
                    <button
                        onClick={showScoresHandler}
                        disabled={disableButton}
                    >
                        Mostrar puntaciones
                    </button>
                </>
            )}
        </>
    );
};
export default MasterPrueba;
