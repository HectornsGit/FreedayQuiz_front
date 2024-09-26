const selectRandomQuestion = (
    numberOfQuestions,
    questionsExecuted,
    list_of_questions
) => {
    //Creo un array de números válidos, excluyendo los que ya están en el estado de ejecutados:
    const validNumbers = list_of_questions
        .map((question) => question.number)
        .filter((num) => !questionsExecuted?.includes(num));

    if (validNumbers.length === 0) {
        let confirm;
        if (typeof window !== 'undefined') {
            confirm = window.confirm(
                'Ya has ejecutado todas las preguntas, ¿deseas mostrar la puntuación final?'
            );
        }

        if (confirm) {
            console.log('Se acabó el juego');
        }

        const validNumbers = list_of_questions.map(
            (question) => question.number
        );

        const randomQuestionNumber =
            validNumbers[Math.floor(Math.random() * validNumbers.length)];
        return randomQuestionNumber;
    }

    const randomQuestionNumber =
        validNumbers[Math.floor(Math.random() * validNumbers.length)];

    return { randomQuestionNumber, validNumbers };
};
export default selectRandomQuestion;
