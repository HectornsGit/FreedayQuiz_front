import { useEffect, useState } from 'react';
const QuestionTitleInput = ({ id, text, isInput, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return (
        <div className="flex w-full my-6 flex-col xl:w-5/6  items-center">
            <label
                className="text-xl text-left self-start xl:ml-12 2xl:ml-16 my-3 font-semibold"
                htmlFor={id}
            >
                {text}
            </label>
            {isInput ? (
                <input
                    className="font-semibold  p-2  text-black text-md xl:w-5/6 w-full py-2"
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        setValue(e.target.value);
                    }}
                    max={100}
                />
            ) : (
                <p className=" font-medium">{defaultValue}</p>
            )}
        </div>
    );
};
export default QuestionTitleInput;
