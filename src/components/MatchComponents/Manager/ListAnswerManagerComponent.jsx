'use client';
import AnswerManagerComponent from './AnswerManagerComponent';

const ListAnswerManagerComponent = ({ answers }) => {
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];

    return (
        <ul className="flex flex-col  w-full items-center  gap-6">
            {answers.length > 0 &&
                answers.map((answer, index) => {
                    const { key, value, isCorrect } = answer;
                    return (
                        <li
                            key={key}
                            className="xl:place-self-end p-[3PX] md:w-80  sm:w-96 w-[95vw] bg-gradient-to-r   flex items-center    from-[--yellow] from-9% via-green-400 via-50% to-[--cyan] to-94%"
                        >
                            <AnswerManagerComponent
                                answer={key}
                                isCorrect={isCorrect}
                                text={value}
                                logo={answerNames[index]}
                            ></AnswerManagerComponent>
                        </li>
                    );
                })}
        </ul>
    );
};
export default ListAnswerManagerComponent;
