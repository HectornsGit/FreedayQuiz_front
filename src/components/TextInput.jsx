
import { useEffect, useState } from 'react';
const TextInput = ({ id, text, isInput, defaultValue }) => {
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
                    className="font-semibold  p-2  text-black text-md py-2"
                    type="text"
                    id={id}
                />
            ) : (
                <p className=" font-medium">{defaultValue}</p>
            )}
        </div>
    );
};
export default TextInput;
