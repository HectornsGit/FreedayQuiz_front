const PlayerPrueba = ({ playerProps }) => {
    const {
        signOut,
        handleInitialPlayerData,
        quizData,
        question,
        playerData,
        shuffledQuestionResponses,
        handleAnswerSubmit,
        nickName,
        setNickName,
        isQuestionRunning,
        timeLeft,
        showScores,
        isDisabled,
    } = playerProps

    return (
        <>
            {' '}
            <button onClick={signOut}>Cerrar sesión</button>
            {showScores && !isQuestionRunning ? (
                <div>
                    <h2>Jugadores conectados: {playerData.length}</h2>
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
            ) : (
                <>
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
                        <h2>Jugadores conectados: {playerData.length}</h2>
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
