const stopQuestionTime = (
    socket,
    connectedClients,
    numberAnswersPerQuestion,
    setTimeLeft,
    quizId,
    _setIsDisabled
) => {
    //Comprobamos si todos los jugadores conectados (menos el master) han respondido, cuyo caso terminamos el tiempo de la pregunta en curso:
    if (connectedClients - 1 === numberAnswersPerQuestion) {
        const timeUp = true;
        socket.emit('closeQuestionInterval', quizId, timeUp);
        setTimeLeft(0);
    }
};
export default stopQuestionTime;
