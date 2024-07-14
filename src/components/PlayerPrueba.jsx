const PlayerPrueba = ({ playerProps }) => {
    const {
        signOutHandler,
        handleInitialPlayerData,
        quizData,
        question,
        playerData,
        shuffledQuestionResponses,
        handleAnswerSubmit,
        socket,
        setNickName,
        isQuestionRunning,
        timeLeft,
        showScores,
        isDisabled,
        initialPlayerData,
        connectedClients,
        sessionRecovery,
        startNewPlayer,
        isNameSetted,
        recoverySession,
        clickedResponses,
    } = playerProps

    if (sessionRecovery && isNameSetted) {
        return (
            <>
                <button onClick={recoverySession}>
                    Recupera tu sesión en el quiz
                </button>
                <button onClick={startNewPlayer}>
                    Inicia como nuevo jugador
                </button>
            </>
        )
    }
    return (
        <>
            <h2>Jugadores conectados: {connectedClients}</h2>{' '}
            <button onClick={signOutHandler}>Cerrar sesión</button>
            {showScores && !isQuestionRunning ? (
                <>
                    <div>
                        <ul>
                            {playerData.map((player) => (
                                <li key={player.id}>
                                    Nickname: {player.name} Puntos:{' '}
                                    {player.totalScore} Streak: {player.streak}
                                    Puntos ultima pregunta:
                                    {player.lastCorrectAnswer}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {shuffledQuestionResponses &&
                        shuffledQuestionResponses.map((response, index) => (
                            <li key={index}>
                                <button
                                    disabled={isDisabled}
                                    onClick={() =>
                                        handleAnswerSubmit(
                                            Object.values(response)[0]
                                        )
                                    }
                                >
                                    {Object.values(response)[0]}
                                    {clickedResponses[
                                        Object.values(response)[0]
                                    ] &&
                                        ` pulsado ${
                                            clickedResponses[
                                                Object.values(response)[0]
                                            ]
                                        } veces`}
                                </button>
                            </li>
                        ))}
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Introduce tu nombre de jugador"
                        value={
                            initialPlayerData[0]?.name &&
                            initialPlayerData[0]?.name
                        }
                        hidden={socket?.Mydata?.name ? true : false}
                        onChange={(e) => setNickName(e.target.value)}
                        required
                    />
                    <button
                        onClick={handleInitialPlayerData}
                        hidden={socket?.Mydata?.name ? true : false}
                    >
                        Envía tu nombre de jugador
                    </button>
                    <p>Jugador: {initialPlayerData[0]?.name}</p>
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

                    {question && isQuestionRunning && (
                        <>
                            <p>Tiempo restante: {timeLeft}</p>
                            <p>Pregunta: {question?.question}</p>
                            <ul>
                                <p>Respuestas:</p>
                                {shuffledQuestionResponses &&
                                    shuffledQuestionResponses.map(
                                        (response, index) => (
                                            <li key={index}>
                                                <button
                                                    disabled={isDisabled}
                                                    onClick={() =>
                                                        handleAnswerSubmit(
                                                            Object.values(
                                                                response
                                                            )[0]
                                                        )
                                                    }
                                                >
                                                    {Object.values(response)[0]}
                                                </button>
                                            </li>
                                        )
                                    )}
                            </ul>
                        </>
                    )}
                </>
            )}
        </>
    )
}
export default PlayerPrueba
