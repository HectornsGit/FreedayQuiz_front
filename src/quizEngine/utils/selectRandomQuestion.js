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
                'Todas las preguntas han sido ejecutadas, ¿quiere ejecutar una aleatoria igualmente?'
            );
        }

        if (!confirm) return;
        const validNumbers = list_of_questions.map(
            (question) => question.number
        );

        const randomQuestionNumber =
            validNumbers[Math.floor(Math.random() * validNumbers.length)];
        return randomQuestionNumber;
    }

    const randomQuestionNumber =
        validNumbers[Math.floor(Math.random() * validNumbers.length)];

    return randomQuestionNumber;
};
export default selectRandomQuestion;
