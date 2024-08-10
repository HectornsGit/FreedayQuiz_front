import AnswerComponent from './AnswerComponent';
import TimesAnsweredComponent from './TimesAnsweredComponent';

//la lógica para colorear las respuestas tiene que ser asi por cada caso porque si no, se mezclan los colores

const ListAnswersComponents = ({
    shuffledQuestionResponses,
    clickedResponses,
    isDisabled,
    handleAnswerSubmit,
    initialPlayerData,
    timeLeft,
}) => {
    return shuffledQuestionResponses.map((response, index) => {
        const correctAnswer = response.correctAnswer;
        return (
            <li
                key={index}
                disabled={isDisabled}
                className={`flex flex-col flex-nowrap justify-end xl:min-w-[10vw] xl:max-w-[80vw] lg:min-w-[45vw] lg:max-w-[50vw] md:min-w-[45vw] md:max-w-[47vw] md:m-2 min-w-[95vw] max-h-[75px] p-[3px]
                    ${!isDisabled && !correctAnswer ? ' bg-gradient-to-r from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%' : ' '}
                    ${!isDisabled && correctAnswer ? ' bg-gradient-to-r from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%' : ' '}
                    ${correctAnswer && isDisabled ? ' bg-gradient-to-r from-green-300 from-9% via-green-400 via-50% to-lime-400 to-94%' : ' '}
                    ${!correctAnswer && isDisabled ? ' bg-gradient-to-r from-red-700 from-9% via-pink-500 via-50% to-yellow-400 to-94%' : ' '}
                
                `}
            >
                <TimesAnsweredComponent
                    timeLeft={timeLeft}
                    clickedResponses={clickedResponses}
                    response={response}
                ></TimesAnsweredComponent>
                <AnswerComponent
                    response={response}
                    clickedResponses={clickedResponses}
                    isDisabled={isDisabled}
                    index={index}
                    handleAnswerSubmit={handleAnswerSubmit}
                    initialPlayerData={initialPlayerData}
                    timeLeft={timeLeft}
                ></AnswerComponent>
            </li>
        );
    });
};
export default ListAnswersComponents;
