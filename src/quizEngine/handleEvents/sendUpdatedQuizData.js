const sendUpdatedQuizData = (
    socket,
    setPlayerData,
    setQuizData,
    setQuestion,
    setIsQuestionRunning,
    setShowScores,
    setIsDisabled,
    sessionRecovery,
    setSessionRecovery,
    setInitialPlayerData
) => {
    if (socket) {
        socket.on(
            'sendRecoveryQuizData',
            (backPlayersData, backQuizData, currentQuestion, updatedStates) => {
                //Lógica para recuperar la sesión después de refrescar la página:
                if (sessionRecovery) {
                    const storedId = window.localStorage.getItem('idNewPlayer')

                    let recoveryPlayer
                    if (storedId) {
                        recoveryPlayer = backPlayersData.find((player) => {
                            if (player.id === storedId) {
                                return { ...player, state: 'online' }
                            }
                        })

                        socket.Mydata = {
                            name: recoveryPlayer.name,
                            id: recoveryPlayer.id,
                        }
                        socket.data = {
                            name: recoveryPlayer.name,
                            id: recoveryPlayer.id,
                        }

                        setInitialPlayerData([recoveryPlayer])
                        setSessionRecovery(false)
                    }
                    //Actualizar el estado a todos los usuarios de la sala:
                    socket.emit('setOnline', { playerId: recoveryPlayer.id })
                }

                setIsQuestionRunning(updatedStates.isQuestionRunning)
                setShowScores(updatedStates.showScores)
                setIsDisabled(updatedStates.isDisabled)
                setQuizData(backQuizData)
                setQuestion(currentQuestion)
                setPlayerData(backPlayersData)
            }
        )
    }
}
export default sendUpdatedQuizData
