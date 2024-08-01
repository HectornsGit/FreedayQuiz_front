import TimesAnsweredComponent from './TimesAnsweredComponent';
const AnswerComponent = ({
    isDisabled,
    index,
    response,
    clickedResponses,
    handleAnswerSubmit,
    initialPlayerData,
}) => {
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];

    const clickedAnswer =
        Object.values(response)[0] == initialPlayerData[0].lastAnswerText
            ? 'disabled:bg-inherit bg-inherit '
            : ' ';

    return (
        <button
            disabled={isDisabled}
            onClick={() => handleAnswerSubmit(Object.values(response)[0])}
            className={
                'flex items-center  h-16 gap-6 text-start  pb-0 p-4  sm:w-96  w-[95vw] disabled:bg-black  hover:bg-inherit bg-black ' +
                clickedAnswer
            }
        >
            <span className="text-2xl pb-4 font-bold">
                {answerNames[index]}
            </span>
            <div
                className={
                    (Object.values(response)[0].length > 32
                        ? '  md:pb-4 md:text-md text-sm'
                        : ' text-md  ') + ' font-semibold flex justify-start'
                }
            >
                <div className=" pt-0 sm:w-56 w-72">
                    {Object.values(response)[0]}
                </div>
                <TimesAnsweredComponent
                    clickedResponses={clickedResponses}
                    response={response}
                ></TimesAnsweredComponent>
            </div>
        </button>
    );
};
export default AnswerComponent;
