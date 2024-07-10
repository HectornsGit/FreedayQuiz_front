const deleteQuestionHandler =
    (
        socket,
        quizId,
        questionNumber,
        setQuestionsToDelete,
        questionId,
        _setQuizData
    ) =>
    (e) => {
        e.preventDefault()
        //Guardo los números de pregunta de las preguntas que son borradas de Redis en tiempo real, para que al finalizar el quiz, tras actualizar todos los datos, se borren de MySQL y se reordenen
        setQuestionsToDelete((prevState) => [...prevState, questionId])

        //Emito el evento para borrar la pregunta de Redis:
        socket.emit('deleteCurrentQuestion', quizId, questionNumber)
    }
export default deleteQuestionHandler
