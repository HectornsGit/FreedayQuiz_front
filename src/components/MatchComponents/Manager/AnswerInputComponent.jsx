'use client';
import { useEffect, useState } from 'react';
const AnswerInputComponent = ({
    answer,
    text,
    setCorrectAnswer,
    correctAnswer,
    logo,
}) => {
    const [value, setValue] = useState(text);

    useEffect(() => {
        setValue(text);
    }, [text, answer]);

    return (
        <div className=" flex items-center h-full gap-6 text-start text-2xl p-4  bg-black w-full ">
            <label className="hidden" htmlFor={answer}></label>
            <span className="font-bold">{logo}</span>
            <input
                className={
                    (value.length > 12
                        ? '  md:text-md text-sm'
                        : 'lg:text-2xl md:text-xl text-base') +
                    ' font-semibold px-2 text-black  bg-white w-[80%]'
                }
                type="text"
                id={answer}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <div className="w-5 h-4 rounded-full flex items-center justify-center  bg-gradient-to-r from-[--yellow] from-9% via-green-400 via-50% to-[--cyan] to-94%">
                <input
                    className="hidden peer"
                    type="radio"
                    name="correctAnswer"
                    value={answer}
                    id={'radio-' + answer}
                    checked={correctAnswer === answer}
                    onChange={(e) => {
                        setCorrectAnswer(answer);
                    }}
                ></input>
                <label
                    className="peer-checked:bg-black  flex z-30 rounded-full  w-2 h-2 "
                    htmlFor={'radio-' + answer}
                ></label>
            </div>
        </div>
    );
};
export default AnswerInputComponent;
