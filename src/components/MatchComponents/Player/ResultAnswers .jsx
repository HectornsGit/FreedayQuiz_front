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
                    <div className="flex justify-center w-full lg:h-40 md:h-40 h-36 overflow-hidden">
                        <div className="lg:w-[800px] md:w-[400px] w-[320px] lg:h-96 md:h-48 h-40 bg-[#2be002] rounded-t-full">
                            <h2 className="inline-block mt-20 text-center text-black font-black xl:text-3xl text-2xl">
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
                    <div className="flex justify-center w-full lg:h-40 md:h-40 h-36 overflow-hidden">
                        <div className="lg:w-[800px] md:w-[400px] w-[320px] lg:h-96 md:h-48 h-40 bg-[#ff3284] rounded-t-full">
                            <h2 className="inline-block mt-20 text-center text-black font-black xl:text-3xl text-2xl">
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
