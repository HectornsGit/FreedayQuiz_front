'use client';
import { useEffect, useState } from 'react';
const AnswerInputComponent = ({ isInput, defaultValue, logo, id }) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return isInput ? (
        <div className=" flex items-center h-full gap-6 text-start text-2xl p-4  bg-black w-full ">
            <span className="font-bold">{logo}</span>
            <input
                className={
                    (value.length > 16
                        ? '  md:text-md text-sm'
                        : 'lg:text-2xl md:text-xl text-base') +
                    ' font-semibold px-2 text-black  bg-white w-[80%]'
                }
                value={value}
                id={id}
                name={id}
                onChange={(e) => {
                    e.preventDefault();
                    setValue(e.target.value);
                }}
            />
        </div>
    ) : (
        <div className=" flex items-center  h-full gap-6 text-start text-2xl p-4 sm:w-96  w-[95vw]  hover:bg-inherit bg-black ">
            <span className="font-bold">{logo}</span>
            <span
                className={
                    (value.length > 16
                        ? ' md:text-md text-sm'
                        : 'lg:text-2xl md:text-xl text-base') + ' font-semibold'
                }
            >
                {value}
            </span>
        </div>
    );
};
export default AnswerInputComponent;
