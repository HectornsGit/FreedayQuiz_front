'use client';

const AnswerComponent = ({
    isDisabled,
    index,
    response,
    clickedResponses,
    handleAnswerSubmit,
    initialPlayerData,
    timeLeft,
}) => {
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];
    const clickedAnswer =
        Object.values(response)[0] == initialPlayerData[0].lastAnswerText
            ? ' disabled:bg-transparent '
            : ' ';

    return (
        <button
            disabled={isDisabled}
            onClick={() => handleAnswerSubmit(Object.values(response)[0])}
            className={
                'xl:min-w-[524px] xl:max-w-[80vw] lg:min-w-[486px] lg:max-w-[50vw] md:min-w-[46vw] md:max-w-[48vw] min-w-[95vw] h-[100px] flex items-center bg-black p-4 disabled:bg-black hover:bg-inherit' +
                clickedAnswer
            }
        >
            <div
                className={
                    (Object.values(response)[0].length > 32
                        ? '  md:pb-4 md:text-md text-sm'
                        : ' text-lg text-left ') +
                    'font-semibold flex items-center'
                }
            >
                <span className={'text-3xl font-bold pr-9'}>
                    {answerNames[index]}
                </span>
                <p className={(timeLeft > 0 ? '' : 'pt-2 ') + ' pt-0'}>
                    {Object.values(response)[0]}
                </p>
            </div>
        </button>
    );
};
export default AnswerComponent;
