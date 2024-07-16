import { getItemWithExpiry } from '../utils';
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
    setInitialPlayerData,
    setClickedResponses
) => {
    if (socket) {
        socket.on(
            'sendRecoveryQuizData',
            (
                backPlayersData,
                backQuizData,
                currentQuestion,
                updatedStates,
                quizId,
                backClickedResponses
            ) => {
                //Lógica para recuperar la sesión después de refrescar la página:
                if (sessionRecovery) {
                    const storedId = getItemWithExpiry('idNewPlayer');

                    setClickedResponses({});
                    let recoveryPlayer;
                    if (storedId) {
                        recoveryPlayer = backPlayersData.find((player) => {
                            if (player.id === storedId) {
                                return { ...player, state: 'online' };
                            }
                        });

                        socket.Mydata = {
                            name: recoveryPlayer?.name,
                            id: recoveryPlayer?.id,
                        };
                        socket.data = {
                            name: recoveryPlayer?.name,
                            id: recoveryPlayer?.id,
                        };

                        setInitialPlayerData([recoveryPlayer]);
                        setSessionRecovery(false);
                    }

                    //Actualizar el estado a todos los usuarios de la sala:
                    socket.emit(
                        'setOnline',
                        { playerId: recoveryPlayer?.id },
                        quizId
                    );
                }

                setIsQuestionRunning(updatedStates.isQuestionRunning);
                setShowScores(updatedStates.showScores);
                setIsDisabled(updatedStates.isDisabled);
                setQuizData(backQuizData);
                setQuestion(currentQuestion);
                setPlayerData(backPlayersData);
                if (backClickedResponses && !sessionRecovery)
                    setClickedResponses(backClickedResponses);
            }
        );
    }
};
export default sendUpdatedQuizData;
