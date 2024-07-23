'use client';

import { useEffect, useState } from 'react';

const NumberInput = ({ id, text, defaultValue, isInput }) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return (
        <div className="flex md:font-medium font-light text-left my-6 flex-col items-start m-2">
            <label className="text-md " htmlFor={id}>
                {text}
            </label>
            {isInput ? (
                <input
                    className="font-semibold w-20  p-2  text-black text-md py-2"
                    type="number"
                    id={id}
                    name={id}
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        setValue(e.target.value);
                    }}
                />
            ) : (
                <p className="font-semibold w-20  p-2  text-white text-md py-2">
                    {value}
                </p>
            )}
        </div>
    );
};
export default NumberInput;
