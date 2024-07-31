import TimesAnsweredComponent from './TimesAnsweredComponent';
const AnswerComponent = ({
    isDisabled,
    index,
    response,
    clickedResponses,
    handleAnswerSubmit,
}) => {
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];
    return (
        <button
            disabled={isDisabled}
            onClick={() => handleAnswerSubmit(Object.values(response)[0])}
            className="flex items-center  h-16 gap-6 text-start  pb-0 p-4  sm:w-96  w-[95vw]  hover:bg-inherit bg-black "
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
