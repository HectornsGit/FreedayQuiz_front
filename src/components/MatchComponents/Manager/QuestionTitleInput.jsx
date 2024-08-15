import { useEffect, useState } from 'react';
const QuestionTitleInput = ({ id, text, isInput, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return (
        <div className="flex w-60 my-6 flex-col items-start m-2">
            <label className="text-md my-3 font-medium" htmlFor={id}>
                {text}
            </label>
            {isInput ? (
                <input
                    className="font-semibold  p-2  text-black text-md sm:w-96 w-[92vw] py-2"
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
