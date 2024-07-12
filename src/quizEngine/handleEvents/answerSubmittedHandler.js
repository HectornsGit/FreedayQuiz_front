const answerSubmittedHandler = (socket, handleAnswerSubmitted) => {
    //Aquí llegan los datos y se actualizan en el estado playerData, para poder ser pintados

    if (socket) {
        socket.on('answerSubmitted', handleAnswerSubmitted)
    }
}
export default answerSubmittedHandler
