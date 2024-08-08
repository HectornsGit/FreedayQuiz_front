'use client';

import QuestionImage from './QuestionImage';

const QuestionComponent = ({ question, timeLeft }) => {
    return (
        question && (
            <article className=" w-screen h-fit flex flex-col  items-center content-start gap-8 text-center mb-14">
                <div className="flex flex-col">
                    <QuestionImage image={question?.image} />
                    <div className="relative z-10 bottom-16 left-20 sm:bottom-20 sm:-left-6 text-center rounded-full bg-[--yellow] w-14 h-14  px-2 pb-3 pt-4 text-black font-black">
                        {timeLeft || 0}
                        <span className="font-extrabold text-center">s</span>
                    </div>

                    <h2 className="text-2xl mx-2 text-[--yellow] font-semibold">
                        {question.question}
                    </h2>
                </div>
            </article>
        )
    );
};
export default QuestionComponent;
