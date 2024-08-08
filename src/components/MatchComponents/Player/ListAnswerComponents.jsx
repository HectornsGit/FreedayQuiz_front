import AnswerComponent from './AnswerComponent';

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
                    'md:w-[370px] md:h-[65px] lg:w-[385px] lg:h-[70px] flex items-center p-[3PX] bg-gradient-to-r from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                }
            >
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
