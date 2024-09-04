import Skull from '@/components/icons/Skull';
import StarEyedSmiley from '@/components/icons/starEyedSmiley';

const ResultAnswers = ({ question, initialPlayerData, timeLeft }) => {
    const isCorrect =
        question?.correctAnswer === initialPlayerData[0]?.lastAnswerText;

    return (
        <>
            {isCorrect && (
                <div
                    className={
                        timeLeft > 0
                            ? 'hidden'
                            : '' + ' -mb-[6.5rem] flex flex-col items-center'
                    }
                >
                    <StarEyedSmiley className={'w-[100px] my-8'} />
                    <div className="h-[180px] overflow-hidden">
                        <div className="bg-[#2be002] w-[700px] h-[700px] rounded-t-full">
                            <h2 className="text-black font-black xl:text-3xl text-2xl w-fit relative top-[7rem] xl:left-[12rem] left-[14rem]">
                                ¡Respuesta correcta!
                            </h2>
                        </div>
                    </div>
                </div>
            )}

            {!isCorrect && (
                <div
                    className={
                        timeLeft > 0
                            ? 'hidden'
                            : '' + ' -mb-[6.5rem] flex flex-col items-center'
                    }
                >
                    <Skull className={'w-[100px] my-8 fill-[#ff3284]'} />
                    <div className="h-[180px] overflow-hidden">
                        <div className="bg-[#ff3284] w-[700px] h-[700px] rounded-t-full">
                            <h2 className="text-black font-black xl:text-3xl text-2xl w-fit relative top-[7rem] xl:left-[12rem] left-[14rem]">
                                ¡Respuesta incorrecta!
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultAnswers;
