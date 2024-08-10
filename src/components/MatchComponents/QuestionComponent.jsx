'use client';

import QuestionImage from './QuestionImage';

const QuestionComponent = ({ question, timeLeft }) => {
    return (
        question && (
            <article className=" w-screen h-fit flex flex-col  items-center content-start gap-8 text-center mb-14">
                <div className="flex flex-col">
                    <QuestionImage image={question?.image} />
                    <div className="flex items-center justify-center w-16 h-16 bg-[--yellow] rounded-full text-xl text-center text-black font-black relative z-10 bottom-12 left-2 md:left-0">
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
