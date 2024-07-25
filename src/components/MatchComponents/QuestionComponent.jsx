'use client';

import QuestionImage from './QuestionImage';

const QuestionComponent = ({ question, timeLeft }) => {
    return (
        question && (
            <article className=" w-screen h-fit flex flex-col  items-center content-start gap-8 text-center mb-14">
                <div>
                    <QuestionImage image={question?.image} />
                    <div className="relative mb-8 z-10 bottom-16 left-5 text-center rounded-full bg-[--yellow] w-12 h-12 p-3 text-black font-black">
                        {timeLeft}
                        <span className="font-extrabold">s</span>
                    </div>
                </div>
                <h2 className="text-2xl mx-2 text-[--yellow] font-semibold">
                    {question.question}
                </h2>
            </article>
        )
    );
};
export default QuestionComponent;
