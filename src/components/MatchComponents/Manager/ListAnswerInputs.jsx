import AnswerInputComponent from './AnswerInputComponent.jsx';
import React, { useEffect, useState } from 'react';

const ListAnswerInputs = ({ answers }) => {
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];

    const [correctAnswer, setCorrectAnswer] = useState(
        answers.filter((item) => {
            return item.isCorrect === true;
        })[0].key
    );
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
                            <AnswerInputComponent
                                answer={key}
                                setCorrectAnswer={setCorrectAnswer}
                                correctAnswer={correctAnswer}
                                text={value}
                                logo={answerNames[index]}
                            ></AnswerInputComponent>
                        </li>
                    );
                })}
        </ul>
    );
};
export default ListAnswerInputs;
