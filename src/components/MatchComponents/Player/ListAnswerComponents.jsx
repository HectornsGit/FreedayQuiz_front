import AnswerComponent from './AnswerComponent';

const ListAnswersComponents = ({
    shuffledQuestionResponses,
    clickedResponses,
    isDisabled,
    handleAnswerSubmit,
    initialPlayerData,
}) => {
    return shuffledQuestionResponses.map((response, index) => {
        return (
            <li
                key={index}
                className={
                    'p-[3PX] bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                }
            >
                <AnswerComponent
                    response={response}
                    clickedResponses={clickedResponses}
                    isDisabled={isDisabled}
                    index={index}
                    handleAnswerSubmit={handleAnswerSubmit}
                    initialPlayerData={initialPlayerData}
                ></AnswerComponent>
            </li>
        );
    });
};
export default ListAnswersComponents;
