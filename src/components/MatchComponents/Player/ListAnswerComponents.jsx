import AnswerComponent from './AnswerComponent';
import TimesAnsweredComponent from './TimesAnsweredComponent';

const ListAnswersComponents = ({
    shuffledQuestionResponses,
    clickedResponses,
    isDisabled,
    handleAnswerSubmit,
    initialPlayerData,
    timeLeft,
}) => {
    return shuffledQuestionResponses.map((response, index) => {
        return (
            <li
                key={index}
                className={
                    'flex flex-col flex-nowrap justify-end xl:min-w-[10vw] xl:max-w-[80vw] lg:min-w-[45vw] lg:max-w-[50vw] md:min-w-[45vw] md:max-w-[47vw] md:m-2 min-w-[95vw] max-h-[75px] p-[3px] bg-gradient-to-r from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                }
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
