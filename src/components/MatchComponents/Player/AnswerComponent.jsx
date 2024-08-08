'use client';

import TimesAnsweredComponent from './TimesAnsweredComponent';

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
            ? 'disabled:bg-inherit bg-inherit '
            : ' ';

    return (
        <button
            disabled={isDisabled}
            onClick={() => handleAnswerSubmit(Object.values(response)[0])}
            className={
                'md:w-[400px] md:h-[62px] lg:w-[450px] lg:h-[65px] flex items-center gap-6 text-start p-4  disabled:bg-black hover:bg-inherit bg-black ' +
                clickedAnswer
            }
        >
            <span className={'text-2xl font-bold'}>{answerNames[index]}</span>
            <div
                className={
                    (Object.values(response)[0].length > 32
                        ? '  md:pb-4 md:text-md text-sm'
                        : ' text-md  ') + ' font-semibold flex justify-start'
                }
            >
                <div
                    className={
                        (timeLeft > 0 ? '' : 'pt-2 ') + ' pt-0 sm:w-56 w-72'
                    }
                >
                    {Object.values(response)[0]}
                </div>
                <TimesAnsweredComponent
                    timeLeft={timeLeft}
                    clickedResponses={clickedResponses}
                    response={response}
                ></TimesAnsweredComponent>
            </div>
        </button>
    );
};
export default AnswerComponent;
