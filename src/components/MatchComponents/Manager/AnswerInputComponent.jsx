'use client';
import { useEffect, useState } from 'react';

const AnswerInputComponent = ({ defaultValue, logo, id }) => {
    const [value, setValue] = useState(defaultValue);
    const [isInput, setIsInput] = useState(false);
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return isInput ? (
        <div className=" flex items-center h-full gap-6 text-start text-2xl p-4  bg-black sm:w-96 w-[95vw] ">
            <span className="font-bold">{logo}</span>
            <input
                className={
                    (value > 50
                        ? ' lg:text-xl md:text-md text-sm'
                        : 'lg:text-2xl md:text-xl text-base') +
                    ' font-semibold px-2 text-black w-72  bg-white'
                }
                value={value}
                id={id}
                name={id}
                onChange={(e) => {
                    e.preventDefault();
                    setValue(e.target.value);
                }}
                onBlur={(e) => {
                    e.preventDefault();
                    setIsInput(false);
                }}
            />
        </div>
    ) : (
        <button
            onClick={(e) => {
                e.preventDefault();
                setIsInput(!isInput);
            }}
            className=" flex items-center  h-full gap-6 text-start text-2xl p-4 sm:w-96  w-[95vw]  hover:bg-inherit bg-black "
        >
            <span className="font-bold">{logo}</span>
            <span
                className={
                    (value > 50
                        ? ' lg:text-xl md:text-md text-sm'
                        : 'lg:text-2xl md:text-xl text-base') + ' font-semibold'
                }
                isInput={isInput}
            >
                {value}
            </span>
        </button>
    );
};
export default AnswerInputComponent;
