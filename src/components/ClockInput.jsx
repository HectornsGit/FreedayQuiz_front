'use client';

import { useEffect, useState } from 'react';

const ClockInput = ({
    id,
    text,
    defaultValue,
    isInput,
    timeLeft,
    isQuestionRunning,
}) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return (
        <div className="flex font-black relative -top-20 sm:-top-24 -left-2 sm:-left-56 text-black rounded-full bg-[--yellow]  text-left w-16 h-16 flex-col items-center justify-center ">
            <label className="hidden text-md " htmlFor={id}>
                {text}
            </label>
            {isInput ? (
                <input
                    className="w-12 text-center border-2 rounded-md border-black "
                    type="number"
                    id={id}
                    name={id}
                    value={value}
                    min={15}
                    onChange={(e) => {
                        e.preventDefault();
                        setValue(e.target.value);
                    }}
                />
            ) : (
                <p className="text-2xl ">
                    {isQuestionRunning ? timeLeft : value}
                    <span className="text-lg p-0 ">s</span>
                </p>
            )}
        </div>
    );
};
export default ClockInput;
