'use client';
import CheckMark from '../../icons/Checkmark';

const AnswerManagerComponent = ({ text, isCorrect, logo }) => {
    return (
        <div className=" flex items-center h-full gap-6 text-start text-2xl p-4  bg-black w-full ">
            <span className="font-bold">{logo}</span>
            <p
                className={
                    (text.length > 10
                        ? ' md:text-md text-sm'
                        : 'lg:text-2xl md:text-xl text-base ') +
                    ' grow font-semibold'
                }
            >
                {text}
            </p>
            {isCorrect && <CheckMark className={'h-8 fill-white '}></CheckMark>}
        </div>
    );
};
export default AnswerManagerComponent;
